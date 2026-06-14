export function createSnapshot(device, repositories, packages) {
  const stamp = new Date().toISOString();
  const packageIds = packages
    .filter((pkg) => device.installedPackages.includes(pkg.id))
    .map((pkg) => pkg.id);
  const repositoryIds = repositories
    .filter((repo) => device.repositories.includes(repo.id))
    .map((repo) => repo.id);

  return {
    id: `snap-${device.id}-${Date.now()}`,
    title: `${device.name} working set`,
    createdAt: stamp,
    deviceId: device.id,
    packageIds,
    repositoryIds,
    state: "verified",
    hash: `local:${device.identifier}:${packageIds.length}:${repositoryIds.length}:${stamp}`
  };
}

export function diffSnapshots(left, right) {
  const leftPackages = new Set(left.packageIds);
  const rightPackages = new Set(right.packageIds);
  const added = [...rightPackages].filter((id) => !leftPackages.has(id));
  const removed = [...leftPackages].filter((id) => !rightPackages.has(id));

  return {
    added,
    removed,
    unchanged: [...rightPackages].filter((id) => leftPackages.has(id))
  };
}
