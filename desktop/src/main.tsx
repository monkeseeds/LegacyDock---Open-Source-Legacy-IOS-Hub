import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { invoke } from "@tauri-apps/api/core";
import { Activity, Archive, Database, Github, HardDrive, HeartPulse, PackageSearch, ShieldCheck, Smartphone } from "lucide-react";
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

const repoFixtures = [
  "http://apt.thebigboss.org/repofiles/cydia/",
  "http://cydia.skyglow.es/",
  "http://yzu.moe/dev/",
  "http://repo.galactic-server.info/"
];

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "bad" | "neutral" }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scores, setScores] = useState<DoctorScore[]>([]);
  const [repoHealth, setRepoHealth] = useState<RepositoryHealth[]>([]);
  const [storage, setStorage] = useState("SQLite ready");
  const [status, setStatus] = useState("Desktop shell loading");

  async function discover() {
    setStatus("Scanning for legacy iOS devices");
    const result = await invoke<{ devices: Device[]; diagnostics: string[] }>("discover_devices");
    setDevices(result.devices);
    setStatus(result.devices.length ? `Detected ${result.devices.length} device(s)` : "No USB device detected");
  }

  async function runDoctor(device?: Device) {
    const profile = device || devices[0] || {
      id: "fixture-iphone4",
      name: "iPhone 4",
      identifier: "iPhone3,1",
      firmware: "6.1.3",
      battery_health: 86,
      status: "fixture"
    };
    const result = await invoke<DoctorScore[]>("run_device_doctor", { device: profile });
    setScores(result);
  }

  async function checkRepos() {
    const result = await invoke<RepositoryHealth[]>("check_repository_health", { urls: repoFixtures });
    setRepoHealth(result);
  }

  async function initializeDatabase() {
    const result = await invoke<string>("initialize_database");
    setStorage(result);
  }

  useEffect(() => {
    initializeDatabase();
    discover().catch(() => setStatus("Device tools unavailable. Install libimobiledevice to scan hardware."));
    runDoctor();
    checkRepos();
  }, []);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/logodock.svg" alt="" />
          <div>
            <strong>LegacyDock</strong>
            <span>Tauri Desktop</span>
          </div>
        </div>
        <nav>
          <button className="active"><Activity size={17} /> Overview</button>
          <button><Smartphone size={17} /> Devices</button>
          <button><PackageSearch size={17} /> Repositories</button>
          <button><HeartPulse size={17} /> Doctor</button>
          <button><Archive size={17} /> Snapshots</button>
          <button><ShieldCheck size={17} /> Safety</button>
        </nav>
        <a className="github-link" href="https://github.com/monkeseeds/LegacyDock---Open-Source-Legacy-IOS-Hub">
          <Github size={16} /> GitHub
        </a>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <Pill tone="good">Native shell</Pill>
            <h1>Manage legacy iOS devices locally.</h1>
            <p>{status}</p>
          </div>
          <div className="actions">
            <button onClick={discover}><Smartphone size={17} /> Scan</button>
            <button onClick={checkRepos}><PackageSearch size={17} /> Check repos</button>
          </div>
        </header>

        <section className="stat-grid">
          <article>
            <Smartphone />
            <span>Devices</span>
            <strong>{devices.length}</strong>
          </article>
          <article>
            <Database />
            <span>Storage</span>
            <strong>{storage}</strong>
          </article>
          <article>
            <ShieldCheck />
            <span>Mutation mode</span>
            <strong>Dry run</strong>
          </article>
          <article>
            <HardDrive />
            <span>Backend</span>
            <strong>Rust</strong>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel">
            <div className="panel-head">
              <div>
                <Pill>Device Doctor</Pill>
                <h2>Diagnostics</h2>
              </div>
              <button onClick={() => runDoctor()}><HeartPulse size={16} /> Run</button>
            </div>
            <div className="score-list">
              {scores.map((score) => (
                <div key={score.label} className="score-row">
                  <span>{score.label}<small>{score.explanation}</small></span>
                  <strong>{score.value}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-head">
              <div>
                <Pill>Repository Hub</Pill>
                <h2>Health checks</h2>
              </div>
            </div>
            <div className="repo-list">
              {repoHealth.map((repo) => (
                <div key={repo.url} className="repo-row">
                  <span>{repo.url}<small>{repo.detail}</small></span>
                  <Pill tone={repo.status === "online" ? "good" : repo.status === "degraded" ? "warn" : "bad"}>{repo.status}</Pill>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
