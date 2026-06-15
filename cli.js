#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { devices, packages, repositories, snapshots } from "./src/data/catalog.js";
import { buildPreservationReport } from "./src/lib/preservationReport.js";
import { createSnapshot } from "./src/lib/snapshotEngine.js";
import { createLibimobiledeviceAdapter } from "./src/core/deviceAdapter.js";
import { commercialComplianceStatus } from "./src/core/compliance.js";
import { desktopShellContract } from "./src/core/desktopShell.js";
import { commercialStoragePlan, createDurableStore } from "./src/core/durableStore.js";
import { buildDiagnostics, buildDoctorScores, buildRepairPlan } from "./src/core/deviceDoctor.js";
import { buildReadOnlyInspection } from "./src/core/liveDeviceInspector.js";
import { parsePackageIndex } from "./src/core/packageIndex.js";
import { planInstallOperation } from "./src/core/operationPlanner.js";
import { ingestPackageIndex } from "./src/core/repositoryIngestion.js";
import { releaseManifest } from "./src/core/releasePipeline.js";
import { updateJsonStore } from "./src/core/workspaceStore.js";

const workspacePath = resolve("work/local-workspace.json");
const fallbackWorkspace = { snapshots };

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}

function findDevice(id = devices[0].id) {
  const device = devices.find((item) => item.id === id || item.identifier === id);
  if (!device) throw new Error(`Unknown device: ${id}`);
  return device;
}

function findPackage(id) {
  const pkg = packages.find((item) => item.id === id);
  if (!pkg) throw new Error(`Unknown package: ${id}`);
  return pkg;
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || command === "help") {
    console.log(`LegacyDock CLI

Commands:
  discover                         Detect USB devices with libimobiledevice
  devices                          Print fixture devices
  doctor [device-id]               Run local repository health checks
  plan-install <device-id> <pkg>    Build a safety-gated install plan
  snapshot [device-id]             Create a local manifest snapshot
  report [device-id]               Print a preservation report
  parse-index <file> [repo-id]      Parse a Debian Packages index
  ingest-index <repo-id> <file>     Ingest package index metadata
  storage-status                    Print durable storage status
  desktop-contract                  Print desktop shell contract
  inspect-readonly <status> <srcs>  Parse dpkg status and Cydia sources
  compliance                        Print privacy/legal readiness
  release-manifest                  Print release pipeline manifest
`);
    return;
  }

  if (command === "discover") {
    const adapter = createLibimobiledeviceAdapter();
    printJson(await adapter.discoverDevices());
    return;
  }

  if (command === "devices") {
    printJson(devices);
    return;
  }

  if (command === "doctor") {
    const device = findDevice(args[0]);
    printJson({
      device: device.name,
      scores: buildDoctorScores(device, repositories, packages),
      diagnostics: buildDiagnostics(device, repositories, packages),
      careRepairPlan: buildRepairPlan(device, repositories, packages)
    });
    return;
  }

  if (command === "plan-install") {
    const device = findDevice(args[0]);
    const pkg = findPackage(args[1]);
    printJson(planInstallOperation(device, pkg, packages));
    return;
  }

  if (command === "snapshot") {
    const device = findDevice(args[0]);
    const snapshot = createSnapshot(device, repositories, packages);
    await updateJsonStore(workspacePath, fallbackWorkspace, (workspace) => ({
      ...workspace,
      snapshots: [snapshot, ...(workspace.snapshots || [])]
    }));
    printJson(snapshot);
    return;
  }

  if (command === "report") {
    const device = findDevice(args[0]);
    const snapshot = snapshots.find((item) => item.deviceId === device.id);
    printJson(buildPreservationReport(device, repositories, packages, snapshot));
    return;
  }

  if (command === "parse-index") {
    const filePath = args[0];
    if (!filePath) throw new Error("parse-index requires a file path.");
    const text = await readFile(filePath, "utf8");
    printJson(parsePackageIndex(text, args[1] || "local-index"));
    return;
  }

  if (command === "ingest-index") {
    const repoId = args[0];
    const filePath = args[1];
    if (!repoId || !filePath) throw new Error("ingest-index requires a repository id and file path.");
    const repository = repositories.find((item) => item.id === repoId);
    if (!repository) throw new Error(`Unknown repository: ${repoId}`);
    const text = await readFile(filePath, "utf8");
    printJson(ingestPackageIndex({ repository, text }));
    return;
  }

  if (command === "storage-status") {
    const store = await createDurableStore();
    printJson({ ...commercialStoragePlan(), activeEngine: store.engine, activePath: store.path });
    store.close();
    return;
  }

  if (command === "desktop-contract") {
    printJson(desktopShellContract());
    return;
  }

  if (command === "inspect-readonly") {
    const statusPath = args[0];
    const sourcesPath = args[1];
    if (!statusPath || !sourcesPath) throw new Error("inspect-readonly requires dpkg status and sources files.");
    printJson(buildReadOnlyInspection({
      dpkgStatusText: await readFile(statusPath, "utf8"),
      sourcesText: await readFile(sourcesPath, "utf8")
    }));
    return;
  }

  if (command === "compliance") {
    printJson(commercialComplianceStatus());
    return;
  }

  if (command === "release-manifest") {
    printJson(releaseManifest());
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
