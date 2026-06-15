import { parseDebianPackageIndex, parseRelationshipList } from "./packageIndex.js";

export function parseCydiaSources(text = "") {
  return String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const parts = line.split(/\s+/);
      const url = parts.find((part) => /^https?:\/\//.test(part));
      return url ? { type: parts[0] || "deb", url, distribution: parts[2] || ".", components: parts.slice(3) } : null;
    })
    .filter(Boolean);
}

export function parseDpkgStatus(text = "") {
  return parseDebianPackageIndex(text).map((record) => ({
    id: record.Package,
    name: record.Name || record.Package,
    version: record.Version || "unknown",
    status: record.Status || "unknown",
    architecture: record.Architecture || "iphoneos-arm",
    dependencies: parseRelationshipList(record.Depends),
    repository: record.Cydia_Repository || record["Cydia Repository"] || "installed",
    summary: record.Description || "Installed package"
  })).filter((pkg) => pkg.id);
}

export function inferPackageManager(files = {}) {
  if (files["/Applications/Cydia.app"] || files["/etc/apt/sources.list.d/cydia.list"]) return "Cydia";
  if (files["/Applications/Sileo.app"]) return "Sileo";
  if (files["/Applications/Zebra.app"]) return "Zebra";
  return "unknown";
}

export function buildReadOnlyInspection({ lockdown = {}, sourcesText = "", dpkgStatusText = "", files = {} } = {}) {
  const installedPackages = parseDpkgStatus(dpkgStatusText);
  const sources = parseCydiaSources(sourcesText);
  return {
    mode: "read-only",
    mutationEnabled: false,
    device: {
      udid: lockdown.udid,
      name: lockdown.DeviceName || lockdown.name || "Detected device",
      identifier: lockdown.ProductType || lockdown.identifier || "Unknown",
      firmware: lockdown.ProductVersion || lockdown.firmware || "Unknown",
      batteryHealth: lockdown.BatteryCurrentCapacity ? Number(lockdown.BatteryCurrentCapacity) : null,
      packageManager: inferPackageManager(files),
      packageCount: installedPackages.length,
      repositoryCount: sources.length
    },
    packageState: installedPackages,
    sources,
    safety: [
      "AFC inspection is read-only.",
      "Package manager state is parsed before any install or source mutation is considered.",
      "SSH inspection must be opt-in and never stores raw credentials."
    ]
  };
}

export function sshCredentialPolicy(input = {}) {
  return {
    allowed: Boolean(input.host && input.username && input.userConfirmed === true),
    storage: "never-persist-raw-password",
    requiresExplicitUserConfirmation: true,
    redacted: {
      host: input.host || null,
      username: input.username || null,
      password: input.password ? "[redacted]" : null,
      privateKey: input.privateKey ? "[redacted]" : null
    }
  };
}
