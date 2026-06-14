function parseVersion(version) {
  return String(version)
    .split(".")
    .map((part) => Number(part.padEnd(2, "0")))
    .reduce((total, part, index) => total + part / Math.pow(100, index), 0);
}

function inFirmwareRange(firmware, range) {
  const current = parseVersion(firmware);
  return current >= parseVersion(range[0]) && current <= parseVersion(range[1]);
}

export function deviceArchitecture(device) {
  return ["A4", "A5", "A6"].includes(device.chip) ? "32-bit" : "64-bit";
}

export function workflowMatchesDevice(device, workflow) {
  const family = deviceArchitecture(device);
  const familyOk = !workflow.families || workflow.families.includes(family);
  const chipOk = !workflow.chips || workflow.chips.includes(device.chip);
  const firmwareOk = !workflow.firmwareRange || inFirmwareRange(device.firmware, workflow.firmwareRange);
  return (familyOk || chipOk) && firmwareOk;
}

export function adviseRestoration(device, workflows) {
  return workflows.map((workflow) => {
    const match = workflowMatchesDevice(device, workflow);
    return {
      ...workflow,
      match,
      recommendation: match ? "Relevant" : "Research only",
      reason: match
        ? `${device.name} (${device.identifier}, ${device.chip}, ${device.os} ${device.firmware}) fits this workflow's current research rules.`
        : `${device.name} does not fully match the current local rule, but the upstream guide may still be useful for adjacent research.`
    };
  });
}
