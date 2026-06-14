const devices = [
  { id: "iphone4-black-32", name: "iPhone 4", identifier: "iPhone3,1", chip: "A4", firmware: "7.1.2", os: "iOS", jailbreak: "p0sixspwn", manager: "Cydia", packageCount: 43, repositoryCount: 7, storageUsed: 68, memoryPressure: 54, batteryHealth: 82, status: "stable", services: ["AFC", "SSH", "Lockdown"], installedPackages: ["winterboard", "icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"], repositories: ["bigboss", "cydia-telesphoreo", "modmyi-archive", "legacy-archive"], notes: "Collector unit with stable Cydia environment and clean baseline snapshot." },
  { id: "ipad2-wifi-16", name: "iPad 2", identifier: "iPad2,1", chip: "A5", firmware: "9.3.5", os: "iOS", jailbreak: "Phoenix", manager: "Cydia", packageCount: 31, repositoryCount: 5, storageUsed: 82, memoryPressure: 71, batteryHealth: 74, status: "attention", services: ["AFC", "Lockdown"], installedPackages: ["icleaner-pro", "batterylife", "filza", "preferenceloader"], repositories: ["bigboss", "legacy-archive", "legacy-archive-mirror", "cydia-telesphoreo"], notes: "Needs repository cleanup and dependency review before more tweaks are installed." },
  { id: "iphone5-white-64", name: "iPhone 5", identifier: "iPhone5,2", chip: "A6", firmware: "8.4.1", os: "iOS", jailbreak: "EtasonJB", manager: "Cydia", packageCount: 57, repositoryCount: 9, storageUsed: 49, memoryPressure: 46, batteryHealth: 91, status: "stable", services: ["AFC", "SSH", "Lockdown"], installedPackages: ["winterboard", "activator", "icleaner-pro", "noslowanimations", "openssh"], repositories: ["bigboss", "chariz-legacy", "modmyi-archive", "cydia-telesphoreo"], notes: "Primary testing device for theme and performance package compatibility." }
];

const repositories = [
  { id: "bigboss", name: "BigBoss", url: "http://apt.thebigboss.org/repofiles/cydia/", status: "verified", lastRefreshDays: 2, trust: 98, packageIndexHash: "sha256:bb4c-local-fixture", tags: ["core", "legacy"] },
  { id: "cydia-telesphoreo", name: "Cydia/Telesphoreo", url: "http://apt.saurik.com/", status: "verified", lastRefreshDays: 5, trust: 96, packageIndexHash: "sha256:ct7-local-fixture", tags: ["core"] },
  { id: "modmyi-archive", name: "ModMyi Archive", url: "http://apt.modmyi.com/", status: "slow", lastRefreshDays: 42, trust: 76, packageIndexHash: "sha256:mm1-local-fixture", tags: ["archive"] },
  { id: "legacy-archive", name: "Legacy Archive", url: "https://legacy.example/archive", status: "duplicate-risk", lastRefreshDays: 8, trust: 84, packageIndexHash: "sha256:la9-local-fixture", tags: ["archive", "community"] },
  { id: "legacy-archive-mirror", name: "Legacy Archive Mirror", url: "https://mirror.legacy.example/archive", status: "duplicate-risk", lastRefreshDays: 8, trust: 80, packageIndexHash: "sha256:la9-local-fixture", tags: ["archive", "mirror"] },
  { id: "chariz-legacy", name: "Chariz Legacy", url: "https://repo.chariz.com/", status: "verified", lastRefreshDays: 4, trust: 91, packageIndexHash: "sha256:cz6-local-fixture", tags: ["marketplace"] }
];

const iosCompatibilityVersions = [
  "6.0", "6.0.1", "6.0.2", "6.1", "6.1.1", "6.1.2", "6.1.3", "6.1.4", "6.1.5", "6.1.6",
  "7.0", "7.0.1", "7.0.2", "7.0.3", "7.0.4", "7.0.5", "7.0.6", "7.1", "7.1.1", "7.1.2",
  "8.0", "8.0.1", "8.0.2", "8.1", "8.1.1", "8.1.2", "8.1.3", "8.2", "8.3", "8.4", "8.4.1",
  "9.0", "9.0.1", "9.0.2", "9.1", "9.2", "9.2.1", "9.3", "9.3.1", "9.3.2", "9.3.3", "9.3.4", "9.3.5", "9.3.6"
];

const packages = [
  { id: "winterboard", name: "WinterBoard", category: "theme", version: "0.9.3919", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate", "preferenceloader"], conflicts: ["iconomatic"], rating: 4.8, communitySuccess: 99, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Classic theming engine with strong legacy device support.", notes: "Known conflict with IconOmatic on some iOS 7 setups." },
  { id: "icleaner-pro", name: "iCleaner Pro", category: "repair", version: "7.7.5", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["apt7-lib"], conflicts: [], rating: 4.9, communitySuccess: 98, risk: "low", batteryImpact: "positive", performanceImpact: "positive", summary: "Removes cache waste and stale package data.", notes: "Create a snapshot before deep preference cleanup." },
  { id: "activator", name: "Activator", category: "safe", version: "1.9.13", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2"], dependencies: ["mobilesubstrate", "flipswitch"], conflicts: ["springtomize-old"], rating: 4.7, communitySuccess: 94, risk: "medium", batteryImpact: "small", performanceImpact: "small", summary: "Gesture and shortcut automation for legacy iOS.", notes: "Some iOS 9 builds report springboard restarts." },
  { id: "noslowanimations", name: "NoSlowAnimations", category: "safe", version: "4.2.1", repository: "chariz-legacy", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.6, communitySuccess: 97, risk: "low", batteryImpact: "neutral", performanceImpact: "positive", summary: "Reduces animation delays across older devices.", notes: "Best paired with conservative animation values." },
  { id: "openssh", name: "OpenSSH", category: "repair", version: "6.7p1", repository: "cydia-telesphoreo", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["openssl", "berkeleydb"], conflicts: [], rating: 4.5, communitySuccess: 96, risk: "medium", batteryImpact: "background service", performanceImpact: "light", summary: "Secure shell access for repairs, backups, and diagnostics.", notes: "Change the default password immediately after install." },
  { id: "batterylife", name: "BatteryLife", category: "diagnostic", version: "1.6.10", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["preferenceloader"], conflicts: [], rating: 4.4, communitySuccess: 93, risk: "low", batteryImpact: "neutral", performanceImpact: "light", summary: "Displays battery diagnostics and cycle health.", notes: "Useful for repair shop intake and collector records." },
  { id: "filza", name: "Filza File Manager", category: "repair", version: "3.5.2", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["zip", "unzip", "coreutils"], conflicts: [], rating: 4.6, communitySuccess: 92, risk: "medium", batteryImpact: "neutral", performanceImpact: "light", summary: "On-device file manager for advanced repairs.", notes: "Powerful tool. LegacyDock should warn before destructive file edits." }
];

const seedSnapshots = [
  { id: "snap-clean-iphone4", title: "Clean jailbreak baseline", createdAt: "2026-06-14T21:12:00+08:00", deviceId: "iphone4-black-32", packageIds: ["icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"], repositoryIds: ["bigboss", "cydia-telesphoreo"], state: "verified", hash: "sha256:legacydock-clean-baseline" },
  { id: "snap-theme-iphone5", title: "Theme pack experiment", createdAt: "2026-06-13T18:40:00+08:00", deviceId: "iphone5-white-64", packageIds: ["winterboard", "activator", "icleaner-pro", "noslowanimations"], repositoryIds: ["bigboss", "chariz-legacy", "modmyi-archive"], state: "restorable", hash: "sha256:legacydock-theme-pack" },
  { id: "snap-shop-ipad2", title: "Repair shop intake", createdAt: "2026-06-11T10:25:00+08:00", deviceId: "ipad2-wifi-16", packageIds: ["icleaner-pro", "batterylife", "filza"], repositoryIds: ["bigboss", "legacy-archive", "legacy-archive-mirror"], state: "needs-review", hash: "sha256:legacydock-shop-intake" }
];

const cloudPlans = [
  { name: "Free", price: "$0", summary: "Unlimited Device Doctor scans, local snapshots, repository checks, compatibility checks, backups, and offline workflows." },
  { name: "LegacyDock Care", price: "$4.99/mo", summary: "Intelligent repair plans, community intelligence, bootloop risk, smart alternatives, modernization guidance, health timeline, cloud sync, and backups." },
  { name: "Care Yearly", price: "$39/yr", summary: "All LegacyDock Care intelligence with yearly billing for collectors and active maintainers." },
  { name: "Studio", price: "$15/mo", summary: "Repair shop inventory, customer notes, shared backups, team workspaces, and priority support." }
];

const restorationWorkflows = [
  {
    id: "legacy-ios-kit-shsh",
    name: "Save SHSH blobs",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "low",
    families: ["32-bit", "64-bit"],
    summary: "Preserve restore options by collecting onboard or server-available SHSH data before changing the device.",
    steps: ["Create a LegacyDock snapshot", "Confirm battery and cable stability", "Use Legacy iOS Kit as the external SHSH workflow", "Attach saved blob metadata to the preservation report"]
  },
  {
    id: "legacy-ios-kit-jailbreak-matrix",
    name: "Jailbreak method lookup",
    source: "Legacy iOS Kit Jailbreaking wiki",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit/wiki/Jailbreaking",
    risk: "medium",
    families: ["32-bit"],
    firmwareRange: ["7.0", "9.3.6"],
    summary: "Use the upstream jailbreak matrix to identify candidate methods for legacy 32-bit firmware without hiding tethered or sideload requirements.",
    steps: ["Read the upstream method notes", "Check whether sideloading, Safari, or PC/Mac execution is required", "Record tethered or semi-tethered constraints", "Keep LegacyDock as the documentation and recovery layer"]
  },
  {
    id: "legacy-ios-kit-ota-downgrade",
    name: "OTA restore or downgrade research",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    chips: ["A5", "A6"],
    summary: "Check whether the device has a signed OTA target, saved blobs, or a supported restore path before any destructive action.",
    steps: ["Export a preservation report", "Confirm exact model identifier", "Check signed OTA and blob requirements", "Do not proceed without a recovery plan"]
  },
  {
    id: "legacy-ios-kit-ssh-ramdisk",
    name: "SSH ramdisk repair planning",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    families: ["32-bit", "64-bit"],
    summary: "Plan advanced recovery or data extraction through an external ramdisk workflow when ordinary AFC/SSH access is unavailable.",
    steps: ["Snapshot known package state", "Confirm device support upstream", "Use read-only recovery goals first", "Document every mutation in repair history"]
  }
];

function parseVersion(version) {
  return String(version).split(".").map((part) => Number(part.padEnd(2, "0"))).reduce((total, part, index) => total + part / Math.pow(100, index), 0);
}

function inFirmwareRange(firmware, range) {
  const current = parseVersion(firmware);
  return current >= parseVersion(range[0]) && current <= parseVersion(range[1]);
}

function compatibleVersionsForRange(range) {
  return iosCompatibilityVersions.filter((version) => inFirmwareRange(version, range));
}

function platformSupportsFirmware(firmware) {
  return iosCompatibilityVersions.includes(firmware);
}

function evaluateCompatibility(device, pkg) {
  const catalogOk = platformSupportsFirmware(device.firmware);
  const firmwareOk = inFirmwareRange(device.firmware, pkg.firmwareRange);
  const deviceOk = pkg.devices.includes(device.identifier);
  const missingDependencies = pkg.dependencies.filter((dependency) => !device.installedPackages.includes(dependency));
  const installedConflicts = pkg.conflicts.filter((conflict) => device.installedPackages.includes(conflict));
  const checks = [
    { label: "Platform catalog", state: catalogOk ? "pass" : "block", detail: catalogOk ? `${device.os} ${device.firmware} is in the LegacyDock iOS 6.x.x-9.x.x catalog.` : `${device.os} ${device.firmware} is outside the current LegacyDock catalog.` },
    { label: "Firmware", state: firmwareOk ? "pass" : "block", detail: firmwareOk ? `${device.os} ${device.firmware} is inside ${pkg.firmwareRange.join(" to ")}.` : `${device.os} ${device.firmware} is outside ${pkg.firmwareRange.join(" to ")}.` },
    { label: "Device", state: deviceOk ? "pass" : "block", detail: deviceOk ? `${device.identifier} is listed as supported.` : `${device.identifier} is not in package metadata.` },
    { label: "Dependencies", state: missingDependencies.length ? "warn" : "pass", detail: missingDependencies.length ? `Missing dependencies: ${missingDependencies.join(", ")}.` : "All known dependencies are already present." },
    { label: "Conflicts", state: installedConflicts.length ? "warn" : "pass", detail: installedConflicts.length ? `Known installed conflicts: ${installedConflicts.join(", ")}.` : "No known installed conflicts detected." },
    { label: "Community", state: pkg.communitySuccess >= 95 ? "pass" : pkg.communitySuccess >= 90 ? "warn" : "block", detail: `${pkg.communitySuccess}% opt-in community success rate.` }
  ];
  const blocked = checks.some((check) => check.state === "block");
  const warnings = checks.filter((check) => check.state === "warn").length;
  const score = Math.max(0, Math.round(pkg.communitySuccess - warnings * 6 - (blocked ? 36 : 0)));
  return { supported: !blocked, recommendation: blocked ? "Not recommended" : warnings ? "Review first" : "Recommended", score, checks };
}

function packageIcon(pkg) {
  const paths = {
    theme: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" d="M24 7 41 17v14L24 41 7 31V17L24 7Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="m8 17 16 10 16-10M24 27v13"/><circle cx="24" cy="17" r="4" fill="currentColor"/>',
    repair: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M18 8h12l2 10H16l2-10ZM14 18h20l5 22H9l5-22Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M17 28h14M19 35h10"/>',
    safe: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M12 25 21 34 37 15"/><path fill="none" stroke="currentColor" stroke-width="3" d="M24 43a19 19 0 1 0 0-38 19 19 0 0 0 0 38Z"/>',
    diagnostic: '<rect x="7" y="17" width="31" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M41 22v6M14 25h7M25 25h5"/>'
  };
  const fallback = '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" d="M14 6h14l8 8v28H14V6Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M27 7v9h8M20 25h12M20 32h8"/>';
  return `<svg viewBox="0 0 48 48" aria-hidden="true">${paths[pkg.category] || fallback}</svg>`;
}

function scoreDevice(device, packageList) {
  const supportedCount = packageList.filter((pkg) => evaluateCompatibility(device, pkg).supported).length;
  return {
    Compatibility: Math.round((supportedCount / packageList.length) * 100),
    Stability: Math.max(0, Math.round(100 - device.memoryPressure * 0.28 - (device.status === "attention" ? 14 : 0))),
    Community: Math.round(packageList.reduce((sum, pkg) => sum + pkg.communitySuccess, 0) / packageList.length),
    Performance: Math.max(0, Math.round(100 - device.storageUsed * 0.22 - device.memoryPressure * 0.18))
  };
}

function deviceArchitecture(device) {
  return ["A4", "A5", "A6"].includes(device.chip) ? "32-bit" : "64-bit";
}

function workflowMatchesDevice(device, workflow) {
  const family = deviceArchitecture(device);
  const familyOk = !workflow.families || workflow.families.includes(family);
  const chipOk = !workflow.chips || workflow.chips.includes(device.chip);
  const firmwareOk = !workflow.firmwareRange || inFirmwareRange(device.firmware, workflow.firmwareRange);
  return (familyOk || chipOk) && firmwareOk;
}

function adviseRestoration(device) {
  return restorationWorkflows.map((workflow) => {
    const match = workflowMatchesDevice(device, workflow);
    return {
      ...workflow,
      match,
      recommendation: match ? "Relevant" : "Research only",
      reason: match
        ? `${device.name} (${device.identifier}, ${device.chip}, ${device.os} ${device.firmware}) fits this workflow's current research rules.`
        : `${device.name} does not fully match the current local rule, but the upstream guide may still be useful for adjacent research.`
    };
  });
}

function scanRepositories(device, repositoryList) {
  const selected = repositoryList.filter((repo) => device.repositories.includes(repo.id));
  const hashMap = new Map();
  const issues = [];
  selected.forEach((repo) => {
    if (repo.status === "slow") issues.push({ severity: "low", title: `${repo.name} is slow`, detail: `${repo.name} has not refreshed in ${repo.lastRefreshDays} days.`, action: "Refresh source" });
    if (repo.lastRefreshDays > 30) issues.push({ severity: "medium", title: `${repo.name} package lists are stale`, detail: "Stale package indexes can hide dependency updates and conflict metadata.", action: "Rebuild index" });
    const existing = hashMap.get(repo.packageIndexHash);
    if (existing) issues.push({ severity: "medium", title: "Duplicate repository index", detail: `${repo.name} mirrors the same package index as ${existing.name}.`, action: "Merge duplicate" });
    else hashMap.set(repo.packageIndexHash, repo);
  });
  if (!device.services.includes("SSH")) issues.push({ severity: "low", title: "SSH repair channel unavailable", detail: "Some advanced recovery workflows need SSH. Only enable it when needed and secure credentials.", action: "Review access" });
  return issues;
}

function average(values) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function repositoryHealthScore(repoIssues) {
  const penalty = repoIssues.reduce((total, issue) => total + (issue.severity === "medium" ? 10 : issue.severity === "high" ? 18 : 5), 0);
  return Math.max(0, 100 - penalty);
}

function doctorScores(device) {
  const base = scoreDevice(device, packages);
  const repoIssues = scanRepositories(device, repositories);
  const battery = Math.max(0, Math.min(100, Number(device.batteryHealth || 0)));
  const storage = Math.max(0, Math.round(100 - Number(device.storageUsed || 0) * 0.72));
  const repository = repositoryHealthScore(repoIssues);
  const scores = [
    { id: "performance", label: "Performance", value: base.Performance, explanation: "Starts at 100 and subtracts storage pressure and memory pressure." },
    { id: "stability", label: "Stability", value: base.Stability, explanation: "Starts at 100 and subtracts memory pressure plus review-state penalties." },
    { id: "battery", label: "Battery", value: battery, explanation: "Uses detected or recorded battery capacity where available." },
    { id: "storage", label: "Storage", value: storage, explanation: "Estimates remaining safety margin from current storage usage." },
    { id: "compatibility", label: "Compatibility", value: base.Compatibility, explanation: "Percent of known catalog packages supported by this firmware and device identifier." },
    { id: "repository", label: "Repository Health", value: repository, explanation: "Starts at 100 and subtracts duplicate, stale, slow, dead, or invalid repository findings." }
  ];
  return [{ id: "health", label: "Overall Health", value: average(scores.map((score) => score.value)), explanation: "Average of every explainable Device Doctor score." }, ...scores];
}

function doctorDiagnostics(device) {
  const repoIssues = scanRepositories(device, repositories).map((issue) => ({
    ...issue,
    category: "repository",
    why: issue.title.includes("Duplicate")
      ? "Duplicate repositories may slow refresh operations and create duplicate package entries."
      : "Repository problems can hide dependency updates, conflict metadata, and repair paths.",
    recommendation: issue.action
  }));
  const packageIssues = packages.flatMap((pkg) => {
    const result = evaluateCompatibility(device, pkg);
    return result.checks
      .filter((check) => check.state !== "pass")
      .map((check) => ({
        severity: check.state === "block" ? "high" : "medium",
        category: "package",
        title: `${pkg.name}: ${check.label}`,
        detail: check.detail,
        why: check.state === "block" ? "This package may fail or destabilize the device." : "This should be reviewed before making changes.",
        recommendation: result.recommendation
      }));
  });

  if (device.storageUsed >= 80) {
    packageIssues.push({
      severity: "medium",
      category: "storage",
      title: "Storage pressure detected",
      detail: `${device.name} is using ${device.storageUsed}% of its recorded storage.`,
      why: "Low storage can cause package installs, restores, and cache refreshes to fail.",
      recommendation: "Create a snapshot, then clean caches and orphaned package files."
    });
  }

  if (device.batteryHealth && device.batteryHealth < 80) {
    packageIssues.push({
      severity: "medium",
      category: "battery",
      title: "Battery health needs attention",
      detail: `${device.name} battery health is recorded at ${device.batteryHealth}%.`,
      why: "Weak batteries increase the risk of failed restores and unexpected shutdowns.",
      recommendation: "Charge fully before repair operations and consider battery service."
    });
  }

  return [...repoIssues, ...packageIssues];
}

function careRepairPlan(device) {
  const diagnostics = doctorDiagnostics(device);
  return {
    estimatedSeconds: Math.max(15, diagnostics.slice(0, 5).length * 8),
    rollbackAvailable: Boolean(selectedSnapshot()),
    steps: diagnostics.slice(0, 5).map((issue) => ({
      title: issue.recommendation,
      risk: issue.severity,
      changes: issue.category === "repository" ? "Repository metadata only" : "Package plan only",
      why: issue.why
    }))
  };
}

function communitySignals(pkg) {
  return {
    installs: Math.round(pkg.communitySuccess * 186 + pkg.rating * 1000),
    success: `${pkg.communitySuccess}%`,
    battery: pkg.batteryImpact,
    performance: pkg.performanceImpact,
    stability: pkg.risk === "low" ? "Excellent" : "Review first",
    conflicts: pkg.conflicts.length,
    recommended: pkg.communitySuccess >= 95 && pkg.risk === "low"
  };
}

function bootloopRisk(pkg) {
  const confidence = Math.max(40, Math.min(99, pkg.communitySuccess - (pkg.risk === "medium" ? 4 : 0)));
  return {
    risk: pkg.risk === "low" ? "Very Low" : pkg.risk === "medium" ? "Moderate" : "High",
    confidence,
    reports: pkg.risk === "low" ? 0 : pkg.conflicts.length + 1,
    incompatibilities: pkg.conflicts
  };
}

function smartAlternatives(targetPackage) {
  return packages
    .filter((pkg) => pkg.id !== targetPackage.id && (pkg.category === targetPackage.category || pkg.risk === "low"))
    .sort((a, b) => b.communitySuccess - a.communitySuccess)
    .slice(0, 3)
    .map((pkg) => ({ name: pkg.name, reason: `${pkg.communitySuccess}% success, ${pkg.risk} risk, ${pkg.performanceImpact} performance impact.` }));
}

function modernizationRecommendations(device) {
  return [
    { title: "Certificate and TLS review", detail: "Improves access to modern HTTPS services where legacy firmware still allows it.", confidence: device.firmware.startsWith("9.") ? 92 : 84 },
    { title: "Conservative animation tuning", detail: "Makes older devices feel faster without heavy system modifications.", confidence: 95 },
    { title: "Repository cleanup", detail: "Speeds refreshes and reduces duplicate package metadata.", confidence: 97 }
  ];
}

function snapshotIntelligence(device) {
  const latest = state.snapshots.find((snapshot) => snapshot.deviceId === device.id);
  return {
    rollbackAvailable: Boolean(latest),
    latest: latest?.title || "No snapshot yet",
    recovery: latest ? "About 2 minutes" : "Unavailable until a snapshot exists",
    recommendation: latest ? "Use the latest snapshot as rollback before repair." : "Create a local snapshot before running any repair."
  };
}

function healthTimeline(device) {
  return [
    ...state.snapshots.filter((snapshot) => snapshot.deviceId === device.id).slice(0, 3).map((snapshot) => ({
      type: "Snapshot",
      title: snapshot.title,
      detail: `${snapshot.packageIds.length} packages and ${snapshot.repositoryIds.length} repositories captured.`,
      date: snapshot.createdAt
    })),
    { type: "Scan", title: "Device Doctor scan", detail: "Health, compatibility, repository, package, battery, and storage checks refreshed locally.", date: new Date().toISOString() }
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createSnapshot(device, repositoryList, packageList) {
  const stamp = new Date().toISOString();
  const packageIds = packageList.filter((pkg) => device.installedPackages.includes(pkg.id)).map((pkg) => pkg.id);
  const repositoryIds = repositoryList.filter((repo) => device.repositories.includes(repo.id)).map((repo) => repo.id);
  return { id: `snap-${device.id}-${Date.now()}`, title: `${device.name} working set`, createdAt: stamp, deviceId: device.id, packageIds, repositoryIds, state: "verified", hash: `local:${device.identifier}:${packageIds.length}:${repositoryIds.length}:${stamp}` };
}

function diffSnapshots(left, right) {
  const leftPackages = new Set(left.packageIds);
  const rightPackages = new Set(right.packageIds);
  return {
    added: [...rightPackages].filter((id) => !leftPackages.has(id)),
    removed: [...leftPackages].filter((id) => !rightPackages.has(id)),
    unchanged: [...rightPackages].filter((id) => leftPackages.has(id))
  };
}

function buildPreservationReport(device, repositoryList, packageList, snapshot) {
  return {
    schema: "legacydock.preservation-report.v1",
    generatedAt: new Date().toISOString(),
    device: { name: device.name, identifier: device.identifier, chip: device.chip, firmware: `${device.os} ${device.firmware}`, jailbreak: device.jailbreak, packageManager: device.manager, batteryHealth: device.batteryHealth, notes: device.notes },
    repositories: repositoryList.filter((repo) => device.repositories.includes(repo.id)).map((repo) => ({ name: repo.name, url: repo.url, status: repo.status, packageIndexHash: repo.packageIndexHash })),
    packages: packageList.filter((pkg) => device.installedPackages.includes(pkg.id)).map((pkg) => ({ id: pkg.id, name: pkg.name, version: pkg.version, repository: pkg.repository, dependencies: pkg.dependencies })),
    snapshot: snapshot ? { id: snapshot.id, title: snapshot.title, createdAt: snapshot.createdAt, hash: snapshot.hash } : null
  };
}

function downloadReport(report) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `legacydock-${report.device.identifier}-preservation-report.json`;
  link.click();
  URL.revokeObjectURL(url);
}

const STORE_KEY = "legacydock.demo.workspace";

function loadWorkspace(fallback) {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

function saveWorkspace(nextState) {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    selectedDeviceId: nextState.selectedDeviceId,
    snapshots: nextState.snapshots,
    telemetryEnabled: nextState.telemetryEnabled
  }));
}

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = loadWorkspace({
  selectedDeviceId: devices[0].id,
  deviceFilter: "all",
  packageFilter: "all",
  searchTerm: "",
  snapshots: seedSnapshots,
  telemetryEnabled: false
});

function selectedDevice() {
  return devices.find((device) => device.id === state.selectedDeviceId) || devices[0];
}

function selectedSnapshot() {
  return state.snapshots.find((snapshot) => snapshot.deviceId === selectedDevice().id) || state.snapshots[0];
}

function badge(text, kind = "neutral") {
  return `<span class="badge ${kind}">${text}</span>`;
}

function severityKind(value) {
  if (["pass", "low", "verified", "restorable", "safe", "Recommended"].includes(value)) return "good";
  if (["warn", "medium", "slow", "needs-review", "Review first"].includes(value)) return "warn";
  if (["block", "high", "Not recommended"].includes(value)) return "bad";
  return "neutral";
}

function matchesSearch(...values) {
  if (!state.searchTerm) return true;
  return values.join(" ").toLowerCase().includes(state.searchTerm);
}

function renderDevices() {
  const list = $("[data-device-list]");
  const filtered = devices.filter((device) => {
    const filterMatch = state.deviceFilter === "all" || device.status === state.deviceFilter;
    return filterMatch && matchesSearch(device.name, device.identifier, device.firmware, device.jailbreak, device.manager);
  });

  list.innerHTML = filtered.map((device) => {
    const scores = scoreDevice(device, packages);
    return `
      <button class="device-card ${device.id === state.selectedDeviceId ? "active" : ""}" data-device-id="${device.id}">
        <div class="card-top">
          <span class="device-dot"></span>
          <div>
            <strong>${device.name}</strong>
            <small>${device.identifier} &middot; ${device.os} ${device.firmware}</small>
          </div>
          ${badge(device.status === "stable" ? "Stable" : "Review", device.status === "stable" ? "good" : "warn")}
        </div>
        <div class="badge-row">
          ${badge(device.chip)}
          ${badge(device.jailbreak)}
          ${badge(device.manager)}
        </div>
        <div class="meter">
          <label><span>Compatibility</span><span>${scores.Compatibility}%</span></label>
          <div><i style="width:${scores.Compatibility}%"></i></div>
        </div>
      </button>
    `;
  }).join("");

  $$(".device-card", list).forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedDeviceId = card.dataset.deviceId;
      persistAndRender();
    });
  });
}

function renderCompatibilityMatrix() {
  const target = $("[data-compatibility-matrix]");
  if (!target) return;

  const selected = selectedDevice();
  const majorGroups = ["6", "7", "8", "9"].map((major) => ({
    major,
    versions: iosCompatibilityVersions.filter((version) => version.startsWith(`${major}.`))
  }));

  target.innerHTML = `
    <div class="compatibility-summary">
      <div>
        <p class="kicker">Compatibility catalog</p>
        <h3>iOS 6.x.x through iOS 9.x.x</h3>
        <p class="panel-note">${iosCompatibilityVersions.length} subversions indexed. Selected device firmware ${selected.os} ${selected.firmware} is ${platformSupportsFirmware(selected.firmware) ? "covered" : "not covered"}.</p>
      </div>
      ${badge(`${iosCompatibilityVersions[0]} to ${iosCompatibilityVersions[iosCompatibilityVersions.length - 1]}`, "good")}
    </div>
    ${majorGroups.map((group) => `
      <div>
        <strong>iOS ${group.major}.x.x</strong>
        <div class="version-grid">
          ${group.versions.map((version) => `<span class="version-chip">${version}</span>`).join("")}
        </div>
      </div>
    `).join("")}
  `;
}

function renderDeviceDetail() {
  const device = selectedDevice();
  const scores = scoreDevice(device, packages);
  const repoIssues = scanRepositories(device, repositories);
  const recommended = packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .filter((item) => item.result.supported)
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, 4);

  $("[data-device-detail]").innerHTML = `
    <div class="device-hero-card">
      <div class="ios-device">
        <div class="speaker"></div>
        <div class="screen">
          <span>${device.name}</span>
          <small>${device.os} ${device.firmware}</small>
        </div>
        <div class="home-button"></div>
      </div>
      <div>
        <p class="kicker">${device.identifier}</p>
        <h3>${device.name}</h3>
        <p>${device.jailbreak} with ${device.manager}. ${device.packageCount} packages, ${device.repositoryCount} repositories, ${device.batteryHealth}% battery health.</p>
        <div class="badge-row">
          ${device.services.map((service) => badge(service, "neutral")).join("")}
        </div>
      </div>
    </div>
    <div class="score-grid">
      ${Object.entries(scores).map(([label, score]) => `
        <div class="score-card">
          <small>${label}</small>
          <strong>${score}</strong>
          <div class="meter slim"><div><i style="width:${score}%"></i></div></div>
        </div>
      `).join("")}
    </div>
    <div class="detail-grid">
      <div class="panel">
        <div class="panel-head"><h4>Recommended installs</h4><button class="mini-button" data-jump="marketplace">Browse</button></div>
        <div class="list-stack">
          ${recommended.map(({ pkg, result }) => `
            <div class="list-row">
              <span>${pkg.name}</span>
              ${badge(`${result.score}% fit`, result.score > 90 ? "good" : "warn")}
            </div>
          `).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h4>Repository status</h4><button class="mini-button" data-jump="health">Repair</button></div>
        <div class="list-stack">
          ${repositories.filter((repo) => device.repositories.includes(repo.id)).map((repo) => `
            <div class="list-row">
              <span>${repo.name}</span>
              ${badge(repo.status, repo.status === "verified" ? "good" : "warn")}
            </div>
          `).join("")}
        </div>
        <p class="panel-note">${repoIssues.length} health recommendation${repoIssues.length === 1 ? "" : "s"} found.</p>
      </div>
    </div>
  `;

  $$("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => activateView(button.dataset.jump));
  });
}

function renderPackages() {
  const device = selectedDevice();
  const grid = $("[data-package-grid]");
  const filtered = packages.filter((pkg) => {
    const filterMatch =
      state.packageFilter === "all" ||
      pkg.category === state.packageFilter ||
      (state.packageFilter === "safe" && pkg.risk === "low");
    return filterMatch && matchesSearch(pkg.name, pkg.category, pkg.summary, pkg.repository);
  });

  grid.innerHTML = filtered.map((pkg) => {
    const result = evaluateCompatibility(device, pkg);
    return `
      <article class="package-card">
        <div class="package-media">${packageIcon(pkg)}</div>
        <div class="package-body">
          <div class="card-top">
            <div>
              <h4>${pkg.name}</h4>
              <small>${pkg.version} &middot; ${pkg.category}</small>
            </div>
            ${badge(result.recommendation, severityKind(result.recommendation))}
          </div>
          <p>${pkg.summary}</p>
          <div class="badge-row">
            ${badge(`${result.score}% compatibility`, result.score > 90 ? "good" : "warn")}
            ${badge(`${compatibleVersionsForRange(pkg.firmwareRange).length} iOS builds`, "neutral")}
            ${badge(`${pkg.communitySuccess}% success`, pkg.communitySuccess >= 95 ? "good" : "warn")}
            ${badge(`${pkg.risk} risk`, severityKind(pkg.risk))}
          </div>
        </div>
        <button class="aqua-button compact" data-review-package="${pkg.id}">Review</button>
      </article>
    `;
  }).join("");

  $$("[data-review-package]").forEach((button) => {
    button.addEventListener("click", () => openInstallDialog(button.dataset.reviewPackage));
  });
}

function openInstallDialog(packageId) {
  const device = selectedDevice();
  const pkg = packages.find((item) => item.id === packageId);
  const result = evaluateCompatibility(device, pkg);
  const dialog = $("[data-install-dialog]");

  $("[data-dialog-title]").textContent = pkg.name;
  $("[data-dialog-risks]").innerHTML = [
    badge(result.recommendation, severityKind(result.recommendation)),
    badge(`${pkg.communitySuccess}% community success`, pkg.communitySuccess >= 95 ? "good" : "warn"),
    badge(`${pkg.batteryImpact} battery`, pkg.batteryImpact === "positive" ? "good" : "neutral")
  ].join("");
  $("[data-dialog-body]").innerHTML = result.checks.map((check) => `
    <div class="dialog-card">
      <div class="card-top"><strong>${check.label}</strong>${badge(check.state, severityKind(check.state))}</div>
      <p>${check.detail}</p>
    </div>
  `).join("") + `
    <div class="dialog-card">
      <div class="card-top"><strong>Recovery</strong>${badge("snapshot first", "good")}</div>
      <p>LegacyDock will capture a local snapshot before any install or repository mutation.</p>
    </div>
  `;

  $("[data-confirm-install]").onclick = () => toast(`${pkg.name} queued with pre-install snapshot protection.`);
  dialog.showModal();
}

function renderHealth() {
  const device = selectedDevice();
  const scores = doctorScores(device);
  const issues = doctorDiagnostics(device);
  const plan = careRepairPlan(device);
  const primaryPackage = packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .sort((a, b) => b.result.score - a.result.score)[0].pkg;
  const signals = communitySignals(primaryPackage);
  const risk = bootloopRisk(primaryPackage);
  const snapshot = snapshotIntelligence(device);

  $("[data-health-score]").innerHTML = `<strong>${scores[0].value}</strong><span>overall health</span>`;
  $("[data-doctor-score-list]").innerHTML = scores.map((score) => `
    <button class="doctor-score-card" data-score-explanation="${score.explanation}">
      <span>${score.label}</span>
      <strong>${score.value}</strong>
      <small>${score.explanation}</small>
    </button>
  `).join("");

  $("[data-issue-list]").innerHTML = issues.slice(0, 8).map((issue) => `
    <article class="issue-card">
      <div class="card-top">
        <h4>${issue.title}</h4>
        ${badge(issue.severity, severityKind(issue.severity))}
      </div>
      <p>${issue.detail}</p>
      <p class="panel-note">${issue.why}</p>
      <button class="mini-button" data-stage-repair>${issue.recommendation}</button>
    </article>
  `).join("");

  $("[data-repair-plan]").innerHTML = `
    <h3>Intelligent Repair Plan</h3>
    <p class="panel-note">LegacyDock Care converts diagnostics into an explainable, rollback-aware repair sequence.</p>
    <div class="care-meta">
      ${badge(`${plan.estimatedSeconds}s estimate`, "good")}
      ${badge(plan.rollbackAvailable ? "Rollback available" : "Snapshot needed", plan.rollbackAvailable ? "good" : "warn")}
    </div>
    <ol class="care-steps">
      ${plan.steps.map((step) => `
        <li>
          <strong>${step.title}</strong>
          <span>${step.why}</span>
          <small>${step.changes} &middot; ${step.risk} risk</small>
        </li>
      `).join("") || "<li><strong>No repairs needed</strong><span>Device Doctor did not find actionable issues.</span><small>Keep a fresh snapshot anyway.</small></li>"}
    </ol>
    <button class="primary-button compact" data-stage-care-repair>Run Repair</button>
  `;

  $("[data-community-intel]").innerHTML = `
    <h3>Community Intelligence</h3>
    <p class="panel-note">${primaryPackage.name} on ${device.name}</p>
    <div class="intel-grid">
      <span>Community installs<strong>${signals.installs.toLocaleString()}</strong></span>
      <span>Success rate<strong>${signals.success}</strong></span>
      <span>Battery impact<strong>${signals.battery}</strong></span>
      <span>Performance<strong>${signals.performance}</strong></span>
      <span>Known conflicts<strong>${signals.conflicts}</strong></span>
      <span>Recommended<strong>${signals.recommended ? "Yes" : "Review"}</strong></span>
    </div>
  `;

  $("[data-bootloop-risk]").innerHTML = `
    <h3>Bootloop Risk</h3>
    <div class="risk-readout">
      <strong>${risk.risk}</strong>
      <span>${risk.confidence}% community confidence</span>
      <small>${risk.reports} confirmed reports &middot; ${risk.incompatibilities.length || 0} known incompatibilities</small>
    </div>
  `;

  $("[data-smart-alternatives]").innerHTML = `
    <h3>Smart Alternatives</h3>
    <div class="list-stack">
      ${smartAlternatives(primaryPackage).map((item) => `
        <div class="list-row"><span>${item.name}<small>${item.reason}</small></span>${badge("Care", "good")}</div>
      `).join("")}
    </div>
  `;

  $("[data-modernization]").innerHTML = `
    <h3>Device Modernization Assistant</h3>
    <div class="list-stack">
      ${modernizationRecommendations(device).map((item) => `
        <div class="list-row"><span>${item.title}<small>${item.detail}</small></span>${badge(`${item.confidence}%`, "good")}</div>
      `).join("")}
    </div>
  `;

  $("[data-snapshot-intel]").innerHTML = `
    <h3>Snapshot Intelligence</h3>
    <div class="list-stack">
      <div class="list-row"><span>Rollback</span>${badge(snapshot.rollbackAvailable ? "available" : "missing", snapshot.rollbackAvailable ? "good" : "warn")}</div>
      <div class="list-row"><span>Latest snapshot</span><strong>${snapshot.latest}</strong></div>
      <div class="list-row"><span>Recovery estimate</span><strong>${snapshot.recovery}</strong></div>
    </div>
    <p class="panel-note">${snapshot.recommendation}</p>
  `;

  $("[data-health-timeline]").innerHTML = `
    <h3>Health Timeline</h3>
    <div class="timeline-list">
      ${healthTimeline(device).map((item) => `
        <article>
          <small>${item.type} &middot; ${new Date(item.date).toLocaleString()}</small>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </article>
      `).join("")}
    </div>
  `;

  $$("[data-stage-repair]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Staged";
      button.disabled = true;
      toast("Repair action staged locally. No device changes were made.");
    });
  });

  $$("[data-score-explanation]").forEach((button) => {
    button.addEventListener("click", () => toast(button.dataset.scoreExplanation));
  });

  $("[data-stage-care-repair]").addEventListener("click", () => {
    toast("Care repair plan staged with snapshot rollback. No device changes were made.");
  });
}

function renderRestoration() {
  const device = selectedDevice();
  const workflows = adviseRestoration(device);
  $("[data-restoration-list]").innerHTML = workflows.map((workflow) => `
    <article class="workflow-card ${workflow.match ? "active" : ""}">
      <div class="card-top">
        <div>
          <h4>${workflow.name}</h4>
          <small>${workflow.source}</small>
        </div>
        ${badge(workflow.recommendation, workflow.match ? "good" : "neutral")}
      </div>
      <p>${workflow.summary}</p>
      <div class="badge-row">
        ${badge(`${workflow.risk} risk`, severityKind(workflow.risk))}
        ${workflow.firmwareRange ? badge(`${workflow.firmwareRange.join(" to ")}`) : ""}
        ${workflow.chips ? workflow.chips.map((chip) => badge(chip)).join("") : ""}
        ${workflow.families ? workflow.families.map((family) => badge(family)).join("") : ""}
      </div>
      <ol class="workflow-steps">
        ${workflow.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <a class="mini-button source-link" href="${workflow.sourceUrl}" target="_blank" rel="noreferrer">Open upstream</a>
    </article>
  `).join("");

  $("[data-restoration-source]").innerHTML = `
    <h4>Source trail</h4>
    <p class="panel-note">${device.name} is treated as a ${deviceArchitecture(device)} ${device.chip} device for local guidance.</p>
    <div class="list-stack">
      <div class="list-row"><span>External toolkit</span>${badge("Legacy iOS Kit", "good")}</div>
      <div class="list-row"><span>Local role</span>${badge("Plan, warn, document")}</div>
      <div class="list-row"><span>Execution role</span>${badge("External handoff", "warn")}</div>
      <div class="list-row"><span>Bundled exploit code</span>${badge("none", "good")}</div>
    </div>
    <p class="panel-note">LegacyDock should capture snapshots, explain risk, collect metadata, and preserve notes before sending users to external restore or jailbreak workflows.</p>
  `;
}

function renderSnapshots() {
  const device = selectedDevice();
  const deviceSnapshots = state.snapshots.filter((snapshot) => snapshot.deviceId === device.id);
  const fallback = state.snapshots.slice(0, 2);
  const visible = deviceSnapshots.length ? deviceSnapshots : fallback;
  const diff = visible.length > 1 ? diffSnapshots(visible[1], visible[0]) : { added: [], removed: [], unchanged: visible[0]?.packageIds || [] };

  $("[data-snapshot-timeline]").innerHTML = visible.map((snapshot) => `
    <article class="snapshot-card">
      <div class="card-top">
        <div>
          <h4>${snapshot.title}</h4>
          <small>${new Date(snapshot.createdAt).toLocaleString()}</small>
        </div>
        ${badge(snapshot.state, severityKind(snapshot.state))}
      </div>
      <p>${snapshot.packageIds.length} packages, ${snapshot.repositoryIds.length} repositories, preferences, and metadata captured.</p>
      <code>${snapshot.hash}</code>
    </article>
  `).join("");

  $("[data-snapshot-diff]").innerHTML = `
    <div class="panel">
      <h4>Latest diff</h4>
      <div class="diff-grid">
        <span>Added</span><strong>${diff.added.length}</strong>
        <span>Removed</span><strong>${diff.removed.length}</strong>
        <span>Unchanged</span><strong>${diff.unchanged.length}</strong>
      </div>
      <p class="panel-note">Restore previews compare manifests before touching the device.</p>
    </div>
  `;
}

function renderPreservation() {
  const device = selectedDevice();
  const report = buildPreservationReport(device, repositories, packages, selectedSnapshot());
  $("[data-preservation-profile]").innerHTML = `
    <h4>Selected profile</h4>
    <dl class="profile-list">
      ${Object.entries(report.device).map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join("")}
    </dl>
  `;
  $("[data-preservation-checks]").innerHTML = `
    <h4>Reproducibility checks</h4>
    <div class="list-stack">
      ${["Package versions", "Repository hashes", "Device metadata", "Snapshot recovery plan"].map((item) => `
        <div class="list-row"><span>${item}</span>${badge("captured", "good")}</div>
      `).join("")}
    </div>
  `;
  $("[data-manifest-preview]").textContent = JSON.stringify(report, null, 2);
}

function renderPlans() {
  $("[data-plan-grid]").innerHTML = cloudPlans.map((plan, index) => `
    <article class="plan-card ${index === 0 ? "active" : ""}">
      <small>${plan.name}</small>
      <strong>${plan.price}</strong>
      <p>${plan.summary}</p>
    </article>
  `).join("");
}

function captureSnapshot() {
  const snapshot = createSnapshot(selectedDevice(), repositories, packages);
  state.snapshots = [snapshot, ...state.snapshots];
  persistAndRender();
  activateView("snapshots");
  toast("Snapshot captured locally.");
}

function exportReport() {
  const report = buildPreservationReport(selectedDevice(), repositories, packages, selectedSnapshot());
  downloadReport(report);
  toast("Preservation report exported.");
}

function activateView(name) {
  $$(".console-tab").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  $$(".console-view").forEach((view) => view.classList.toggle("active", view.id === `${name}-view`));
}

function viewFromHash() {
  const value = window.location.hash.replace("#", "").replace("-view", "");
  return ["dashboard", "marketplace", "health", "restoration", "snapshots", "preservation", "cloud"].includes(value) ? value : null;
}

function toast(message) {
  const node = $("[data-toast]");
  node.textContent = message;
  node.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("show"), 2600);
}

function persistAndRender() {
  saveWorkspace(state);
  renderAll();
}

function renderAll() {
  renderCompatibilityMatrix();
  renderDevices();
  renderDeviceDetail();
  renderPackages();
  renderHealth();
  renderRestoration();
  renderSnapshots();
  renderPreservation();
  renderPlans();
}

$$(".console-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activateView(button.dataset.view);
    history.replaceState(null, "", `#${button.dataset.view}`);
  });
});

$$("[data-device-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.deviceFilter = button.dataset.deviceFilter;
    $$("[data-device-filter]").forEach((item) => item.classList.toggle("active", item === button));
    persistAndRender();
  });
});

$$("[data-package-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.packageFilter = button.dataset.packageFilter;
    $$("[data-package-filter]").forEach((item) => item.classList.toggle("active", item === button));
    persistAndRender();
  });
});

$("#searchInput").addEventListener("input", (event) => {
  state.searchTerm = event.target.value.trim().toLowerCase();
  renderDevices();
  renderPackages();
});

$("[data-capture-snapshot]").addEventListener("click", captureSnapshot);
$("[data-run-health]").addEventListener("click", () => toast("Health scan refreshed local compatibility and repository checks."));
$("[data-export-report]").addEventListener("click", exportReport);
$("[data-telemetry-toggle]").addEventListener("change", (event) => {
  state.telemetryEnabled = event.target.checked;
  persistAndRender();
  toast(event.target.checked ? "Anonymous community intelligence enabled." : "Community intelligence disabled.");
});
renderAll();
const initialView = viewFromHash();
if (initialView) activateView(initialView);
