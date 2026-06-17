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
  const installerInspection = buildReadOnlyInspection({
    lockdown: { DeviceName: "Test iPhone", ProductType: "iPhone5,2", ProductVersion: "8.4.1" },
    files: { "/Applications/Installer.app": true }
  });

  assert.equal(sources[0].url, "http://apt.thebigboss.org/repofiles/cydia/");
  assert.deepEqual(installed[0].dependencies, ["mobilesubstrate", "preferenceloader"]);
  assert.equal(inspection.mutationEnabled, false);
  assert.equal(installerInspection.device.packageManager, "Installer 5");
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
  const deletion = await api.handle("POST", "/api/security/delete-local");
  const release = await api.handle("GET", "/api/release/manifest");
  const supabase = await api.handle("GET", "/api/cloud/supabase-contract");

  assert.equal(storage.body.activeEngine, "json-fallback");
  assert.equal(desktop.body.desktop.shell, "Tauri");
  assert.equal(desktop.body.desktop.frontend, "React + Vite + Tailwind");
  assert.equal(compliance.body.ready, commercialComplianceStatus().ready);
  assert.equal(compliance.body.checklist.find((item) => item.id === "telemetry-consent").status, "complete");
  assert.equal(compliance.body.checklist.find((item) => item.id === "hosted-delete").status, "required");
  assert.equal(compliance.body.dataHandling.deletionScopes.localDesktop, "available-now");
  assert.equal(deletion.body.scope, "local-workspace");
  assert.ok(release.body.targets.some((target) => target.os === "windows" && target.active));
  assert.ok(release.body.targets.some((target) => target.os === "macos" && !target.active));
  assert.equal(supabase.body.env.requiredClientEnv.includes("SUPABASE_ANON_KEY"), true);
  assert.equal(supabase.body.schema.storageBuckets.some((bucket) => bucket.name === "legacydock-exports"), true);
  assert.equal(supabase.body.launchChecklist.includes("apply schema and RLS policies"), true);
});

test("defines Tauri desktop workspace configuration", async () => {
  const tauriConfig = JSON.parse(await readFile("src-tauri/tauri.conf.json", "utf8"));
  const desktopPackage = JSON.parse(await readFile("desktop/package.json", "utf8"));
  const updateFeed = JSON.parse(await readFile("updates/stable.json", "utf8"));
  const migrations = await readFile("src-tauri/src/migrations.rs", "utf8");
  const envExample = await readFile(".env.example", "utf8");
  const windowsSetup = await readFile("docs/windows-production-setup.md", "utf8");
  const packageRoot = JSON.parse(await readFile("package.json", "utf8"));
  const updaterCapability = JSON.parse(await readFile("src-tauri/capabilities/default.json", "utf8"));
  const updaterKey = await readFile("config/updater/legacydock.pub", "utf8");

  assert.equal(tauriConfig.productName, "LegacyDock");
  assert.equal(tauriConfig.identifier, "com.legacydock.desktop");
  assert.equal(tauriConfig.build.devUrl, "http://127.0.0.1:1420");
  assert.equal(tauriConfig.build.frontendDist, "../desktop/dist");
  assert.deepEqual(tauriConfig.bundle.targets, ["nsis", "msi"]);
  assert.deepEqual(tauriConfig.bundle.icon, ["icons/icon.ico"]);
  assert.equal(tauriConfig.bundle.createUpdaterArtifacts, true);
  assert.equal(tauriConfig.plugins.updater.endpoints[0], "https://bnauijvhhsawcvscsefx.supabase.co/storage/v1/object/public/legacydock-updates/latest.json");
  assert.equal(tauriConfig.plugins.updater.pubkey, updaterKey.trim());
  assert.ok(desktopPackage.dependencies.react);
  assert.ok(desktopPackage.dependencies["@tauri-apps/plugin-updater"]);
  assert.ok(desktopPackage.devDependencies["@tauri-apps/cli"]);
  assert.ok(desktopPackage.devDependencies.tailwindcss);
  assert.equal(packageRoot.scripts.tauri, "node scripts/run-tauri.cjs");
  assert.ok(updateFeed.platforms["windows-x86_64"].signature.length > 50);
  assert.match(updateFeed.platforms["windows-x86_64"].url, /^https:\/\/bnauijvhhsawcvscsefx\.supabase\.co\/storage\/v1\/object\/public\/legacydock-updates\/releases\//);
  assert.match(updateFeed.notes, /updater is now wired/i);
  assert.ok(updaterCapability.permissions.includes("updater:default"));
  assert.match(envExample, /SUPABASE_URL=/);
  assert.match(envExample, /TAURI_PUBLIC_KEY=/);
  assert.match(envExample, /SUPABASE_AUTH_REDIRECT_URL=legacydock:\/\/auth\/callback/);
  assert.match(envExample, /VITE_SUPABASE_URL=/);
  assert.match(envExample, /VITE_SUPABASE_ANON_KEY=/);
  assert.match(envExample, /VITE_SUPABASE_AUTH_REDIRECT_URL=legacydock:\/\/auth\/callback/);
  assert.match(envExample, /SUPABASE_STORAGE_BUCKET_EXPORTS=legacydock-exports/);
  assert.match(envExample, /SUPABASE_STORAGE_BUCKET_BACKUPS=legacydock-backups/);
  assert.match(envExample, /TAURI_PUBLIC_KEY_PATH=outputs\/updater\/legacydock\.key\.pub/);
  assert.match(envExample, /TAURI_SIGNING_PRIVATE_KEY_PATH=outputs\/updater\/legacydock\.key/);
  assert.match(envExample, /LEGACYDOCK_LIBIMOBILEDEVICE_DIR=tools\/libimobiledevice\/win-x64/);
  assert.match(envExample, /UPDATE_ENDPOINT=https:\/\/bnauijvhhsawcvscsefx\.supabase\.co\/storage\/v1\/object\/public\/legacydock-updates\/latest\.json/);
  assert.match(windowsSetup, /Windows packaging is now working locally/);
  assert.match(windowsSetup, /Repo-local `libimobiledevice` tools are installed/);
  assert.match(windowsSetup, /updater plugin is wired into the desktop app/i);
  assert.match(windowsSetup, /TAURI_SIGNING_PRIVATE_KEY_PATH/);
  assert.match(windowsSetup, /LegacyDock_0\.1\.2_x64-setup\.exe/);
  assert.match(windowsSetup, /LegacyDock_0\.1\.2_x64_en-US\.msi/);
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
  assert.match(desktopApp, /LegacyDock Console/);
  assert.match(desktopApp, /Repository Hub/);
  assert.match(desktopApp, /Package Browser/);
  assert.match(desktopApp, /Snapshots/);
  assert.match(desktopApp, /Reports And Controls/);
  assert.match(desktopApp, /Export workspace JSON/);
  assert.match(desktopApp, /Delete local data/);
  assert.match(desktopApp, /Read privacy notes/);
  assert.match(desktopApp, /Check for updates/);
  assert.match(desktopApp, /Install available update/);
  assert.match(desktopApp, /Send magic link/);
  assert.match(desktopApp, /Real-device QA/);
  assert.match(desktopApp, /Export QA checklist/);
  assert.match(desktopApp, /Installer 5/);
  assert.match(await readFile("desktop/src/supabase.ts", "utf8"), /createClient/);
  assert.equal(sharedHash, desktopHash);
});

test("publishes releases navigation and desktop artifact workflow", async () => {
  const index = await readFile("index.html", "utf8");
  const docs = await readFile("docs.html", "utf8");
  const repositoryHub = await readFile("docs/repository-hub.md", "utf8");
  const pricing = await readFile("pricing.html", "utf8");
  const consolePage = await readFile("console.html", "utf8");
  const releases = await readFile("releases.html", "utf8");
  const privacy = await readFile("docs/privacy.md", "utf8");
  const terms = await readFile("docs/terms.md", "utf8");
  const licenseReview = await readFile("docs/third-party-license-review.md", "utf8");
  const betaChecklist = await readFile("docs/beta-release-checklist.md", "utf8");
  const deviceQa = await readFile("docs/beta-device-qa.md", "utf8");
  const supabaseDoc = await readFile("docs/supabase-cloud.md", "utf8");
  const supabaseSql = await readFile("supabase/legacydock-cloud.sql", "utf8");
  const notices = await readFile("THIRD_PARTY_NOTICES.md", "utf8");
  const siteCss = await readFile("styles.css", "utf8");
  const desktopCss = await readFile("desktop/src/styles.css", "utf8");
  const workflow = await readFile(".github/workflows/release.yml", "utf8");

  assert.doesNotMatch(index.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0] || "", /Browse|Open Console/);
  assert.match(index, /href="\.\/releases\.html">Releases/);
  assert.match(docs, /href="\.\/releases\.html">Releases/);
  assert.match(docs, /Beta Checklist/);
  assert.match(docs, /Device QA/);
  assert.match(docs, /Supabase Cloud/);
  assert.match(repositoryHub, /Package Managers LegacyDock Should Understand/);
  assert.match(repositoryHub, /Installer 5/);
  assert.match(repositoryHub, /Zebra Official Repo/);
  assert.match(repositoryHub, /https:\/\/cydia\.bag-xml\.com\//);
  assert.match(releases, /Releases &middot; LegacyDock/);
  assert.match(releases, /class="release-tabs"/);
  assert.match(releases, /class="github-release"/);
  assert.match(releases, /class="release-assets"/);
  assert.match(releases, /Windows[\s\S]*\.exe/);
  assert.match(releases, /Windows[\s\S]*\.msi/);
  assert.doesNotMatch(releases, /LegacyDock_0\.1\.0_universal\.dmg/);
  assert.match(releases, /Source code \(zip\)/);
  assert.match(releases, /legacy Apple\/Cydia-inspired/);
  assert.match(releases, /removing the Studio card/);
  assert.match(releases, /\$49\.99/);
  assert.match(pricing, /id="care-yearly"/);
  assert.match(pricing, /\$49\.99\/yr/);
  assert.match(pricing, /2 months free!/);
  assert.match(pricing, /Save With Yearly Care/);
  assert.doesNotMatch(pricing, /class="billing-switch"/);
  assert.doesNotMatch(pricing, /<small>Care Yearly<\/small>/);
  assert.doesNotMatch(pricing, /<small>Studio<\/small>/);
  assert.match(consolePage, /Desktop Console Showcase/);
  assert.match(consolePage, /LegacyDock features local device detection/);
  assert.match(consolePage, /class="ld-footer console-footer"/);
  assert.match(consolePage, /Made for the legacy iOS community/);
  assert.doesNotMatch(consolePage, /Read-only inspection/);
  assert.doesNotMatch(consolePage, /Repository intelligence/);
  assert.doesNotMatch(consolePage, /src="\.\/app\.js"/);
  assert.doesNotMatch(consolePage, /data-view=/);
  assert.match(siteCss, /Helvetica Neue/);
  assert.match(siteCss, /Classic Apple \/ Cydia skin/);
  assert.match(desktopCss, /Helvetica Neue/);
  assert.match(desktopCss, /compact-summary/);
  assert.match(workflow, /LegacyDock-Windows/);
  assert.match(workflow, /TAURI_SIGNING_PRIVATE_KEY/);
  assert.match(workflow, /Generate updater manifest/);
  assert.match(workflow, /updates\/stable\.json/);
  assert.match(workflow, /WINDOWS_CERTIFICATE/);
  assert.doesNotMatch(workflow, /LegacyDock-macOS/);
  assert.match(privacy, /Hosted account deletion/);
  assert.match(terms, /Preview and beta builds/);
  assert.match(licenseReview, /Current Rule/);
  assert.match(betaChecklist, /updater regression/i);
  assert.match(betaChecklist, /Beta Device QA Runbook/);
  assert.match(deviceQa, /idevicepair validate/);
  assert.match(deviceQa, /Cydia, Zebra, Installer 5, or Sileo/);
  assert.match(supabaseDoc, /VITE_SUPABASE_AUTH_REDIRECT_URL/);
  assert.match(supabaseDoc, /magic-link auth/);
  assert.match(supabaseSql, /enable row level security/);
  assert.match(notices, /If that information is missing, do not bundle the asset/);
});
