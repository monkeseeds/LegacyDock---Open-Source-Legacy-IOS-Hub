export const restorationWorkflows = [
  {
    id: "legacy-ios-kit-shsh",
    name: "Save SHSH blobs",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "low",
    families: ["32-bit", "64-bit"],
    summary: "Preserve restore options by collecting onboard or server-available SHSH data before changing the device.",
    steps: [
      "Create a LegacyDock snapshot",
      "Confirm battery and cable stability",
      "Use Legacy iOS Kit as the external SHSH workflow",
      "Attach saved blob metadata to the preservation report"
    ]
  },
  {
    id: "legacy-ios-kit-jailbreak-matrix",
    name: "Jailbreak method lookup",
    source: "Legacy iOS Kit Jailbreaking wiki",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit/wiki/Jailbreaking",
    risk: "medium",
    families: ["32-bit"],
    firmwareRange: ["7.0", "9.3.6"],
    summary: "Use the upstream jailbreak matrix to identify candidate methods for legacy 32-bit firmware without hiding tethered or sideload requirements.",
    steps: [
      "Read the upstream method notes",
      "Check whether sideloading, Safari, or PC/Mac execution is required",
      "Record tethered or semi-tethered constraints",
      "Keep LegacyDock as the documentation and recovery layer"
    ]
  },
  {
    id: "legacy-ios-kit-ota-downgrade",
    name: "OTA restore or downgrade research",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    chips: ["A5", "A6"],
    summary: "Check whether the device has a signed OTA target, saved blobs, or a supported restore path before any destructive action.",
    steps: [
      "Export a preservation report",
      "Confirm exact model identifier",
      "Check signed OTA and blob requirements",
      "Do not proceed without a recovery plan"
    ]
  },
  {
    id: "legacy-ios-kit-ssh-ramdisk",
    name: "SSH ramdisk repair planning",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    families: ["32-bit", "64-bit"],
    summary: "Plan advanced recovery or data extraction through an external ramdisk workflow when ordinary AFC/SSH access is unavailable.",
    steps: [
      "Snapshot known package state",
      "Confirm device support upstream",
      "Use read-only recovery goals first",
      "Document every mutation in repair history"
    ]
  }
];
