export function desktopShellContract() {
  return {
    shell: "Tauri",
    frontend: "React + Vite + Tailwind",
    nativeLayer: "Rust",
    status: "contract-ready",
    localService: {
      startup: "Tauri initializes Rust commands directly and can optionally spawn the Node local API during migration.",
      healthUrl: "tauri://localhost/invoke",
      shutdown: "Rust resources close when the Tauri process exits.",
      portPolicy: "no local HTTP port is required for native commands; keep 4317 only for the existing web console bridge."
    },
    menus: [
      { label: "LegacyDock", items: ["About", "Check for Updates", "Quit"] },
      { label: "Device", items: ["Discover Devices", "Run Device Doctor", "Capture Snapshot", "Export Report"] },
      { label: "Help", items: ["Documentation", "GitHub", "Community Resources"] }
    ],
    tray: {
      enabled: true,
      items: ["Open LegacyDock", "API Status", "Quit"],
      notifications: ["device detected", "snapshot complete", "repository degraded"]
    },
    permissions: {
      filesystem: "workspace directory and explicit export destinations only",
      network: "local API plus user-triggered repository checks",
      credentials: "never persist raw SSH passwords or private keys"
    },
    updater: {
      channels: ["dev", "beta", "stable"],
      requiresSignedArtifacts: true,
      userVisibleReleaseNotes: true
    }
  };
}
