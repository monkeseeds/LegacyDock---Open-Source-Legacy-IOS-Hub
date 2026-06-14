export function buildPreservationReport(device, repositories, packages, snapshot) {
  const selectedRepos = repositories.filter((repo) => device.repositories.includes(repo.id));
  const selectedPackages = packages.filter((pkg) => device.installedPackages.includes(pkg.id));

  return {
    schema: "legacydock.preservation-report.v1",
    generatedAt: new Date().toISOString(),
    device: {
      name: device.name,
      identifier: device.identifier,
      chip: device.chip,
      firmware: `${device.os} ${device.firmware}`,
      jailbreak: device.jailbreak,
      packageManager: device.manager,
      batteryHealth: device.batteryHealth,
      notes: device.notes
    },
    repositories: selectedRepos.map((repo) => ({
      name: repo.name,
      url: repo.url,
      status: repo.status,
      packageIndexHash: repo.packageIndexHash
    })),
    packages: selectedPackages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      version: pkg.version,
      repository: pkg.repository,
      dependencies: pkg.dependencies
    })),
    snapshot: snapshot ? {
      id: snapshot.id,
      title: snapshot.title,
      createdAt: snapshot.createdAt,
      hash: snapshot.hash
    } : null
  };
}

export function downloadReport(report) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `legacydock-${report.device.identifier}-preservation-report.json`;
  link.click();
  URL.revokeObjectURL(url);
}
