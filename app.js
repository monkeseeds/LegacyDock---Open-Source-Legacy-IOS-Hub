const devices = [
  {
    id: "iphone4",
    name: "iPhone 4",
    identifier: "iPhone3,1",
    chip: "A4",
    firmware: "iOS 7.1.2",
    jailbreak: "p0sixspwn",
    manager: "Cydia",
    packages: 43,
    repositories: 7,
    storage: 68,
    memory: 54,
    battery: "82%",
    status: "stable",
    scores: { Compatibility: 94, Stability: 88, Community: 91, Performance: 72 },
    recommendations: ["iCleaner Pro", "NoSlowAnimations", "OpenSSH"],
    repos: [
      ["BigBoss", "Verified"],
      ["ModMyi Archive", "Slow"],
      ["Cydia/Telesphoreo", "Verified"]
    ]
  },
  {
    id: "ipad2",
    name: "iPad 2",
    identifier: "iPad2,1",
    chip: "A5",
    firmware: "iOS 9.3.5",
    jailbreak: "Phoenix",
    manager: "Cydia",
    packages: 31,
    repositories: 5,
    storage: 82,
    memory: 71,
    battery: "74%",
    status: "attention",
    scores: { Compatibility: 81, Stability: 69, Community: 77, Performance: 58 },
    recommendations: ["Speed Intensifier", "Filza File Manager", "BatteryLife"],
    repos: [
      ["BigBoss", "Verified"],
      ["Legacy Archive", "Duplicate"],
      ["Cydia/Telesphoreo", "Verified"]
    ]
  },
  {
    id: "iphone5",
    name: "iPhone 5",
    identifier: "iPhone5,2",
    chip: "A6",
    firmware: "iOS 8.4.1",
    jailbreak: "EtasonJB",
    manager: "Cydia",
    packages: 57,
    repositories: 9,
    storage: 49,
    memory: 46,
    battery: "91%",
    status: "stable",
    scores: { Compatibility: 90, Stability: 83, Community: 86, Performance: 80 },
    recommendations: ["WinterBoard", "Activator", "PreferenceLoader"],
    repos: [
      ["BigBoss", "Verified"],
      ["Chariz Legacy", "Verified"],
      ["ModMyi Archive", "Slow"]
    ]
  }
];

const packages = [
  {
    name: "WinterBoard",
    category: "theme",
    version: "0.9.3919",
    rating: "4.8",
    risk: "Low",
    success: "99%",
    impact: "Minimal",
    compatibility: ["iOS 6", "iOS 7", "iOS 8"],
    summary: "Classic theming engine with strong legacy device support.",
    notes: "Known conflict with IconOmatic on iOS 7.",
    dependencies: ["mobilesubstrate", "preferenceloader"]
  },
  {
    name: "iCleaner Pro",
    category: "repair",
    version: "7.7.5",
    rating: "4.9",
    risk: "Low",
    success: "98%",
    impact: "Improves storage",
    compatibility: ["iOS 6", "iOS 7", "iOS 8", "iOS 9"],
    summary: "Removes cache waste and stale package data.",
    notes: "Create a snapshot before deep cleaning preferences.",
    dependencies: ["apt7-lib"]
  },
  {
    name: "Activator",
    category: "safe",
    version: "1.9.13",
    rating: "4.7",
    risk: "Medium",
    success: "94%",
    impact: "Small memory use",
    compatibility: ["iOS 6", "iOS 7", "iOS 8"],
    summary: "Gesture and shortcut automation for legacy iOS.",
    notes: "Some iOS 9 builds report springboard restarts.",
    dependencies: ["mobilesubstrate", "flipswitch"]
  },
  {
    name: "NoSlowAnimations",
    category: "safe",
    version: "4.2.1",
    rating: "4.6",
    risk: "Low",
    success: "97%",
    impact: "Improves perceived speed",
    compatibility: ["iOS 7", "iOS 8", "iOS 9"],
    summary: "Reduces animation delays across older devices.",
    notes: "Best paired with conservative animation values.",
    dependencies: ["mobilesubstrate"]
  },
  {
    name: "OpenSSH",
    category: "repair",
    version: "6.7p1",
    rating: "4.5",
    risk: "Medium",
    success: "96%",
    impact: "Background service",
    compatibility: ["iOS 6", "iOS 7", "iOS 8", "iOS 9"],
    summary: "Secure shell access for repairs, backups, and diagnostics.",
    notes: "Change the default password immediately after install.",
    dependencies: ["openssl", "berkeleydb"]
  },
  {
    name: "Speed Intensifier",
    category: "safe",
    version: "9.1",
    rating: "4.2",
    risk: "Medium",
    success: "89%",
    impact: "May increase battery use",
    compatibility: ["iOS 7", "iOS 8", "iOS 9"],
    summary: "Accelerates UI timing for slower devices.",
    notes: "Community reports are mixed on A5 devices.",
    dependencies: ["mobilesubstrate"]
  }
];

const issues = [
  { title: "Duplicate Legacy Archive repository", severity: "Medium", detail: "Two source URLs resolve to the same package index.", action: "Merge duplicate" },
  { title: "Stale package lists", severity: "Low", detail: "ModMyi Archive has not refreshed in 42 days.", action: "Refresh source" },
  { title: "PreferenceLoader mismatch", severity: "Medium", detail: "Installed version is older than three dependent tweaks expect.", action: "Queue update" },
  { title: "Storage waste detected", severity: "Low", detail: "1.2 GB of cache files can be reviewed safely.", action: "Review cleanup" }
];

let selectedDevice = devices[0];
let packageFilter = "all";
let deviceFilter = "all";
let searchTerm = "";
let snapshots = [
  { title: "Clean jailbreak baseline", date: "2026-06-14 21:12", device: "iPhone 4", packages: 38, state: "Verified" },
  { title: "Theme pack experiment", date: "2026-06-13 18:40", device: "iPhone 5", packages: 57, state: "Restorable" },
  { title: "Repair shop intake", date: "2026-06-11 10:25", device: "iPad 2", packages: 29, state: "Needs review" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function badge(text, type = "") {
  return `<span class="badge ${type}">${text}</span>`;
}

function severityClass(value) {
  if (value === "Low" || value === "Verified" || value === "Restorable") return "ok";
  if (value === "Medium" || value === "Slow" || value === "Duplicate" || value === "Needs review") return "warn";
  return "danger";
}

function renderDevices() {
  const filtered = devices.filter((device) => {
    const matchesFilter = deviceFilter === "all" || device.status === deviceFilter;
    const haystack = `${device.name} ${device.identifier} ${device.firmware} ${device.jailbreak}`.toLowerCase();
    return matchesFilter && haystack.includes(searchTerm);
  });

  $("#connectedCount").textContent = `${devices.length} devices`;
  $("#deviceList").innerHTML = filtered.map((device) => `
    <button class="device-card ${device.id === selectedDevice.id ? "active" : ""}" data-device="${device.id}">
      <div class="card-row">
        <div>
          <strong>${device.name}</strong>
          <div class="muted">${device.identifier} · ${device.firmware}</div>
        </div>
        ${badge(device.status === "stable" ? "Stable" : "Review", device.status === "stable" ? "ok" : "warn")}
      </div>
      <div class="badges">
        ${badge(device.chip)}
        ${badge(device.jailbreak)}
        ${badge(device.manager)}
      </div>
      <div class="meter">
        <label><span>Storage</span><span>${device.storage}%</span></label>
        <div class="meter-track"><div class="meter-fill" style="width: ${device.storage}%"></div></div>
      </div>
    </button>
  `).join("");

  $$(".device-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedDevice = devices.find((device) => device.id === card.dataset.device);
      renderAll();
    });
  });
}

function renderDeviceDetail() {
  $("#phoneModel").textContent = selectedDevice.name;
  $("#phoneFirmware").textContent = selectedDevice.firmware;
  $("#detailIdentifier").textContent = selectedDevice.identifier;
  $("#detailName").textContent = selectedDevice.name;
  $("#detailSummary").textContent = `${selectedDevice.jailbreak} with ${selectedDevice.manager}, ${selectedDevice.repositories} repositories, ${selectedDevice.packages} installed packages.`;

  $("#scoreGrid").innerHTML = Object.entries(selectedDevice.scores).map(([label, value]) => `
    <div class="score">
      <small>${label}</small>
      <strong>${value}</strong>
      <div class="meter-track"><div class="meter-fill" style="width: ${value}%"></div></div>
    </div>
  `).join("");

  $("#recommendations").innerHTML = selectedDevice.recommendations.map((name) => {
    const item = packages.find((pkg) => pkg.name === name) || packages[0];
    return `
      <div class="recommendation">
        <span>${name}</span>
        ${badge(`${item.success} success`, severityClass(item.risk))}
      </div>
    `;
  }).join("");

  $("#repoList").innerHTML = selectedDevice.repos.map(([name, state]) => `
    <div class="repo">
      <span>${name}</span>
      ${badge(state, severityClass(state))}
    </div>
  `).join("");
}

function renderPackages() {
  const filtered = packages.filter((pkg) => {
    const matchesFilter = packageFilter === "all" || pkg.category === packageFilter || (packageFilter === "safe" && pkg.risk === "Low");
    const haystack = `${pkg.name} ${pkg.summary} ${pkg.category} ${pkg.compatibility.join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(searchTerm);
  });

  $("#packageGrid").innerHTML = filtered.map((pkg) => `
    <article class="package-card">
      <div class="package-head">
        <div class="package-icon">${pkg.name.slice(0, 2).toUpperCase()}</div>
        ${badge(pkg.risk, severityClass(pkg.risk))}
      </div>
      <div>
        <h3>${pkg.name}</h3>
        <p>${pkg.summary}</p>
      </div>
      <div class="badges">
        ${pkg.compatibility.map((item) => badge(item)).join("")}
      </div>
      <div class="package-actions">
        <span class="muted">${pkg.rating} rating · ${pkg.success} success</span>
        <button class="primary-button install-button" data-package="${pkg.name}">Review</button>
      </div>
    </article>
  `).join("");

  $$(".install-button").forEach((button) => {
    button.addEventListener("click", () => openInstallDialog(button.dataset.package));
  });
}

function openInstallDialog(packageName) {
  const pkg = packages.find((item) => item.name === packageName);
  $("#modalTitle").textContent = pkg.name;
  $("#riskStrip").innerHTML = [
    badge(`${pkg.risk} risk`, severityClass(pkg.risk)),
    badge(`${pkg.success} community success`, "ok"),
    badge(pkg.impact, pkg.impact.includes("battery") ? "warn" : "ok")
  ].join("");
  $("#modalDetails").innerHTML = [
    ["Compatibility", `${pkg.compatibility.join(", ")} on ${selectedDevice.name}: ${pkg.compatibility.some((item) => selectedDevice.firmware.startsWith(item)) ? "supported" : "review required"}`],
    ["Dependencies", pkg.dependencies.join(", ")],
    ["Known issues", pkg.notes],
    ["Recovery", "A snapshot will be created before installation."]
  ].map(([title, value]) => `
    <div class="modal-detail">
      <strong>${title}</strong>
      <p class="muted">${value}</p>
    </div>
  `).join("");

  $("#confirmInstall").onclick = () => {
    toast(`${pkg.name} queued with pre-install snapshot protection.`);
  };
  $("#installDialog").showModal();
}

function renderHealth() {
  $("#issueList").innerHTML = issues.map((issue, index) => `
    <article class="issue-card" data-issue="${index}">
      <div class="issue-head">
        <h3>${issue.title}</h3>
        ${badge(issue.severity, severityClass(issue.severity))}
      </div>
      <p>${issue.detail}</p>
      <button class="text-button repair-button" data-issue="${index}">${issue.action}</button>
    </article>
  `).join("");

  $$(".repair-button").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".issue-card");
      card.remove();
      const score = Math.min(99, Number($("#healthScore").textContent) + 3);
      $("#healthScore").textContent = score;
      toast("Repair action staged locally.");
    });
  });
}

function renderSnapshots() {
  $("#snapshotTimeline").innerHTML = snapshots.map((snapshot) => `
    <article class="timeline-item">
      <div class="timeline-head">
        <div>
          <h3>${snapshot.title}</h3>
          <div class="muted">${snapshot.date} · ${snapshot.device}</div>
        </div>
        ${badge(snapshot.state, severityClass(snapshot.state))}
      </div>
      <p class="muted">${snapshot.packages} packages, repositories, preferences, and metadata captured.</p>
    </article>
  `).join("");
}

function renderArchive() {
  const profile = {
    Model: selectedDevice.name,
    Identifier: selectedDevice.identifier,
    Chip: selectedDevice.chip,
    Firmware: selectedDevice.firmware,
    Jailbreak: selectedDevice.jailbreak,
    "Package manager": selectedDevice.manager,
    Battery: selectedDevice.battery,
    "Installed packages": selectedDevice.packages
  };

  $("#archiveProfile").innerHTML = Object.entries(profile).map(([key, value]) => `
    <dt>${key}</dt><dd>${value}</dd>
  `).join("");

  $("#archiveChecks").innerHTML = [
    ["Package versions", "Captured"],
    ["Repository metadata", "Captured"],
    ["Preference hashes", "Pending"],
    ["Recovery snapshot", "Ready"]
  ].map(([label, state]) => `
    <div class="check">
      <span>${label}</span>
      ${badge(state, state === "Pending" ? "warn" : "ok")}
    </div>
  `).join("");

  const manifest = {
    device: selectedDevice.identifier,
    firmware: selectedDevice.firmware,
    repositories: selectedDevice.repos.map(([name, state]) => ({ name, state })),
    packages: packages.slice(0, 4).map((pkg) => ({
      name: pkg.name,
      version: pkg.version,
      dependencies: pkg.dependencies
    }))
  };
  $("#manifestPreview").textContent = JSON.stringify(manifest, null, 2);
}

function createSnapshot() {
  const now = new Date();
  snapshots = [{
    title: `${selectedDevice.name} working set`,
    date: now.toISOString().slice(0, 16).replace("T", " "),
    device: selectedDevice.name,
    packages: selectedDevice.packages,
    state: "Verified"
  }, ...snapshots];
  renderSnapshots();
  toast("Snapshot captured locally.");
}

function exportReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    product: "LegacyDock",
    mode: "Preservation",
    selectedDevice,
    manifest: JSON.parse($("#manifestPreview").textContent)
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `legacydock-${selectedDevice.identifier}-preservation-report.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("Preservation report exported.");
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("show"), 2400);
}

function renderAll() {
  renderDevices();
  renderDeviceDetail();
  renderPackages();
  renderHealth();
  renderSnapshots();
  renderArchive();
}

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
    $$(".view").forEach((view) => view.classList.toggle("active", view.id === button.dataset.view));
  });
});

$$("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    $(`.nav-item[data-view="${button.dataset.viewJump}"]`).click();
  });
});

$$("[data-device-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    deviceFilter = button.dataset.deviceFilter;
    $$("[data-device-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderDevices();
  });
});

$$("[data-package-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    packageFilter = button.dataset.packageFilter;
    $$("[data-package-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderPackages();
  });
});

$("#globalSearch").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderDevices();
  renderPackages();
});

$("#scanButton").addEventListener("click", () => toast("Device scan complete. No risky changes made."));
$("#snapshotNow").addEventListener("click", createSnapshot);
$("#captureSnapshot").addEventListener("click", createSnapshot);
$("#runHealthScan").addEventListener("click", () => toast("Health scan refreshed compatibility and repository checks."));
$("#repairRepos").addEventListener("click", () => toast("Repository repair plan prepared."));
$("#exportReport").addEventListener("click", exportReport);
$("#telemetryToggle").addEventListener("change", (event) => {
  toast(event.target.checked ? "Anonymous community intelligence enabled." : "Community intelligence disabled.");
});
$("#themeButton").addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
});

renderAll();
