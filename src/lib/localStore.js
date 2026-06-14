const KEY = "legacydock.demo.workspace";

export function loadWorkspace(fallback) {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

export function saveWorkspace(state) {
  localStorage.setItem(KEY, JSON.stringify({
    selectedDeviceId: state.selectedDeviceId,
    snapshots: state.snapshots,
    telemetryEnabled: state.telemetryEnabled
  }));
}
