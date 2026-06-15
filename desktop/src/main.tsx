import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { invoke } from "@tauri-apps/api/core";
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
  { name: "BigBoss", url: "http://apt.thebigboss.org/repofiles/cydia/", reason: "Core utilities, Activator, iCleaner, iFile, and classic packages." },
  { name: "SkyGlow", url: "http://cydia.skyglow.es/", reason: "Service restoration packages such as MapsX and TubeRepair." },
  { name: "Yzu", url: "http://yzu.moe/dev/", reason: "Legacy application preservation tools including Veteris." },
  { name: "Galactic Server", url: "http://repo.galactic-server.info/", reason: "Classic utility packages such as SBSettings." }
];

const recommendedPackages = ["Activator", "iCleaner", "iFile", "SBSettings", "Veteris", "MapsX", "TubeRepair"];
const unsupportedPackages = ["Heavy WinterBoard theme stacks", "Newer rootless tweaks", "iOS 10+ only packages"];
const knownRisks = ["HTTP-only repositories are normal on older Cydia but should be reviewed.", "Snapshot before changing sources.", "Avoid stacking lock screen and SpringBoard tweaks."];

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
  const [step, setStep] = useState(0);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device>(fallbackDevice());
  const [scores, setScores] = useState<DoctorScore[]>([]);
  const [repoHealth, setRepoHealth] = useState<RepositoryHealth[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [status, setStatus] = useState("Connect your legacy iOS device to begin.");

  const issues = useMemo(() => doctorIssues(selectedDevice), [selectedDevice]);
  const supportedRange = Number(selectedDevice.firmware.split(".")[0]) >= 3 && Number(selectedDevice.firmware.split(".")[0]) <= 9;

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
  }

  useEffect(() => {
    runDoctor();
    checkRepos();
  }, []);

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
        <p className="muted">Advanced scans can become a future LegacyDock Care feature.</p>
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

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><img src="/logodock.svg" alt="" /><div><strong>LegacyDock</strong><span>Setup Wizard</span></div></div>
        <nav>{wizardSteps.map((label, index) => <button key={label} className={step === index ? "active" : ""} onClick={() => setStep(index)}><CheckCircle2 size={17} /> {label}</button>)}</nav>
        <a className="github-link" href="https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub"><Github size={16} /> GitHub</a>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div><Pill tone="good">Local MVP / no accounts</Pill><h1>Legacy iOS setup, made obvious.</h1><p>{status}</p></div>
          <div className="actions">
            <button onClick={discover}><Smartphone size={17} /> Detect</button>
            <button onClick={copyRepos}><PackageCheck size={17} /> Copy repos</button>
          </div>
        </header>
        <section className="stepper">{wizardSteps.map((label, index) => <button key={label} className={step === index ? "current" : completed.length && index < step ? "done" : ""} onClick={() => setStep(index)}>{index + 1}<span>{label}</span></button>)}</section>
        {stepView[step]}
        <footer className="wizard-footer">
          <button disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</button>
          <button className="primary-action" disabled={step === wizardSteps.length - 1} onClick={() => setStep((current) => Math.min(wizardSteps.length - 1, current + 1))}>Continue</button>
        </footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
