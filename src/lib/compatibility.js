function parseVersion(version) {
  return String(version).split(".").map((part) => Number(part.padEnd(2, "0"))).reduce((total, part, index) => {
    return total + part / Math.pow(100, index);
  }, 0);
}

function inFirmwareRange(firmware, range) {
  const current = parseVersion(firmware);
  return current >= parseVersion(range[0]) && current <= parseVersion(range[1]);
}

export function evaluateCompatibility(device, pkg) {
  const checks = [];
  const firmwareOk = inFirmwareRange(device.firmware, pkg.firmwareRange);
  const deviceOk = pkg.devices.includes(device.identifier);
  const missingDependencies = pkg.dependencies.filter((dependency) => !device.installedPackages.includes(dependency));
  const installedConflicts = pkg.conflicts.filter((conflict) => device.installedPackages.includes(conflict));

  checks.push({
    label: "Firmware",
    state: firmwareOk ? "pass" : "block",
    detail: firmwareOk
      ? `${device.os} ${device.firmware} is inside ${pkg.firmwareRange.join(" to ")}.`
      : `${device.os} ${device.firmware} is outside ${pkg.firmwareRange.join(" to ")}.`
  });

  checks.push({
    label: "Device",
    state: deviceOk ? "pass" : "block",
    detail: deviceOk ? `${device.identifier} is listed as supported.` : `${device.identifier} is not in package metadata.`
  });

  checks.push({
    label: "Dependencies",
    state: missingDependencies.length ? "warn" : "pass",
    detail: missingDependencies.length
      ? `Missing dependencies: ${missingDependencies.join(", ")}.`
      : "All known dependencies are already present."
  });

  checks.push({
    label: "Conflicts",
    state: installedConflicts.length ? "warn" : "pass",
    detail: installedConflicts.length
      ? `Known installed conflicts: ${installedConflicts.join(", ")}.`
      : "No known installed conflicts detected."
  });

  checks.push({
    label: "Community",
    state: pkg.communitySuccess >= 95 ? "pass" : pkg.communitySuccess >= 90 ? "warn" : "block",
    detail: `${pkg.communitySuccess}% opt-in community success rate.`
  });

  const blocked = checks.some((check) => check.state === "block");
  const warnings = checks.filter((check) => check.state === "warn").length;
  const score = Math.max(0, Math.round(pkg.communitySuccess - warnings * 6 - (blocked ? 36 : 0)));

  return {
    supported: !blocked,
    recommendation: blocked ? "Not recommended" : warnings ? "Review first" : "Recommended",
    score,
    checks
  };
}

export function scoreDevice(device, packages) {
  const supportedCount = packages.filter((pkg) => evaluateCompatibility(device, pkg).supported).length;
  const compatibility = Math.round((supportedCount / packages.length) * 100);
  const stability = Math.round(100 - device.memoryPressure * 0.28 - (device.status === "attention" ? 14 : 0));
  const community = Math.round(packages.reduce((sum, pkg) => sum + pkg.communitySuccess, 0) / packages.length);
  const performance = Math.round(100 - device.storageUsed * 0.22 - device.memoryPressure * 0.18);

  return {
    Compatibility: compatibility,
    Stability: Math.max(0, stability),
    Community: community,
    Performance: Math.max(0, performance)
  };
}
