export function desktopShellContract() {
  return {
    shell: "Electron or Tauri",
    status: "contract-ready",
    localService: {
      startup: "spawn bundled LegacyDock local API before loading console",
      healthUrl: "http://127.0.0.1:4317/api/status",
      shutdown: "terminate child process when the app exits",
      portPolicy: "use 4317 by default; retry with an available local port and pass it to console.html?api="
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
