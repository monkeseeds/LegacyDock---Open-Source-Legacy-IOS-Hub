import { devices, repositories, packages, snapshots, cloudPlans } from "../data/catalog.js";
import { buildPreservationReport } from "../lib/preservationReport.js";
import { createSnapshot } from "../lib/snapshotEngine.js";
import { scanRepositories } from "../lib/repositoryScanner.js";
import { buildDiagnostics, buildDoctorScores, buildRepairPlan, buildSnapshotIntelligence, buildHealthTimeline } from "./deviceDoctor.js";
import { desktopShellContract } from "./desktopShell.js";
import { commercialStoragePlan, createDurableStore } from "./durableStore.js";
import { cloudServiceStatus, createCompatibilitySubmission } from "./cloudServices.js";
import { buildDataExport, commercialComplianceStatus } from "./compliance.js";
import { createLicensePayload, signLicense, stripeIntegrationPlan, verifyLicense } from "./entitlements.js";
import { buildReadOnlyInspection, sshCredentialPolicy } from "./liveDeviceInspector.js";
import { planInstallOperation } from "./operationPlanner.js";
import { ingestPackageIndex } from "./repositoryIngestion.js";
import { queueMutation } from "./mutationExecutor.js";
import { releaseManifest } from "./releasePipeline.js";
import { readJsonStore, updateJsonStore } from "./workspaceStore.js";

const defaultWorkspace = { snapshots };

function notFound(resource) {
  return { status: 404, body: { error: `${resource} not found` } };
}

function badRequest(message) {
  return { status: 400, body: { error: message } };
}

function findDevice(id) {
  return devices.find((device) => device.id === id || device.identifier === id);
}

function findPackage(id) {
  return packages.find((pkg) => pkg.id === id);
}

function readinessGates() {
  return [
    { id: "desktop-shell", label: "Native desktop shell", status: "pending", owner: "Desktop" },
    { id: "signed-installers", label: "Signed installers and auto-update", status: "pending", owner: "Release" },
    { id: "live-device-adapters", label: "Live AFC/SSH/package-state adapters", status: "in-progress", owner: "Core" },
    { id: "durable-store", label: "Durable SQLite workspace store", status: "in-progress", owner: "Core" },
    { id: "mutation-executor", label: "Device mutation executor with rollback", status: "in-progress", owner: "Safety" },
    { id: "billing", label: "Stripe checkout and entitlement service", status: "in-progress", owner: "Cloud" },
    { id: "privacy-legal", label: "Privacy, terms, telemetry consent, data export", status: "in-progress", owner: "Ops" },
    { id: "hardware-qa", label: "Physical QA across iOS 6-9 hardware", status: "pending", owner: "QA" },
    { id: "license-review", label: "Third-party license and repository metadata review", status: "pending", owner: "Legal" }
  ];
}

function publicStatus() {
  return {
    product: "LegacyDock",
    api: "legacydock.local.v1",
    releaseStage: "commercial-build",
    localFirst: true,
    accountRequired: false,
    deviceMutationEnabled: false,
    capabilities: [
      "device-catalog",
      "device-doctor",
      "repository-health",
      "package-compatibility",
      "install-planning",
      "snapshots",
      "preservation-reports",
      "pricing-plans",
      "commercial-readiness",
      "durable-storage",
      "read-only-device-inspection",
      "safe-mutation-queue",
      "package-index-ingestion",
      "entitlements",
      "encrypted-cloud-contracts",
      "compliance-export",
      "release-manifest"
    ]
  };
}

function withCors(response) {
  return {
    status: response.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: response.body
  };
}

export function createCommercialApi(options = {}) {
  const workspacePath = options.workspacePath || "work/local-workspace.json";
  const storeOptions = options.storeOptions || {};

  async function workspace() {
    return readJsonStore(workspacePath, defaultWorkspace);
  }

  async function withStore(callback) {
    const store = await createDurableStore(storeOptions);
    try {
      return await callback(store);
    } finally {
      store.close();
    }
  }

  async function handle(method, pathname, body = {}) {
    const parts = pathname.split("/").filter(Boolean);
    if (method === "OPTIONS") return withCors({ status: 204, body: {} });

    try {
      if (method === "GET" && pathname === "/api/status") {
        return withCors({ status: 200, body: publicStatus() });
      }

      if (method === "GET" && pathname === "/api/commercial/readiness") {
        const gates = readinessGates();
        return withCors({
          status: 200,
          body: {
            gates,
            complete: gates.filter((gate) => gate.status === "complete").length,
            pending: gates.filter((gate) => gate.status === "pending").length,
            blocked: gates.filter((gate) => gate.status === "blocked").length
          }
        });
      }

      if (method === "GET" && pathname === "/api/pricing/plans") {
        return withCors({ status: 200, body: { plans: cloudPlans } });
      }

      if (method === "GET" && pathname === "/api/commercial/desktop") {
        return withCors({ status: 200, body: { desktop: desktopShellContract() } });
      }

      if (method === "GET" && pathname === "/api/storage/status") {
        const status = await withStore((store) => ({
          ...commercialStoragePlan(),
          activeEngine: store.engine,
          activePath: store.path
        }));
        return withCors({ status: 200, body: status });
      }

      if (method === "GET" && pathname === "/api/devices") {
        return withCors({ status: 200, body: { devices } });
      }

      if (method === "GET" && parts[0] === "api" && parts[1] === "devices" && parts[2] && !parts[3]) {
        const device = findDevice(parts[2]);
        return device ? withCors({ status: 200, body: { device } }) : withCors(notFound("Device"));
      }

      if (method === "GET" && parts[0] === "api" && parts[1] === "devices" && parts[2] && parts[3] === "doctor") {
        const device = findDevice(parts[2]);
        if (!device) return withCors(notFound("Device"));
        const currentWorkspace = await workspace();
        return withCors({
          status: 200,
          body: {
            device,
            scores: buildDoctorScores(device, repositories, packages),
            diagnostics: buildDiagnostics(device, repositories, packages),
            repairPlan: buildRepairPlan(device, repositories, packages),
            snapshot: buildSnapshotIntelligence(device, currentWorkspace.snapshots || []),
            timeline: buildHealthTimeline(device, currentWorkspace.snapshots || [])
          }
        });
      }

      if (method === "GET" && pathname === "/api/repositories") {
        return withCors({
          status: 200,
          body: {
            repositories,
            issuesByDevice: devices.map((device) => ({
              deviceId: device.id,
              issues: scanRepositories(device, repositories)
            }))
          }
        });
      }

      if (method === "GET" && pathname === "/api/packages") {
        return withCors({ status: 200, body: { packages } });
      }

      if (method === "POST" && pathname === "/api/inspect/read-only") {
        return withCors({
          status: 200,
          body: {
            inspection: buildReadOnlyInspection(body),
            sshPolicy: sshCredentialPolicy(body.ssh || {})
          }
        });
      }

      if (method === "POST" && pathname === "/api/install-plan") {
        const device = findDevice(body.deviceId);
        const pkg = findPackage(body.packageId);
        if (!device) return withCors(notFound("Device"));
        if (!pkg) return withCors(notFound("Package"));
        return withCors({
          status: 200,
          body: {
            plan: planInstallOperation(device, pkg, packages, { snapshotId: body.snapshotId })
          }
        });
      }

      if (method === "POST" && pathname === "/api/mutations/queue") {
        const device = findDevice(body.deviceId);
        const pkg = findPackage(body.packageId);
        if (!device) return withCors(notFound("Device"));
        if (!pkg) return withCors(notFound("Package"));
        const currentWorkspace = await workspace();
        const snapshot = (currentWorkspace.snapshots || []).find((item) => item.id === body.snapshotId);
        const plan = planInstallOperation(device, pkg, packages, { snapshotId: body.snapshotId });
        return withCors({
          status: 200,
          body: {
            mutation: queueMutation({
              device,
              plan,
              snapshot,
              confirmationPhrase: body.confirmationPhrase,
              executorEnabled: false
            })
          }
        });
      }

      if (method === "POST" && pathname === "/api/repositories/ingest") {
        const repository = repositories.find((item) => item.id === body.repositoryId);
        if (!repository) return withCors(notFound("Repository"));
        const result = ingestPackageIndex({
          repository,
          text: body.packageIndexText,
          ttlHours: body.ttlHours
        });
        await withStore((store) => store.append("packageIndexes", result));
        return withCors({ status: 201, body: { ingestion: result } });
      }

      if (method === "POST" && pathname === "/api/snapshots") {
        const device = findDevice(body.deviceId);
        if (!device) return withCors(notFound("Device"));
        const snapshot = createSnapshot(device, repositories, packages);
        await updateJsonStore(workspacePath, defaultWorkspace, (current) => ({
          ...current,
          snapshots: [snapshot, ...(current.snapshots || [])]
        }));
        return withCors({ status: 201, body: { snapshot } });
      }

      if (method === "GET" && parts[0] === "api" && parts[1] === "preservation" && parts[2]) {
        const device = findDevice(parts[2]);
        if (!device) return withCors(notFound("Device"));
        const currentWorkspace = await workspace();
        const snapshot = (currentWorkspace.snapshots || []).find((item) => item.deviceId === device.id);
        return withCors({
          status: 200,
          body: {
            report: buildPreservationReport(device, repositories, packages, snapshot)
          }
        });
      }

      if (method === "GET" && pathname === "/api/entitlements/status") {
        const payload = createLicensePayload({ plan: "free" });
        return withCors({
          status: 200,
          body: {
            license: payload,
            signature: signLicense(payload),
            stripe: stripeIntegrationPlan()
          }
        });
      }

      if (method === "POST" && pathname === "/api/entitlements/verify") {
        return withCors({ status: 200, body: { result: verifyLicense(body) } });
      }

      if (method === "GET" && pathname === "/api/cloud/status") {
        return withCors({ status: 200, body: cloudServiceStatus() });
      }

      if (method === "POST" && pathname === "/api/cloud/submissions") {
        const submission = createCompatibilitySubmission(body);
        await withStore((store) => store.append("submissions", submission));
        return withCors({ status: 201, body: { submission } });
      }

      if (method === "GET" && pathname === "/api/security/compliance") {
        return withCors({ status: 200, body: commercialComplianceStatus() });
      }

      if (method === "GET" && pathname === "/api/security/export") {
        const exportPayload = await withStore(async (store) => buildDataExport({
          devices,
          snapshots: await store.get("snapshots", []),
          reports: await store.get("reports", []),
          settings: await store.get("settings", {}),
          submissions: await store.get("submissions", [])
        }));
        return withCors({ status: 200, body: exportPayload });
      }

      if (method === "GET" && pathname === "/api/release/manifest") {
        return withCors({ status: 200, body: releaseManifest() });
      }

      return withCors(notFound("Route"));
    } catch (error) {
      return withCors({ status: 500, body: { error: error.message } });
    }
  }

  return { handle };
}

export function assertPostBody(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return withCors(badRequest("JSON object body required."));
  }
  return null;
}
