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

const packages = [
  { id: "winterboard", name: "WinterBoard", category: "theme", version: "0.9.3919", repository: "bigboss", firmwareRange: ["6.0", "8.4.1"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate", "preferenceloader"], conflicts: ["iconomatic"], rating: 4.8, communitySuccess: 99, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Classic theming engine with strong legacy device support.", notes: "Known conflict with IconOmatic on some iOS 7 setups." },
  { id: "icleaner-pro", name: "iCleaner Pro", category: "repair", version: "7.7.5", repository: "bigboss", firmwareRange: ["6.0", "9.3.5"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["apt7-lib"], conflicts: [], rating: 4.9, communitySuccess: 98, risk: "low", batteryImpact: "positive", performanceImpact: "positive", summary: "Removes cache waste and stale package data.", notes: "Create a snapshot before deep preference cleanup." },
  { id: "activator", name: "Activator", category: "safe", version: "1.9.13", repository: "bigboss", firmwareRange: ["6.0", "8.4.1"], devices: ["iPhone3,1", "iPhone5,2"], dependencies: ["mobilesubstrate", "flipswitch"], conflicts: ["springtomize-old"], rating: 4.7, communitySuccess: 94, risk: "medium", batteryImpact: "small", performanceImpact: "small", summary: "Gesture and shortcut automation for legacy iOS.", notes: "Some iOS 9 builds report springboard restarts." },
  { id: "noslowanimations", name: "NoSlowAnimations", category: "safe", version: "4.2.1", repository: "chariz-legacy", firmwareRange: ["7.0", "9.3.5"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.6, communitySuccess: 97, risk: "low", batteryImpact: "neutral", performanceImpact: "positive", summary: "Reduces animation delays across older devices.", notes: "Best paired with conservative animation values." },
  { id: "openssh", name: "OpenSSH", category: "repair", version: "6.7p1", repository: "cydia-telesphoreo", firmwareRange: ["6.0", "9.3.5"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["openssl", "berkeleydb"], conflicts: [], rating: 4.5, communitySuccess: 96, risk: "medium", batteryImpact: "background service", performanceImpact: "light", summary: "Secure shell access for repairs, backups, and diagnostics.", notes: "Change the default password immediately after install." },
  { id: "batterylife", name: "BatteryLife", category: "diagnostic", version: "1.6.10", repository: "bigboss", firmwareRange: ["7.0", "9.3.5"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["preferenceloader"], conflicts: [], rating: 4.4, communitySuccess: 93, risk: "low", batteryImpact: "neutral", performanceImpact: "light", summary: "Displays battery diagnostics and cycle health.", notes: "Useful for repair shop intake and collector records." },
  { id: "filza", name: "Filza File Manager", category: "repair", version: "3.5.2", repository: "bigboss", firmwareRange: ["7.0", "9.3.5"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["zip", "unzip", "coreutils"], conflicts: [], rating: 4.6, communitySuccess: 92, risk: "medium", batteryImpact: "neutral", performanceImpact: "light", summary: "On-device file manager for advanced repairs.", notes: "Powerful tool. LegacyDock should warn before destructive file edits." }
];

const seedSnapshots = [
  { id: "snap-clean-iphone4", title: "Clean jailbreak baseline", createdAt: "2026-06-14T21:12:00+08:00", deviceId: "iphone4-black-32", packageIds: ["icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"], repositoryIds: ["bigboss", "cydia-telesphoreo"], state: "verified", hash: "sha256:legacydock-clean-baseline" },
  { id: "snap-theme-iphone5", title: "Theme pack experiment", createdAt: "2026-06-13T18:40:00+08:00", deviceId: "iphone5-white-64", packageIds: ["winterboard", "activator", "icleaner-pro", "noslowanimations"], repositoryIds: ["bigboss", "chariz-legacy", "modmyi-archive"], state: "restorable", hash: "sha256:legacydock-theme-pack" },
  { id: "snap-shop-ipad2", title: "Repair shop intake", createdAt: "2026-06-11T10:25:00+08:00", deviceId: "ipad2-wifi-16", packageIds: ["icleaner-pro", "batterylife", "filza"], repositoryIds: ["bigboss", "legacy-archive", "legacy-archive-mirror"], state: "needs-review", hash: "sha256:legacydock-shop-intake" }
];

const cloudPlans = [
  { name: "Free", price: "$0", summary: "Unlimited local devices, local snapshots, repository checks, health scans, and preservation exports." },
  { name: "Cloud", price: "$3/mo", summary: "Encrypted backup sync, cross-device history, favorites, and collections." },
  { name: "Plus", price: "$7/mo", summary: "Smart recommendations, advanced analytics, shared collections, and premium community features." },
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

function evaluateCompatibility(device, pkg) {
  const firmwareOk = inFirmwareRange(device.firmware, pkg.firmwareRange);
  const deviceOk = pkg.devices.includes(device.identifier);
  const missingDependencies = pkg.dependencies.filter((dependency) => !device.installedPackages.includes(dependency));
  const installedConflicts = pkg.conflicts.filter((conflict) => device.installedPackages.includes(conflict));
  const checks = [
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
            <small>${device.identifier} · ${device.os} ${device.firmware}</small>
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
        <div class="package-media"><span>${pkg.name.slice(0, 2).toUpperCase()}</span></div>
        <div class="package-body">
          <div class="card-top">
            <div>
              <h4>${pkg.name}</h4>
              <small>${pkg.version} · ${pkg.category}</small>
            </div>
            ${badge(result.recommendation, severityKind(result.recommendation))}
          </div>
          <p>${pkg.summary}</p>
          <div class="badge-row">
            ${badge(`${result.score}% compatibility`, result.score > 90 ? "good" : "warn")}
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
  const repoIssues = scanRepositories(device, repositories);
  const packageWarnings = packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .filter((item) => item.result.checks.some((check) => check.state === "warn"));

  const issues = [
    ...repoIssues,
    ...packageWarnings.slice(0, 3).map(({ pkg, result }) => ({
      severity: result.score > 85 ? "low" : "medium",
      title: `${pkg.name} needs review`,
      detail: result.checks.filter((check) => check.state === "warn").map((check) => check.detail).join(" "),
      action: "Open review"
    }))
  ];

  const healthScore = Math.max(42, 100 - issues.length * 6 - Math.round(device.memoryPressure * 0.08));
  $("[data-health-score]").innerHTML = `<strong>${healthScore}</strong><span>overall health</span>`;
  $("[data-issue-list]").innerHTML = issues.map((issue) => `
    <article class="issue-card">
      <div class="card-top">
        <h4>${issue.title}</h4>
        ${badge(issue.severity, severityKind(issue.severity))}
      </div>
      <p>${issue.detail}</p>
      <button class="mini-button" data-stage-repair>${issue.action}</button>
    </article>
  `).join("");

  $$("[data-stage-repair]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Staged";
      button.disabled = true;
      toast("Repair action staged locally. No device changes were made.");
    });
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
  button.addEventListener("click", () => activateView(button.dataset.view));
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
$("[data-theme-toggle]").addEventListener("click", () => document.documentElement.classList.toggle("light"));

renderAll();
