import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { devices, packages } from "../src/data/catalog.js";
import { mapLockdownInfoToDevice } from "../src/core/deviceAdapter.js";
import { buildDiagnostics, buildDoctorScores, buildRepairPlan, buildSnapshotIntelligence } from "../src/core/deviceDoctor.js";
import { parsePackageIndex, parseRelationshipList } from "../src/core/packageIndex.js";
import { resolveInstallPlan } from "../src/core/dependencyResolver.js";
import { planInstallOperation } from "../src/core/operationPlanner.js";
import { repositories, snapshots } from "../src/data/catalog.js";
import { assertPostBody, createCommercialApi } from "../src/core/commercialApi.js";
import { encryptSyncPayload, decryptSyncPayload } from "../src/core/cloudServices.js";
import { commercialComplianceStatus } from "../src/core/compliance.js";
import { createDurableStore } from "../src/core/durableStore.js";
import { createLicensePayload, signLicense, verifyLicense } from "../src/core/entitlements.js";
import { buildReadOnlyInspection, parseCydiaSources, parseDpkgStatus, sshCredentialPolicy } from "../src/core/liveDeviceInspector.js";
import { queueMutation } from "../src/core/mutationExecutor.js";
import { ingestPackageIndex } from "../src/core/repositoryIngestion.js";

test("maps libimobiledevice lockdown output into a LegacyDock device profile", () => {
  const device = mapLockdownInfoToDevice({
    DeviceName: "Ryan's iPhone",
    ProductType: "iPhone5,2",
    ProductVersion: "8.4.1",
    BatteryCurrentCapacity: "87",
    TotalDataCapacity: "1000",
    AmountDataAvailable: "250"
  }, "udid-123");

  assert.equal(device.identifier, "iPhone5,2");
  assert.equal(device.chip, "A6");
  assert.equal(device.storageUsed, 75);
  assert.equal(device.batteryHealth, 87);
});

test("parses Debian package indexes and relationship fields", () => {
  assert.deepEqual(parseRelationshipList("mobilesubstrate (>= 0.9), preferenceloader | alt"), ["mobilesubstrate", "preferenceloader"]);

  const parsed = parsePackageIndex(`Package: com.example.tweak
Name: Example Tweak
Version: 1.0
Depends: mobilesubstrate, preferenceloader
Conflicts: oldtweak
Description: Useful legacy tweak
`, "fixture");

  assert.equal(parsed[0].id, "com.example.tweak");
  assert.equal(parsed[0].repository, "fixture");
  assert.deepEqual(parsed[0].dependencies, ["mobilesubstrate", "preferenceloader"]);
  assert.deepEqual(parsed[0].conflicts, ["oldtweak"]);
});

test("resolves install plans with missing dependencies", () => {
  const device = devices.find((item) => item.id === "ipad2-wifi-16");
  const pkg = packages.find((item) => item.id === "openssh");
  const plan = resolveInstallPlan(device, pkg, packages);

  assert.equal(plan.ready, false);
  assert.deepEqual(plan.missing, ["openssl", "berkeleydb"]);
});

test("blocks unsafe install plans before device mutation", () => {
  const device = devices.find((item) => item.id === "iphone4-black-32");
  const pkg = packages.find((item) => item.id === "batterylife");
  const plan = planInstallOperation(device, pkg, packages);

  assert.equal(plan.safeToQueue, false);
  assert.match(plan.confirmationPhrase, /INSTALL batterylife ON iPhone3,1/);
  assert.ok(plan.blocks.some((block) => block.includes("not in package metadata")));
});

test("builds explainable Device Doctor scores and diagnostics", () => {
  const device = devices.find((item) => item.id === "ipad2-wifi-16");
  const scores = buildDoctorScores(device, repositories, packages);
  const diagnostics = buildDiagnostics(device, repositories, packages);
  const plan = buildRepairPlan(device, repositories, packages);
  const snapshot = buildSnapshotIntelligence(device, snapshots);

  assert.ok(scores.find((score) => score.id === "health").explanation.includes("Average"));
  assert.ok(diagnostics.some((issue) => issue.title.includes("Duplicate repository index")));
  assert.ok(plan.steps.length > 0);
  assert.equal(snapshot.rollbackAvailable, true);
});

test("serves commercial local API responses without device mutation", async () => {
  const api = createCommercialApi({ workspacePath: "work/test-commercial-api.json" });
  const status = await api.handle("GET", "/api/status");
  const doctor = await api.handle("GET", "/api/devices/iphone4-black-32/doctor");
  const plan = await api.handle("POST", "/api/install-plan", {
    deviceId: "iphone4-black-32",
    packageId: "winterboard",
    snapshotId: "snap-clean-iphone4"
  });

  assert.equal(status.status, 200);
  assert.equal(status.headers["access-control-allow-origin"], "*");
  assert.equal(status.body.deviceMutationEnabled, false);
  assert.ok(doctor.body.scores.some((score) => score.id === "repository"));
  assert.equal(plan.body.plan.execution, "queue-only");
  assert.equal(assertPostBody(null).headers["access-control-allow-methods"], "GET,POST,OPTIONS");
});

test("parses read-only package manager state and protects SSH credentials", () => {
  const sources = parseCydiaSources("deb http://apt.thebigboss.org/repofiles/cydia/ stable main\n# ignored");
  const installed = parseDpkgStatus(`Package: winterboard
Name: WinterBoard
Version: 0.9
Status: install ok installed
Depends: mobilesubstrate, preferenceloader
`);
  const inspection = buildReadOnlyInspection({
    lockdown: { DeviceName: "Test iPhone", ProductType: "iPhone3,1", ProductVersion: "6.1.3" },
    sourcesText: "deb http://apt.thebigboss.org/repofiles/cydia/ stable main",
    dpkgStatusText: "Package: winterboard\nVersion: 0.9\n"
  });
  const ssh = sshCredentialPolicy({ host: "192.168.1.2", username: "root", password: "alpine", userConfirmed: true });

  assert.equal(sources[0].url, "http://apt.thebigboss.org/repofiles/cydia/");
  assert.deepEqual(installed[0].dependencies, ["mobilesubstrate", "preferenceloader"]);
  assert.equal(inspection.mutationEnabled, false);
  assert.equal(ssh.redacted.password, "[redacted]");
});

test("blocks unsafe mutations unless snapshot and confirmation are present", () => {
  const device = devices.find((item) => item.id === "iphone4-black-32");
  const pkg = packages.find((item) => item.id === "winterboard");
  const plan = planInstallOperation(device, pkg, packages, { snapshotId: "snap-clean-iphone4" });
  const blocked = queueMutation({ device, plan, snapshot: null, confirmationPhrase: plan.confirmationPhrase });
  const queued = queueMutation({
    device,
    plan,
    snapshot: { id: "snap-clean-iphone4" },
    confirmationPhrase: plan.confirmationPhrase
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(queued.status, "queued-dry-run");
  assert.equal(queued.deviceMutationEnabled, false);
});

test("ingests repository package indexes as metadata only", () => {
  const repo = repositories.find((item) => item.id === "bigboss");
  const result = ingestPackageIndex({
    repository: repo,
    text: "Package: com.example.one\nName: Example One\nVersion: 1.0\n\n"
  });

  assert.equal(result.repositoryId, "bigboss");
  assert.equal(result.packageCount, 1);
  assert.equal(result.redistributionPolicy, "metadata-only");
  assert.match(result.packageIndexHash, /^sha256:/);
});

test("verifies local entitlement payloads and encrypts cloud sync envelopes", () => {
  const payload = createLicensePayload({ customerId: "cust_test", plan: "care" });
  const signature = signLicense(payload, "secret");
  const result = verifyLicense({ payload, signature, secret: "secret" });
  const envelope = encryptSyncPayload({ deviceId: "iphone4-black-32" }, "sync-secret");

  assert.equal(result.valid, true);
  assert.ok(result.features.includes("cloud.sync"));
  assert.deepEqual(decryptSyncPayload(envelope, "sync-secret"), { deviceId: "iphone4-black-32" });
});

test("uses durable store fallback without requiring local setup", async () => {
  const store = await createDurableStore({ disableSqlite: true, jsonPath: "work/test-commercial-store.json" });
  await store.set("settings", { theme: "dark" });
  const submission = await store.append("submissions", { type: "compatibility-report", status: "pending" });

  assert.equal(store.engine, "json-fallback");
  assert.deepEqual(await store.get("settings"), { theme: "dark" });
  assert.equal(submission.status, "pending");
});

test("exposes commercial readiness endpoints", async () => {
  const api = createCommercialApi({
    workspacePath: "work/test-commercial-api.json",
    storeOptions: { disableSqlite: true, jsonPath: "work/test-api-store.json" }
  });
  const storage = await api.handle("GET", "/api/storage/status");
  const desktop = await api.handle("GET", "/api/commercial/desktop");
  const compliance = await api.handle("GET", "/api/security/compliance");
  const release = await api.handle("GET", "/api/release/manifest");

  assert.equal(storage.body.activeEngine, "json-fallback");
  assert.equal(desktop.body.desktop.shell, "Tauri");
  assert.equal(desktop.body.desktop.frontend, "React + Vite + Tailwind");
  assert.equal(compliance.body.ready, commercialComplianceStatus().ready);
  assert.ok(release.body.targets.some((target) => target.os === "windows"));
});

test("defines Tauri desktop workspace configuration", async () => {
  const tauriConfig = JSON.parse(await readFile("src-tauri/tauri.conf.json", "utf8"));
  const desktopPackage = JSON.parse(await readFile("desktop/package.json", "utf8"));
  const updateFeed = JSON.parse(await readFile("updates/stable.json", "utf8"));
  const migrations = await readFile("src-tauri/src/migrations.rs", "utf8");

  assert.equal(tauriConfig.productName, "LegacyDock");
  assert.equal(tauriConfig.build.devUrl, "http://127.0.0.1:1420");
  assert.equal(tauriConfig.build.frontendDist, "../desktop/dist");
  assert.deepEqual(tauriConfig.bundle.targets, ["nsis", "msi"]);
  assert.ok(desktopPackage.dependencies.react);
  assert.ok(desktopPackage.devDependencies["@tauri-apps/cli"]);
  assert.ok(desktopPackage.devDependencies.tailwindcss);
  assert.equal(updateFeed.platforms["windows-x86_64"].signature, "SIGNATURE_REQUIRED_BEFORE_STABLE_RELEASE");
  assert.match(migrations, /schema_migrations/);
});

test("includes the desktop setup wizard and synchronized logo assets", async () => {
  const desktopApp = await readFile("desktop/src/main.tsx", "utf8");
  const sharedLogo = await readFile("assets/logodock.svg", "utf8");
  const desktopLogo = await readFile("desktop/public/logodock.svg", "utf8");
  const sharedHash = createHash("sha256").update(sharedLogo).digest("hex");
  const desktopHash = createHash("sha256").update(desktopLogo).digest("hex");

  assert.match(desktopApp, /Setup Wizard/);
  assert.match(desktopApp, /Connect your legacy iOS device to begin/);
  assert.match(desktopApp, /iOS 3-9 supported/);
  assert.match(desktopApp, /MapsX/);
  assert.match(desktopApp, /TubeRepair/);
  assert.equal(sharedHash, desktopHash);
});
