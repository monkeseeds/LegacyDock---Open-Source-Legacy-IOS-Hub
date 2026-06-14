export const devices = [
  {
    id: "iphone4-black-32",
    name: "iPhone 4",
    identifier: "iPhone3,1",
    chip: "A4",
    firmware: "7.1.2",
    os: "iOS",
    jailbreak: "p0sixspwn",
    manager: "Cydia",
    packageCount: 43,
    repositoryCount: 7,
    storageUsed: 68,
    memoryPressure: 54,
    batteryHealth: 82,
    status: "stable",
    services: ["AFC", "SSH", "Lockdown"],
    installedPackages: ["winterboard", "icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"],
    repositories: ["bigboss", "cydia-telesphoreo", "modmyi-archive", "legacy-archive"],
    notes: "Collector unit with stable Cydia environment and clean baseline snapshot."
  },
  {
    id: "ipad2-wifi-16",
    name: "iPad 2",
    identifier: "iPad2,1",
    chip: "A5",
    firmware: "9.3.5",
    os: "iOS",
    jailbreak: "Phoenix",
    manager: "Cydia",
    packageCount: 31,
    repositoryCount: 5,
    storageUsed: 82,
    memoryPressure: 71,
    batteryHealth: 74,
    status: "attention",
    services: ["AFC", "Lockdown"],
    installedPackages: ["icleaner-pro", "batterylife", "filza", "preferenceloader"],
    repositories: ["bigboss", "legacy-archive", "legacy-archive-mirror", "cydia-telesphoreo"],
    notes: "Needs repository cleanup and dependency review before more tweaks are installed."
  },
  {
    id: "iphone5-white-64",
    name: "iPhone 5",
    identifier: "iPhone5,2",
    chip: "A6",
    firmware: "8.4.1",
    os: "iOS",
    jailbreak: "EtasonJB",
    manager: "Cydia",
    packageCount: 57,
    repositoryCount: 9,
    storageUsed: 49,
    memoryPressure: 46,
    batteryHealth: 91,
    status: "stable",
    services: ["AFC", "SSH", "Lockdown"],
    installedPackages: ["winterboard", "activator", "icleaner-pro", "noslowanimations", "openssh"],
    repositories: ["bigboss", "chariz-legacy", "modmyi-archive", "cydia-telesphoreo"],
    notes: "Primary testing device for theme and performance package compatibility."
  }
];

export const repositories = [
  {
    id: "bigboss",
    name: "BigBoss",
    url: "http://apt.thebigboss.org/repofiles/cydia/",
    status: "verified",
    lastRefreshDays: 2,
    trust: 98,
    packageIndexHash: "sha256:bb4c-local-fixture",
    tags: ["core", "legacy"]
  },
  {
    id: "cydia-telesphoreo",
    name: "Cydia/Telesphoreo",
    url: "http://apt.saurik.com/",
    status: "verified",
    lastRefreshDays: 5,
    trust: 96,
    packageIndexHash: "sha256:ct7-local-fixture",
    tags: ["core"]
  },
  {
    id: "modmyi-archive",
    name: "ModMyi Archive",
    url: "http://apt.modmyi.com/",
    status: "slow",
    lastRefreshDays: 42,
    trust: 76,
    packageIndexHash: "sha256:mm1-local-fixture",
    tags: ["archive"]
  },
  {
    id: "legacy-archive",
    name: "Legacy Archive",
    url: "https://legacy.example/archive",
    status: "duplicate-risk",
    lastRefreshDays: 8,
    trust: 84,
    packageIndexHash: "sha256:la9-local-fixture",
    tags: ["archive", "community"]
  },
  {
    id: "legacy-archive-mirror",
    name: "Legacy Archive Mirror",
    url: "https://mirror.legacy.example/archive",
    status: "duplicate-risk",
    lastRefreshDays: 8,
    trust: 80,
    packageIndexHash: "sha256:la9-local-fixture",
    tags: ["archive", "mirror"]
  },
  {
    id: "chariz-legacy",
    name: "Chariz Legacy",
    url: "https://repo.chariz.com/",
    status: "verified",
    lastRefreshDays: 4,
    trust: 91,
    packageIndexHash: "sha256:cz6-local-fixture",
    tags: ["marketplace"]
  }
];

export const packages = [
  {
    id: "winterboard",
    name: "WinterBoard",
    category: "theme",
    version: "0.9.3919",
    repository: "bigboss",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"],
    dependencies: ["mobilesubstrate", "preferenceloader"],
    conflicts: ["iconomatic"],
    rating: 4.8,
    communitySuccess: 99,
    risk: "low",
    batteryImpact: "minimal",
    performanceImpact: "light",
    summary: "Classic theming engine with strong legacy device support.",
    notes: "Known conflict with IconOmatic on some iOS 7 setups."
  },
  {
    id: "icleaner-pro",
    name: "iCleaner Pro",
    category: "repair",
    version: "7.7.5",
    repository: "bigboss",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"],
    dependencies: ["apt7-lib"],
    conflicts: [],
    rating: 4.9,
    communitySuccess: 98,
    risk: "low",
    batteryImpact: "positive",
    performanceImpact: "positive",
    summary: "Removes cache waste and stale package data.",
    notes: "Create a snapshot before deep preference cleanup."
  },
  {
    id: "activator",
    name: "Activator",
    category: "safe",
    version: "1.9.13",
    repository: "bigboss",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone3,1", "iPhone5,2"],
    dependencies: ["mobilesubstrate", "flipswitch"],
    conflicts: ["springtomize-old"],
    rating: 4.7,
    communitySuccess: 94,
    risk: "medium",
    batteryImpact: "small",
    performanceImpact: "small",
    summary: "Gesture and shortcut automation for legacy iOS.",
    notes: "Some iOS 9 builds report springboard restarts."
  },
  {
    id: "noslowanimations",
    name: "NoSlowAnimations",
    category: "safe",
    version: "4.2.1",
    repository: "chariz-legacy",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"],
    dependencies: ["mobilesubstrate"],
    conflicts: [],
    rating: 4.6,
    communitySuccess: 97,
    risk: "low",
    batteryImpact: "neutral",
    performanceImpact: "positive",
    summary: "Reduces animation delays across older devices.",
    notes: "Best paired with conservative animation values."
  },
  {
    id: "openssh",
    name: "OpenSSH",
    category: "repair",
    version: "6.7p1",
    repository: "cydia-telesphoreo",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"],
    dependencies: ["openssl", "berkeleydb"],
    conflicts: [],
    rating: 4.5,
    communitySuccess: 96,
    risk: "medium",
    batteryImpact: "background service",
    performanceImpact: "light",
    summary: "Secure shell access for repairs, backups, and diagnostics.",
    notes: "Change the default password immediately after install."
  },
  {
    id: "batterylife",
    name: "BatteryLife",
    category: "diagnostic",
    version: "1.6.10",
    repository: "bigboss",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone5,2", "iPad2,1"],
    dependencies: ["preferenceloader"],
    conflicts: [],
    rating: 4.4,
    communitySuccess: 93,
    risk: "low",
    batteryImpact: "neutral",
    performanceImpact: "light",
    summary: "Displays battery diagnostics and cycle health.",
    notes: "Useful for repair shop intake and collector records."
  },
  {
    id: "filza",
    name: "Filza File Manager",
    category: "repair",
    version: "3.5.2",
    repository: "bigboss",
    firmwareRange: ["6.0", "9.3.6"],
    devices: ["iPhone5,2", "iPad2,1"],
    dependencies: ["zip", "unzip", "coreutils"],
    conflicts: [],
    rating: 4.6,
    communitySuccess: 92,
    risk: "medium",
    batteryImpact: "neutral",
    performanceImpact: "light",
    summary: "On-device file manager for advanced repairs.",
    notes: "Powerful tool. LegacyDock should warn before destructive file edits."
  }
];

export const compatibilityRules = [
  {
    id: "firmware-range",
    label: "Firmware range",
    severity: "blocking",
    description: "Package firmware range must include the connected device firmware."
  },
  {
    id: "device-support",
    label: "Device support",
    severity: "blocking",
    description: "Package metadata must include the device identifier or a compatible family."
  },
  {
    id: "dependency-presence",
    label: "Dependency presence",
    severity: "warning",
    description: "Missing dependencies must be installable from verified repositories."
  },
  {
    id: "known-conflicts",
    label: "Known conflicts",
    severity: "warning",
    description: "Installed packages are checked against known conflict reports."
  },
  {
    id: "community-success",
    label: "Community success",
    severity: "advisory",
    description: "Aggregated opt-in success reports influence recommendation confidence."
  }
];

export const snapshots = [
  {
    id: "snap-clean-iphone4",
    title: "Clean jailbreak baseline",
    createdAt: "2026-06-14T21:12:00+08:00",
    deviceId: "iphone4-black-32",
    packageIds: ["icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"],
    repositoryIds: ["bigboss", "cydia-telesphoreo"],
    state: "verified",
    hash: "sha256:legacydock-clean-baseline"
  },
  {
    id: "snap-theme-iphone5",
    title: "Theme pack experiment",
    createdAt: "2026-06-13T18:40:00+08:00",
    deviceId: "iphone5-white-64",
    packageIds: ["winterboard", "activator", "icleaner-pro", "noslowanimations"],
    repositoryIds: ["bigboss", "chariz-legacy", "modmyi-archive"],
    state: "restorable",
    hash: "sha256:legacydock-theme-pack"
  },
  {
    id: "snap-shop-ipad2",
    title: "Repair shop intake",
    createdAt: "2026-06-11T10:25:00+08:00",
    deviceId: "ipad2-wifi-16",
    packageIds: ["icleaner-pro", "batterylife", "filza"],
    repositoryIds: ["bigboss", "legacy-archive", "legacy-archive-mirror"],
    state: "needs-review",
    hash: "sha256:legacydock-shop-intake"
  }
];

export const cloudPlans = [
  {
    name: "Free",
    price: "$0",
    summary: "Unlimited Device Doctor scans, local devices, local snapshots, repository checks, compatibility checks, backups, and offline workflows."
  },
  {
    name: "LegacyDock Care",
    price: "$4.99/mo",
    summary: "Intelligent repair plans, community intelligence, bootloop risk, smart alternatives, modernization guidance, health timeline, cloud sync, and backups."
  },
  {
    name: "Care Yearly",
    price: "$39/yr",
    summary: "All LegacyDock Care intelligence with yearly billing for collectors and active maintainers."
  },
  {
    name: "Studio",
    price: "$15/mo",
    summary: "Repair shop inventory, customer notes, shared backups, team workspaces, and priority support."
  }
];
