export const adapterContracts = [
  {
    id: "libimobiledevice",
    name: "libimobiledevice Adapter",
    status: "planned",
    purpose: "Pairing, lockdown metadata, device identity, battery, storage, and service discovery."
  },
  {
    id: "afc",
    name: "AFC Filesystem Adapter",
    status: "planned",
    purpose: "Read package manager state, preferences, logs, and backup-safe metadata from connected devices."
  },
  {
    id: "ssh",
    name: "OpenSSH Repair Adapter",
    status: "planned",
    purpose: "Optional advanced repair channel for jailbroken devices with explicit user consent."
  },
  {
    id: "package-index",
    name: "Repository Index Adapter",
    status: "mocked",
    purpose: "Parse package indexes, detect stale repositories, duplicates, dependencies, and conflicts."
  },
  {
    id: "archive-discovery",
    name: "Archive Discovery Adapter",
    status: "research",
    purpose: "Explore metadata-only integrations with archival projects such as iOS Obscura Server."
  }
];
