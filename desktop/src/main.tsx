import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { invoke } from "@tauri-apps/api/core";
import { check } from "@tauri-apps/plugin-updater";
import {
  Activity,
  Archive,
  CheckCircle2,
  Clipboard,
  Database,
  FileDown,
  Github,
  HeartPulse,
  PackageCheck,
  PackageSearch,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Trash2,
  Wrench
} from "lucide-react";
import "./styles.css";

type Device = {
  id: string;
  name: string;
  identifier: string;
  firmware: string;
  battery_health?: number;
  status: string;
};

type DoctorScore = {
  label: string;
  value: number;
  explanation: string;
};

type RepositoryHealth = {
  url: string;
  status: string;
  package_index_available: boolean;
  detail: string;
};

type SetupItem = {
  id: string;
  title: string;
  reason: string;
  compatibility: string;
  risk: "Low" | "Medium" | "High";
  instructions: string;
};

type ConsentState = {
  localOnlyMode: boolean;
  telemetryOptIn: boolean;
  crashReportsOptIn: boolean;
  acceptedPrivacy: boolean;
  acceptedTerms: boolean;
  updatedAt: string | null;
};

type UpdateSummary = {
  currentVersion: string;
  nextVersion: string;
  notes?: string | null;
  date?: string | null;
};

type AppMode = "wizard" | "console";
type ConsoleTab = "devices" | "repositories" | "packages" | "doctor" | "snapshots" | "reports";

const wizardSteps = [
  "Welcome",
  "Detect",
  "Compatibility",
  "Repositories",
  "Checklist",
  "Doctor",
  "Services",
  "Summary"
];

const curatedRepos = [
  { name: "BigBoss", url: "http://apt.thebigboss.org/repofiles/cydia/", reason: "Core utilities, Activator, iCleaner, iFile, and classic packages.", category: "Essential", status: "Verified", packageCount: 18421, rating: 4.9, maintainer: "BigBoss team", notes: "HTTP is normal for older Cydia setups." },
  { name: "SkyGlow", url: "http://cydia.skyglow.es/", reason: "Service restoration packages such as MapsX and TubeRepair.", category: "Service Restoration", status: "Verified", packageCount: 42, rating: 4.7, maintainer: "SkyGlow community", notes: "Recommended for iOS 6 restoration experiments." },
  { name: "Yzu", url: "http://yzu.moe/dev/", reason: "Legacy application preservation tools including Veteris.", category: "Applications", status: "Degraded", packageCount: 18, rating: 4.5, maintainer: "Yzu", notes: "Useful for app restoration, but responses may redirect." },
  { name: "Galactic Server", url: "http://repo.galactic-server.info/", reason: "Classic utility packages such as SBSettings.", category: "Utilities", status: "Verified", packageCount: 73, rating: 4.4, maintainer: "Galactic Server", notes: "Good utility source for iOS 5 and iOS 6 devices." }
];

const recommendedPackages = ["Activator", "iCleaner", "iFile", "SBSettings", "Veteris", "MapsX", "TubeRepair"];
const unsupportedPackages = ["Heavy WinterBoard theme stacks", "Newer rootless tweaks", "iOS 10+ only packages"];
const knownRisks = ["HTTP-only repositories are normal on older Cydia but should be reviewed.", "Snapshot before changing sources.", "Avoid stacking lock screen and SpringBoard tweaks."];

const consolePackages = [
  { name: "Activator", category: "Utilities", version: "1.9.13", repository: "BigBoss", ios: "iOS 3-9", status: "Verified Working", risk: "Medium", rating: 4.7, dependencies: "MobileSubstrate, Flipswitch", summary: "Gesture and shortcut automation for legacy iOS." },
  { name: "iCleaner", category: "Utilities", version: "7.7.5", repository: "BigBoss", ios: "iOS 5-9", status: "Verified Working", risk: "Low", rating: 4.9, dependencies: "APT libraries", summary: "Cache cleanup and package maintenance for low-storage devices." },
  { name: "iFile", category: "Utilities", version: "2.2.0", repository: "BigBoss", ios: "iOS 3-9", status: "Verified Working", risk: "Medium", rating: 4.7, dependencies: "MobileSubstrate", summary: "Classic file manager for on-device maintenance." },
  { name: "SBSettings", category: "Utilities", version: "6.0.5", repository: "Galactic Server", ios: "iOS 3-6", status: "Verified Working", risk: "Low", rating: 4.6, dependencies: "MobileSubstrate", summary: "Fast toggles for classic jailbroken setups." },
  { name: "RecordMyScreen", category: "Recording", version: "1.3.0", repository: "BigBoss", ios: "iOS 5-7", status: "Partial", risk: "Medium", rating: 4.2, dependencies: "MobileSubstrate", summary: "Screen recording utility for older devices." },
  { name: "MapsX", category: "Restoration", version: "1.0.4", repository: "SkyGlow", ios: "iOS 6", status: "Verified Working", risk: "Low", rating: 4.8, dependencies: "SkyGlow repo", summary: "Restores Maps behavior on iOS 6-era devices." },
  { name: "TubeRepair", category: "Restoration", version: "1.2.0", repository: "SkyGlow", ios: "iOS 5-7", status: "Experimental", risk: "Medium", rating: 4.5, dependencies: "SkyGlow repo", summary: "Restores classic YouTube playback paths where supported." },
  { name: "Veteris", category: "Applications", version: "2.0", repository: "Yzu", ios: "iOS 5-6", status: "Verified Working", risk: "Low", rating: 4.8, dependencies: "Yzu repo", summary: "Legacy app discovery and preservation utility." }
];

const snapshotRecords = [
  { title: "Clean baseline", date: "2026-06-15", device: "iPhone 4", packages: 18, repos: 4, status: "Rollback ready" },
  { title: "After restoration tools", date: "2026-06-15", device: "iPhone 4", packages: 24, repos: 4, status: "Review recommended" },
  { title: "Pre-theme install", date: "2026-06-14", device: "iPad 2", packages: 31, repos: 5, status: "Archived" }
];

const communityResources = [
  { name: "r/LegacyJailbreak", type: "Community", value: "Reddit troubleshooting and setup reports" },
  { name: "iPhoneOS Obscura", type: "Archive", value: "Historical iOS software preservation resource" },
  { name: "Legacy iOS Kit", type: "Tooling", value: "Jailbreak and restoration workflow reference" }
];

const setupItems: SetupItem[] = [
  {
    id: "repos",
    title: "Add recommended repositories",
    reason: "These sources cover essential utilities and service restoration packages.",
    compatibility: "iOS 3-9, strongest path for iOS 5-7",
    risk: "Low",
    instructions: "Open Cydia > Sources > Edit > Add, then paste each recommended repo URL."
  },
  {
    id: "utilities",
    title: "Install essential utilities",
    reason: "Activator, iCleaner, iFile, and SBSettings make maintenance safer and easier.",
    compatibility: "iPhone 4 on iOS 6.1.3: recommended",
    risk: "Low",
    instructions: "Install one utility at a time, respring, then confirm the device still boots cleanly."
  },
  {
    id: "restoration",
    title: "Install restoration tools",
    reason: "MapsX, TubeRepair, and Veteris restore broken services and app discovery paths.",
    compatibility: "Best on iOS 5-6",
    risk: "Medium",
    instructions: "Add SkyGlow and Yzu, install the restoration tool, then test the service before adding another."
  },
  {
    id: "backup",
    title: "Back up package list",
    reason: "A package list makes recovery easier if a tweak breaks SpringBoard or Cydia.",
    compatibility: "All jailbroken devices",
    risk: "Low",
    instructions: "Export installed packages before making source or tweak changes."
  },
  {
    id: "doctor",
    title: "Run Device Doctor",
    reason: "Basic diagnostics catch missing repos, incompatible tweaks, low storage, and service restoration needs.",
    compatibility: "Basic scan is free",
    risk: "Low",
    instructions: "Run the basic scan and fix high-severity issues first."
  },
  {
    id: "report",
    title: "Export setup report",
    reason: "Keeps a local record of repos, recommendations, issues, and next actions.",
    compatibility: "Text export in MVP",
    risk: "Low",
    instructions: "Export the final summary and keep it with the device archive."
  }
];

const services = [
  { name: "MapsX", fixes: "Maps behavior on iOS 6", supported: "iOS 6", repo: "SkyGlow", limits: "Regional behavior may vary.", steps: "Add SkyGlow, install MapsX, reboot, then test search and routing." },
  { name: "TubeRepair", fixes: "YouTube playback paths", supported: "iOS 5-7", repo: "SkyGlow", limits: "Endpoint support can change.", steps: "Add SkyGlow, install TubeRepair, configure endpoint if required, then test playback." },
  { name: "Weather restoration", fixes: "Weather endpoint failures", supported: "iOS 5-6", repo: "Community notes", limits: "Often endpoint-specific.", steps: "Review current community notes before installing any profile or tweak." },
  { name: "App Store restoration", fixes: "Old App Store access research", supported: "iOS 5-6", repo: "Yzu / community", limits: "Do not bypass licensing.", steps: "Use user-owned purchase history and license-respecting archives only." },
  { name: "iTunes Store restoration", fixes: "Legacy storefront connectivity", supported: "iOS 5-6", repo: "None", limits: "Apple server behavior may be unavailable.", steps: "Document status and avoid unknown certificates." },
  { name: "YouTube restoration", fixes: "Classic YouTube client/web fallback", supported: "iOS 5-7", repo: "SkyGlow", limits: "Playback support changes upstream.", steps: "Start with TubeRepair and keep rollback notes." }
];

const defaultConsentState: ConsentState = {
  localOnlyMode: true,
  telemetryOptIn: false,
  crashReportsOptIn: false,
  acceptedPrivacy: false,
  acceptedTerms: false,
  updatedAt: null
};

const deletePhrase = "DELETE LOCAL DATA";
const consentChecklistSize = 5;
const desktopPolicyLinks = {
  privacy: "https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub/blob/main/docs/privacy.md",
  terms: "https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub/blob/main/docs/terms.md",
  licenseReview: "https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub/blob/main/docs/third-party-license-review.md",
  betaChecklist: "https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub/blob/main/docs/beta-release-checklist.md",
  supabase: "https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub/blob/main/docs/supabase-cloud.md"
};

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "bad" | "neutral" }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

async function safeInvoke<T>(command: string, args?: Record<string, unknown>, fallback?: T): Promise<T> {
  try {
    return await invoke<T>(command, args);
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error(`${command} unavailable`);
  }
}

function fallbackDevice(): Device {
  return {
    id: "local-demo-iphone4",
    name: "iPhone 4",
    identifier: "iPhone3,1",
    firmware: "6.1.3",
    battery_health: 86,
    status: "demo"
  };
}

function loadConsentState(): ConsentState {
  if (typeof window === "undefined") return defaultConsentState;
  try {
    const saved = window.localStorage.getItem("legacydock.desktop.consent");
    return saved ? { ...defaultConsentState, ...JSON.parse(saved) } : defaultConsentState;
  } catch {
    return defaultConsentState;
  }
}

function reportText(device: Device, completed: string[], issues: ReturnType<typeof doctorIssues>) {
  return [
    "LegacyDock Setup Report",
    `Device: ${device.name} (${device.identifier})`,
    `iOS: ${device.firmware}`,
    `UDID: ${device.id} (stored locally only)`,
    "",
    "Recommended repositories:",
    ...curatedRepos.map((repo) => `- ${repo.name}: ${repo.url}`),
    "",
    "Recommended packages:",
    ...recommendedPackages.map((pkg) => `- ${pkg}`),
    "",
    "Issues found:",
    ...issues.map((issue) => `- [${issue.severity}] ${issue.title}: ${issue.fix}`),
    "",
    "Completed setup items:",
    ...completed.map((id) => `- ${setupItems.find((item) => item.id === id)?.title || id}`),
    "",
    "Remaining actions:",
    ...setupItems.filter((item) => !completed.includes(item.id)).map((item) => `- ${item.title}`)
  ].join("\n");
}

function doctorIssues(device: Device) {
  const firmware = Number(device.firmware.split(".")[0]);
  return [
    {
      title: "Recommended repos not confirmed",
      severity: "Medium",
      explanation: "LegacyDock cannot verify Cydia sources until package state inspection is connected.",
      fix: "Add BigBoss, SkyGlow, Yzu, and Galactic Server manually in Cydia."
    },
    {
      title: "Service restoration needed",
      severity: firmware <= 6 ? "Medium" : "Low",
      explanation: "Older Apple and YouTube services may be broken or partially unavailable.",
      fix: "Review MapsX, TubeRepair, and Weather restoration guidance."
    },
    {
      title: "Automatic mutation disabled",
      severity: "Low",
      explanation: "MVP keeps all installs manual to avoid risky device changes.",
      fix: "Use the checklist and export a report before installing tweaks."
    }
  ];
}

function App() {
  const [appMode, setAppMode] = useState<AppMode>("wizard");
  const [step, setStep] = useState(0);
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("devices");
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("All");
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device>(fallbackDevice());
  const [scores, setScores] = useState<DoctorScore[]>([]);
  const [repoHealth, setRepoHealth] = useState<RepositoryHealth[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [status, setStatus] = useState("Connect your legacy iOS device to begin.");
  const [consent, setConsent] = useState<ConsentState>(() => loadConsentState());
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [pendingUpdate, setPendingUpdate] = useState<any | null>(null);
  const [updateSummary, setUpdateSummary] = useState<UpdateSummary | null>(null);
  const [updateBusy, setUpdateBusy] = useState(false);
  const [updateProgress, setUpdateProgress] = useState("");

  const issues = useMemo(() => doctorIssues(selectedDevice), [selectedDevice]);
  const supportedRange = Number(selectedDevice.firmware.split(".")[0]) >= 3 && Number(selectedDevice.firmware.split(".")[0]) <= 9;
  const consentProgress = [consent.localOnlyMode, consent.telemetryOptIn === false, consent.crashReportsOptIn === false, consent.acceptedPrivacy, consent.acceptedTerms].filter(Boolean).length;
  const visiblePackages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return consolePackages.filter((pkg) => {
      const matchesFilter = packageFilter === "All" || pkg.category === packageFilter || pkg.ios.includes(packageFilter);
      const matchesSearch = !query || [pkg.name, pkg.repository, pkg.category, pkg.ios, pkg.status, pkg.summary].some((field) => field.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  }, [packageFilter, search]);
  const detectedDevices = devices.length ? devices : [selectedDevice, { ...fallbackDevice(), id: "demo-ipad2", name: "iPad 2", identifier: "iPad2,1", firmware: "9.3.5", battery_health: 74, status: "demo" }];

  async function discover() {
    setStatus("Scanning USB connection locally...");
    const result = await safeInvoke<{ devices: Device[]; diagnostics: string[] }>("discover_devices", undefined, { devices: [], diagnostics: [] });
    setDevices(result.devices);
    const next = result.devices[0] || fallbackDevice();
    setSelectedDevice(next);
    setStatus(result.devices.length ? `Detected ${next.name} running iOS ${next.firmware}.` : "No device detected. Demo profile loaded so you can review the setup path.");
    await runDoctor(next);
  }

  async function runDoctor(device = selectedDevice) {
    const result = await safeInvoke<DoctorScore[]>("run_device_doctor", { device }, [
      { label: "Overall Health", value: 88, explanation: "Demo score until Rust diagnostics are available." },
      { label: "Compatibility", value: 96, explanation: "iOS 6.1.3 is a strong LegacyDock setup target." },
      { label: "Repository Health", value: 84, explanation: "Repository checks should be completed before installs." }
    ]);
    setScores(result);
  }

  async function checkRepos() {
    const result = await safeInvoke<RepositoryHealth[]>("check_repository_health", { urls: curatedRepos.map((repo) => repo.url) }, curatedRepos.map((repo) => ({
      url: repo.url,
      status: "manual",
      package_index_available: false,
      detail: "Remote check unavailable in preview; copy into Cydia manually."
    })));
    setRepoHealth(result);
  }

  function toggleComplete(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function copyRepos() {
    await navigator.clipboard.writeText(curatedRepos.map((repo) => repo.url).join("\n"));
    setStatus("Repository list copied.");
  }

  function saveProfile() {
    localStorage.setItem("legacydock.setup.profile", JSON.stringify({ device: selectedDevice, completed, savedAt: new Date().toISOString() }));
    setStatus("Device profile saved locally.");
  }

  function exportReport() {
    const blob = new Blob([reportText(selectedDevice, completed, issues)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `legacydock-${selectedDevice.identifier}-setup-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Text setup report exported.");
  }

  function updateConsent(patch: Partial<ConsentState>) {
    setConsent((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString()
    }));
  }

  function exportWorkspaceJson() {
    const payload = {
      schema: "legacydock.desktop-local-export.v1",
      exportedAt: new Date().toISOString(),
      device: selectedDevice,
      devices: detectedDevices,
      repositories: curatedRepos,
      recommendedPackages,
      unsupportedPackages,
      completed,
      issues,
      snapshots: snapshotRecords,
      communityResources,
      settings: consent,
      compliance: {
        localOnlyMode: consent.localOnlyMode,
        telemetryDefault: consent.telemetryOptIn ? "opted-in" : "off",
        crashReportsDefault: consent.crashReportsOptIn ? "opted-in" : "off",
        hostedDeletion: "required-before-cloud-launch",
        thirdPartyReview: "see docs/third-party-license-review.md"
      },
      reports: [
        {
          id: `${selectedDevice.id}-setup-report`,
          type: "setup-report",
          generatedAt: new Date().toISOString(),
          body: reportText(selectedDevice, completed, issues)
        }
      ]
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `legacydock-${selectedDevice.identifier}-workspace-export.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Workspace export saved locally.");
  }

  function deleteLocalWorkspace() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("legacydock."))
      .forEach((key) => localStorage.removeItem(key));
    setCompleted([]);
    setDevices([]);
    setSelectedDevice(fallbackDevice());
    setConsent(defaultConsentState);
    setDeleteConfirmation("");
    setStatus("Local LegacyDock workspace data cleared.");
  }

  async function checkForUpdates() {
    setUpdateBusy(true);
    setUpdateProgress("Checking updates...");
    try {
      const update = await check();
      if (!update) {
        setPendingUpdate(null);
        setUpdateSummary(null);
        setUpdateProgress("LegacyDock is already on the latest published build.");
        return;
      }
      setPendingUpdate(update);
      setUpdateSummary({
        currentVersion: update.currentVersion,
        nextVersion: update.version,
        notes: update.body,
        date: update.date
      });
      setUpdateProgress(`Update ${update.version} is ready to download.`);
    } catch (error) {
      setPendingUpdate(null);
      setUpdateSummary(null);
      setUpdateProgress("Update endpoint is not reachable yet. Keep using local builds until hosting is live.");
      setStatus(error instanceof Error ? error.message : "Updater check failed.");
    } finally {
      setUpdateBusy(false);
    }
  }

  async function installUpdate() {
    if (!pendingUpdate) return;
    setUpdateBusy(true);
    setUpdateProgress("Preparing download...");
    try {
      let downloaded = 0;
      let total = 0;
      await pendingUpdate.downloadAndInstall((event: any) => {
        switch (event.event) {
          case "Started":
            total = event.data.contentLength || 0;
            setUpdateProgress(total ? `Downloading 0 / ${total} bytes...` : "Downloading update...");
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            setUpdateProgress(total ? `Downloading ${downloaded} / ${total} bytes...` : `Downloaded ${downloaded} bytes...`);
            break;
          case "Finished":
            setUpdateProgress("Update package verified and installed. Windows may close the app to finish installation.");
            break;
        }
      });
      setPendingUpdate(null);
      setStatus("Updater installed the new LegacyDock build.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Update install failed.");
      setUpdateProgress("Update download or install failed.");
    } finally {
      setUpdateBusy(false);
    }
  }

  useEffect(() => {
    runDoctor();
    checkRepos();
  }, []);

  useEffect(() => {
    localStorage.setItem("legacydock.desktop.consent", JSON.stringify(consent));
  }, [consent]);

  const stepView = [
    <section className="wizard-hero" key="welcome">
      <img className="hero-logo" src="/logodock.svg" alt="LegacyDock" />
      <Pill tone="good">iOS 3-9 supported</Pill>
      <h1>Set up an old jailbroken iPhone without guessing.</h1>
      <p>LegacyDock guides beginners through device detection, safe repos, compatible tweaks, service restoration, and a final local setup report.</p>
      <div className="hero-actions">
        <button className="primary-action" onClick={() => setStep(1)}><Smartphone size={18} /> Start setup</button>
        <button onClick={discover}><RefreshCcw size={18} /> Try detection</button>
      </div>
      <small>Connect your legacy iOS device to begin. UDID stays local.</small>
    </section>,
    <section className="wizard-grid" key="detect">
      <article className="panel large-panel">
        <div className="panel-head">
          <div><Pill>Device Detection</Pill><h2>{selectedDevice.name}</h2></div>
          <button onClick={discover}><RefreshCcw size={16} /> Retry</button>
        </div>
        <div className="device-card">
          <Smartphone size={44} />
          <div>
            <strong>{selectedDevice.identifier}</strong>
            <span>iOS {selectedDevice.firmware} / {supportedRange ? "supported" : "outside MVP range"}</span>
            <small>UDID: {selectedDevice.id} / local only</small>
          </div>
        </div>
        <div className="stat-grid compact">
          <article><span>Connection</span><strong>{devices.length ? "USB detected" : "Needs retry"}</strong></article>
          <article><span>Jailbreak</span><strong>Check Cydia</strong></article>
          <article><span>Storage</span><strong>Inspect next</strong></article>
          <article><span>Battery</span><strong>{selectedDevice.battery_health ? `${selectedDevice.battery_health}%` : "Unknown"}</strong></article>
        </div>
      </article>
      <article className="panel">
        <Pill tone="warn">No device?</Pill>
        <h2>Cable checklist</h2>
        <ul className="plain-list">
          <li>Use a data-capable USB cable, not charge-only.</li>
          <li>Unlock the device and tap Trust This Computer.</li>
          <li>Install iTunes/Finder drivers or libimobiledevice tools.</li>
          <li>Reconnect after Cydia or jailbreak tools finish respringing.</li>
        </ul>
      </article>
    </section>,
    <section className="wizard-grid" key="compat">
      <article className="panel large-panel">
        <Pill>Compatibility Scan</Pill>
        <h2>{selectedDevice.name} on iOS {selectedDevice.firmware}</h2>
        <p className="muted">Recommended setup path: add curated repos, install utilities first, then restoration packages one at a time.</p>
        <div className="recommendation-columns">
          <div><h3>Recommended repos</h3>{curatedRepos.map((repo) => <Pill key={repo.name} tone="good">{repo.name}</Pill>)}</div>
          <div><h3>Recommended packages</h3>{recommendedPackages.map((pkg) => <Pill key={pkg}>{pkg}</Pill>)}</div>
          <div><h3>Unsupported / risky</h3>{unsupportedPackages.map((pkg) => <Pill key={pkg} tone="warn">{pkg}</Pill>)}</div>
        </div>
      </article>
      <article className="panel">
        <Pill tone="warn">Known risks</Pill>
        <ul className="plain-list">{knownRisks.map((risk) => <li key={risk}>{risk}</li>)}</ul>
      </article>
    </section>,
    <section className="panel" key="repos">
      <div className="panel-head">
        <div><Pill>Repository Health</Pill><h2>Curated source list</h2></div>
        <button onClick={checkRepos}><RefreshCcw size={16} /> Refresh</button>
      </div>
      <div className="repo-list">
        {curatedRepos.map((repo) => {
          const health = repoHealth.find((item) => item.url === repo.url);
          return <div className="repo-row rich-row" key={repo.url}>
            <span><strong>{repo.name}</strong><small>{repo.url}</small><small>{repo.reason}</small></span>
            <span className="repo-actions">
              <Pill tone={health?.status === "online" ? "good" : health?.status === "offline" ? "bad" : "warn"}>{health?.status || "not checked"}</Pill>
              <small>{health?.package_index_available ? "Package index available" : "Manual check"}</small>
              <button onClick={() => navigator.clipboard.writeText(repo.url)}><Clipboard size={15} /> Copy</button>
            </span>
          </div>;
        })}
      </div>
      <p className="muted">Add to Cydia: Sources &gt; Edit &gt; Add &gt; paste URL &gt; refresh sources.</p>
    </section>,
    <section className="panel" key="checklist">
      <Pill>Essential Setup</Pill>
      <h2>Personalized checklist</h2>
      <div className="checklist">
        {setupItems.map((item) => <label className="check-item" key={item.id}>
          <input type="checkbox" checked={completed.includes(item.id)} onChange={() => toggleComplete(item.id)} />
          <span><strong>{item.title}</strong><small>{item.reason}</small><small>{item.compatibility} / {item.risk} risk</small><em>{item.instructions}</em></span>
        </label>)}
      </div>
    </section>,
    <section className="wizard-grid" key="doctor">
      <article className="panel">
        <div className="panel-head"><div><Pill>Device Doctor</Pill><h2>Basic diagnostics</h2></div><button onClick={() => runDoctor()}><HeartPulse size={16} /> Run</button></div>
        <div className="score-list">{scores.map((score) => <div key={score.label} className="score-row"><span>{score.label}<small>{score.explanation}</small></span><strong>{score.value}</strong></div>)}</div>
      </article>
      <article className="panel">
        <Pill tone="good">Free basic scan</Pill>
        <h2>Issues found</h2>
        <div className="issue-list">{issues.map((issue) => <div className="issue-card" key={issue.title}><Pill tone={issue.severity === "Medium" ? "warn" : "good"}>{issue.severity}</Pill><strong>{issue.title}</strong><small>{issue.explanation}</small><em>{issue.fix}</em></div>)}</div>
        <p className="muted section-footnote">Advanced scans can become a future LegacyDock Care feature.</p>
      </article>
    </section>,
    <section className="panel" key="services">
      <Pill>Legacy Service Restoration</Pill>
      <h2>Guided fixes</h2>
      <div className="service-grid">
        {services.map((service) => <article className="service-card" key={service.name}>
          <Wrench size={20} />
          <h3>{service.name}</h3>
          <p>{service.fixes}</p>
          <Pill>{service.supported}</Pill>
          <small>Repo: {service.repo}</small>
          <small>Limits: {service.limits}</small>
          <em>{service.steps}</em>
        </article>)}
      </div>
    </section>,
    <section className="wizard-grid" key="summary">
      <article className="panel large-panel">
        <Pill tone="good">Final Summary</Pill>
        <h2>{selectedDevice.name} setup plan</h2>
        <div className="summary-grid">
          <div><span>Device</span><strong>{selectedDevice.identifier}</strong><small>iOS {selectedDevice.firmware}</small></div>
          <div><span>Recommended repos</span><strong>{curatedRepos.length}</strong><small>{curatedRepos.map((repo) => repo.name).join(", ")}</small></div>
          <div><span>Packages</span><strong>{recommendedPackages.length}</strong><small>{recommendedPackages.join(", ")}</small></div>
          <div><span>Issues</span><strong>{issues.length}</strong><small>{issues.map((issue) => issue.title).join(", ")}</small></div>
          <div><span>Completed</span><strong>{completed.length}</strong><small>{setupItems.length - completed.length} remaining</small></div>
        </div>
      </article>
      <article className="panel action-panel">
        <button onClick={exportReport}><FileDown size={17} /> Export text report</button>
        <button onClick={copyRepos}><Clipboard size={17} /> Copy repo list</button>
        <button onClick={saveProfile}><Database size={17} /> Save profile locally</button>
        <button onClick={() => setStep(0)}><Activity size={17} /> Return to dashboard</button>
      </article>
    </section>
  ];

  const packageFilters = ["All", "Utilities", "Restoration", "Applications", "Recording", "iOS 6", "iOS 9"];

  const consoleView = {
    devices: <section className="console-grid" key="console-devices">
      <article className="panel large-panel">
        <div className="panel-head">
          <div><Pill>Device Console</Pill><h2>Connected and saved devices</h2></div>
          <button onClick={discover}><Smartphone size={16} /> Detect</button>
        </div>
        <div className="device-console-grid">
          {detectedDevices.map((device) => <button className={`console-device-card ${selectedDevice.id === device.id ? "active" : ""}`} key={device.id} onClick={() => setSelectedDevice(device)}>
            <Smartphone size={34} />
            <span><strong>{device.name}</strong><small>{device.identifier} / iOS {device.firmware}</small><small>{device.status === "demo" ? "Demo profile until USB detection is available" : device.status}</small></span>
            <Pill tone={Number(device.firmware.split(".")[0]) <= 9 ? "good" : "warn"}>{Number(device.firmware.split(".")[0]) <= 9 ? "Supported" : "Review"}</Pill>
          </button>)}
        </div>
      </article>
      <article className="panel">
        <Pill tone="good">Read-only first</Pill>
        <h2>{selectedDevice.name}</h2>
        <div className="summary-grid single-column">
          <div><span>Firmware</span><strong>iOS {selectedDevice.firmware}</strong><small>{selectedDevice.identifier}</small></div>
          <div><span>Battery</span><strong>{selectedDevice.battery_health || "Unknown"}{selectedDevice.battery_health ? "%" : ""}</strong><small>Reported locally when available</small></div>
          <div><span>Mutation</span><strong>Disabled</strong><small>Manual install guidance only</small></div>
        </div>
      </article>
    </section>,
    repositories: <section className="panel" key="console-repos">
      <div className="panel-head">
        <div><Pill>Repository Hub</Pill><h2>Curated sources and health</h2></div>
        <button onClick={checkRepos}><RefreshCcw size={16} /> Refresh health</button>
      </div>
      <div className="repo-health-strip">
        <article><strong>{curatedRepos.filter((repo) => repo.status === "Verified").length}</strong><span>Verified repos</span></article>
        <article><strong>{curatedRepos.reduce((total, repo) => total + repo.packageCount, 0).toLocaleString()}</strong><span>Indexed packages</span></article>
        <article><strong>{repoHealth.filter((repo) => repo.package_index_available).length || "Manual"}</strong><span>Package indexes</span></article>
        <article><strong>HTTP/SSL</strong><span>Compatibility checked</span></article>
      </div>
      <div className="repository-console-list">
        {curatedRepos.map((repo) => {
          const health = repoHealth.find((item) => item.url === repo.url);
          return <article className="repository-console-card" key={repo.url}>
            <div>
              <Pill tone={repo.status === "Verified" ? "good" : "warn"}>{repo.status}</Pill>
              <h3>{repo.name}</h3>
              <p>{repo.reason}</p>
              <small>{repo.url}</small>
            </div>
            <dl>
              <div><dt>Category</dt><dd>{repo.category}</dd></div>
              <div><dt>Packages</dt><dd>{repo.packageCount.toLocaleString()}</dd></div>
              <div><dt>Rating</dt><dd>{repo.rating}/5</dd></div>
              <div><dt>Maintainer</dt><dd>{repo.maintainer}</dd></div>
            </dl>
            <div className="repo-actions">
              <Pill tone={health?.status === "online" ? "good" : health?.status === "offline" ? "bad" : "warn"}>{health?.status || "not checked"}</Pill>
              <button onClick={() => navigator.clipboard.writeText(repo.url)}><Clipboard size={15} /> Copy URL</button>
            </div>
          </article>;
        })}
      </div>
    </section>,
    packages: <section className="panel" key="console-packages">
      <div className="panel-head">
        <div><Pill>Package Browser</Pill><h2>Browse compatible tweaks without opening Cydia</h2></div>
        <Pill tone="good">{visiblePackages.length} shown</Pill>
      </div>
      <div className="filter-row">
        {packageFilters.map((filter) => <button className={packageFilter === filter ? "active-filter" : ""} key={filter} onClick={() => setPackageFilter(filter)}>{filter}</button>)}
      </div>
      <div className="package-console-grid">
        {visiblePackages.map((pkg) => <article className="package-console-card" key={pkg.name}>
          <div className="package-thumb"><PackageSearch size={28} /></div>
          <div>
            <Pill tone={pkg.status === "Verified Working" ? "good" : pkg.status === "Partial" ? "warn" : "neutral"}>{pkg.status}</Pill>
            <h3>{pkg.name}</h3>
            <p>{pkg.summary}</p>
          </div>
          <dl>
            <div><dt>Version</dt><dd>{pkg.version}</dd></div>
            <div><dt>Repository</dt><dd>{pkg.repository}</dd></div>
            <div><dt>Compatibility</dt><dd>{pkg.ios}</dd></div>
            <div><dt>Dependencies</dt><dd>{pkg.dependencies}</dd></div>
          </dl>
          <div className="repo-actions">
            <Pill tone={pkg.risk === "Low" ? "good" : "warn"}>{pkg.risk} risk</Pill>
            <button onClick={() => navigator.clipboard.writeText(`${pkg.name} - ${pkg.repository}`)}><Clipboard size={15} /> Copy install note</button>
          </div>
        </article>)}
      </div>
    </section>,
    doctor: <section className="console-grid" key="console-doctor">
      <article className="panel">
        <div className="panel-head">
          <div><Pill>Device Doctor</Pill><h2>Diagnostics center</h2></div>
          <button onClick={() => runDoctor()}><HeartPulse size={16} /> Run scan</button>
        </div>
        <div className="score-list">{scores.map((score) => <div key={score.label} className="score-row"><span>{score.label}<small>{score.explanation}</small></span><strong>{score.value}</strong></div>)}</div>
      </article>
      <article className="panel">
        <Pill tone="warn">Issues and fixes</Pill>
        <h2>Manual repair plan</h2>
        <div className="issue-list">{issues.map((issue) => <div className="issue-card" key={issue.title}><Pill tone={issue.severity === "Medium" ? "warn" : "good"}>{issue.severity}</Pill><strong>{issue.title}</strong><small>{issue.explanation}</small><em>{issue.fix}</em></div>)}</div>
      </article>
    </section>,
    snapshots: <section className="console-grid" key="console-snapshots">
      <article className="panel large-panel">
        <div className="panel-head"><div><Pill>Snapshots</Pill><h2>Local rollback records</h2></div><button onClick={() => setStatus("Snapshot capture is planned; current build exports manual reports.")}><Archive size={16} /> Capture preview</button></div>
        <div className="snapshot-list">
          {snapshotRecords.map((snapshot) => <article className="snapshot-card" key={snapshot.title}>
            <Archive size={22} />
            <span><strong>{snapshot.title}</strong><small>{snapshot.device} / {snapshot.date}</small><small>{snapshot.packages} packages and {snapshot.repos} repos</small></span>
            <Pill tone={snapshot.status === "Rollback ready" ? "good" : "warn"}>{snapshot.status}</Pill>
          </article>)}
        </div>
      </article>
      <article className="panel">
        <Pill>Diff Preview</Pill>
        <h2>Last known changes</h2>
        <ul className="plain-list">
          <li>SkyGlow source added for restoration packages.</li>
          <li>MapsX and TubeRepair marked as service restoration candidates.</li>
          <li>No automatic rollback will run until safe mutation executor is enabled.</li>
        </ul>
      </article>
    </section>,
    reports: <section className="console-grid" key="console-reports">
      <article className="panel large-panel">
        <div className="panel-head">
          <div><Pill>Reports And Controls</Pill><h2>Exports, consent, and local data safety</h2></div>
          <Pill tone={consent.localOnlyMode ? "good" : "warn"}>{consent.localOnlyMode ? "Local-only mode" : "Cloud-ready preferences"}</Pill>
        </div>
        <div className="reports-grid">
          <section className="subpanel">
            <Pill tone="good">Data export</Pill>
            <h3>Portable local records</h3>
            <p className="muted">Export a plain-text setup report or a full local JSON workspace bundle with recommendations, reports, and consent settings.</p>
            <div className="action-panel">
              <button onClick={exportReport}><FileDown size={17} /> Export setup report</button>
              <button onClick={exportWorkspaceJson}><Database size={17} /> Export workspace JSON</button>
              <button onClick={copyRepos}><Clipboard size={17} /> Copy repo list</button>
              <button onClick={saveProfile}><Archive size={17} /> Save device profile</button>
            </div>
          </section>
          <section className="subpanel">
            <Pill tone="good">Desktop updates</Pill>
            <h3>Hosted release channel</h3>
            <p className="muted">LegacyDock checks the hosted updater manifest and installs signed Windows update bundles when available.</p>
            <small className="endpoint-note"><strong>Endpoint</strong> bnauijvhhsawcvscsefx.supabase.co/storage/v1/object/public/legacydock-updates/latest.json</small>
            <div className="summary-grid single-column update-summary">
              <div><span>Channel</span><strong>Stable</strong><small>NSIS update bundle from the hosted Windows release feed</small></div>
              <div><span>Status</span><strong>{updateSummary ? `v${updateSummary.nextVersion} available` : "No pending update"}</strong><small>{updateProgress || "Use Check for updates to contact the hosted manifest."}</small></div>
              {updateSummary && <div><span>Version path</span><strong>{updateSummary.currentVersion} {"->"} {updateSummary.nextVersion}</strong><small>{updateSummary.notes || "No release notes supplied by the manifest yet."}</small></div>}
            </div>
            <div className="action-panel">
              <button className="primary-action" disabled={updateBusy} onClick={checkForUpdates}><RefreshCcw size={17} /> {updateBusy ? "Working..." : "Check for updates"}</button>
              <button disabled={!pendingUpdate || updateBusy} onClick={installUpdate}><FileDown size={17} /> Install available update</button>
            </div>
          </section>
          <section className="subpanel">
            <Pill tone="good">Privacy and terms</Pill>
            <h3>Visible consent controls</h3>
            <div className="summary-grid single-column compact-summary">
              <div><span>Consent progress</span><strong>{consentProgress} / {consentChecklistSize}</strong><small>{consent.updatedAt ? `Last updated ${new Date(consent.updatedAt).toLocaleString()}` : "No local review recorded yet."}</small></div>
              <div><span>Hosted deletion</span><strong>Pending</strong><small>Local delete is ready now. Hosted delete/export parity is still required before cloud launch.</small></div>
            </div>
            <label className="setting-row">
              <span><strong>Keep LegacyDock local-only</strong><small>Disable account assumptions and keep diagnostics, exports, and setup notes on this machine.</small></span>
              <input type="checkbox" checked={consent.localOnlyMode} onChange={(event) => updateConsent({ localOnlyMode: event.target.checked })} />
            </label>
            <label className="setting-row">
              <span><strong>Allow redacted telemetry later</strong><small>Off by default. No telemetry leaves the app until you opt in and hosted services are active.</small></span>
              <input type="checkbox" checked={consent.telemetryOptIn} onChange={(event) => updateConsent({ telemetryOptIn: event.target.checked })} />
            </label>
            <label className="setting-row">
              <span><strong>Allow redacted crash reports later</strong><small>Crash reporting stays disabled until consent, redaction, export, and deletion controls are all present.</small></span>
              <input type="checkbox" checked={consent.crashReportsOptIn} onChange={(event) => updateConsent({ crashReportsOptIn: event.target.checked })} />
            </label>
            <label className="setting-row">
              <span><strong>Privacy notes reviewed</strong><small>Local data includes device profiles, repository metadata, snapshots, reports, and settings.</small></span>
              <input type="checkbox" checked={consent.acceptedPrivacy} onChange={(event) => updateConsent({ acceptedPrivacy: event.target.checked })} />
            </label>
            <label className="setting-row">
              <span><strong>Terms reviewed</strong><small>LegacyDock remains metadata-first and does not grant rights to bypass ownership, licenses, or upstream terms.</small></span>
              <input type="checkbox" checked={consent.acceptedTerms} onChange={(event) => updateConsent({ acceptedTerms: event.target.checked })} />
            </label>
            <div className="inline-links">
              <a href={desktopPolicyLinks.privacy} target="_blank" rel="noreferrer">Read privacy notes</a>
              <a href={desktopPolicyLinks.terms} target="_blank" rel="noreferrer">Read terms</a>
              <a href={desktopPolicyLinks.licenseReview} target="_blank" rel="noreferrer">Read license review</a>
            </div>
          </section>
          <section className="subpanel">
            <Pill>Cloud and release</Pill>
            <h3>Hosted contract and beta gate</h3>
            <div className="summary-grid single-column compact-summary">
              <div><span>Supabase</span><strong>Scaffolded</strong><small>Schema, env contract, buckets, and RLS starter policies are documented for the optional cloud path.</small></div>
              <div><span>Beta status</span><strong>Not clear yet</strong><small>Signing, hardware QA, and final license decisions still block a real beta label.</small></div>
            </div>
            <ul className="plain-list compact-list">
              <li>No service key should ever ship in the desktop app.</li>
              <li>Keep exports and backups private if hosted storage is enabled.</li>
              <li>Review rollback, updater, privacy, and attribution gates before public beta.</li>
            </ul>
            <div className="inline-links">
              <a href={desktopPolicyLinks.supabase} target="_blank" rel="noreferrer">Read Supabase contract</a>
              <a href={desktopPolicyLinks.betaChecklist} target="_blank" rel="noreferrer">Read beta checklist</a>
            </div>
          </section>
          <section className="subpanel danger-panel">
            <Pill tone="warn">Delete local data</Pill>
            <h3>Reset this LegacyDock workspace</h3>
            <p className="muted">This removes saved profile data, consent choices, and any local LegacyDock browser-state records on this machine.</p>
            <ul className="plain-list compact-list">
              <li>Device-side tweaks, repos, and package changes are not removed.</li>
              <li>Third-party repository data and external tool records are not touched.</li>
              <li>Hosted account deletion is a separate future flow.</li>
            </ul>
            <label className="danger-field">
              <span>Type <strong>{deletePhrase}</strong> to confirm.</span>
              <input value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} placeholder={deletePhrase} />
            </label>
            <button disabled={deleteConfirmation !== deletePhrase} onClick={deleteLocalWorkspace}><Trash2 size={17} /> Delete local data</button>
          </section>
        </div>
      </article>
      <article className="panel">
        <Pill>Community Resources</Pill>
        <h2>Trusted starting points</h2>
        <div className="resource-list">
          {communityResources.map((resource) => <article className="resource-row" key={resource.name}><ShieldCheck size={18} /><span><strong>{resource.name}</strong><small>{resource.type} / {resource.value}</small></span></article>)}
        </div>
      </article>
    </section>
  }[consoleTab];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><img src="/logodock.svg" alt="" /><div><strong>LegacyDock</strong><span>{appMode === "wizard" ? "Setup Wizard" : "Console"}</span></div></div>
        <div className="mode-switch" aria-label="Application mode">
          <button className={appMode === "wizard" ? "active" : ""} onClick={() => setAppMode("wizard")}><CheckCircle2 size={16} /> Setup</button>
          <button className={appMode === "console" ? "active" : ""} onClick={() => setAppMode("console")}><Activity size={16} /> Console</button>
        </div>
        {appMode === "wizard" ? (
          <nav>{wizardSteps.map((label, index) => <button key={label} className={step === index ? "active" : ""} onClick={() => setStep(index)}><CheckCircle2 size={17} /> {label}</button>)}</nav>
        ) : (
          <nav>
            <button className={consoleTab === "devices" ? "active" : ""} onClick={() => setConsoleTab("devices")}><Smartphone size={17} /> Devices</button>
            <button className={consoleTab === "repositories" ? "active" : ""} onClick={() => setConsoleTab("repositories")}><Database size={17} /> Repositories</button>
            <button className={consoleTab === "packages" ? "active" : ""} onClick={() => setConsoleTab("packages")}><PackageSearch size={17} /> Packages</button>
            <button className={consoleTab === "doctor" ? "active" : ""} onClick={() => setConsoleTab("doctor")}><HeartPulse size={17} /> Device Doctor</button>
            <button className={consoleTab === "snapshots" ? "active" : ""} onClick={() => setConsoleTab("snapshots")}><Archive size={17} /> Snapshots</button>
            <button className={consoleTab === "reports" ? "active" : ""} onClick={() => setConsoleTab("reports")}><ShieldCheck size={17} /> Reports</button>
          </nav>
        )}
        <a className="github-link" href="https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub"><Github size={16} /> GitHub</a>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <Pill tone={consent.localOnlyMode ? "good" : "warn"}>{consent.localOnlyMode ? "Local MVP / no accounts" : "Consent preferences saved locally"}</Pill>
            <h1>{appMode === "wizard" ? "Legacy iOS setup, made obvious." : "LegacyDock Console"}</h1>
            <p>{appMode === "wizard" ? status : "Repository hub, package browser, Device Doctor, snapshots, and reports inside the desktop app."}</p>
          </div>
          <div className="actions">
            <button onClick={discover}><Smartphone size={17} /> Detect</button>
            <button onClick={copyRepos}><PackageCheck size={17} /> Copy repos</button>
          </div>
        </header>
        {appMode === "console" && (
          <section className="console-toolbar">
            <label className="search-field">
              <PackageSearch size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search packages, repos, categories, iOS versions" />
            </label>
            <button onClick={() => runDoctor()}><HeartPulse size={16} /> Scan</button>
            <button onClick={checkRepos}><RefreshCcw size={16} /> Check repos</button>
          </section>
        )}
        {appMode === "wizard" ? (
          <>
            <section className="stepper">{wizardSteps.map((label, index) => <button key={label} className={step === index ? "current" : completed.length && index < step ? "done" : ""} onClick={() => setStep(index)}>{index + 1}<span>{label}</span></button>)}</section>
            {stepView[step]}
            <footer className="wizard-footer">
              <button disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</button>
              <button className="primary-action" disabled={step === wizardSteps.length - 1} onClick={() => setStep((current) => Math.min(wizardSteps.length - 1, current + 1))}>Continue</button>
            </footer>
          </>
        ) : consoleView}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
