const devices = [
  { id: "iphone4-black-32", name: "iPhone 4", identifier: "iPhone3,1", chip: "A4", firmware: "7.1.2", os: "iOS", jailbreak: "p0sixspwn", manager: "Cydia", packageCount: 43, repositoryCount: 7, storageUsed: 68, memoryPressure: 54, batteryHealth: 82, status: "stable", services: ["AFC", "SSH", "Lockdown"], installedPackages: ["winterboard", "icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"], repositories: ["bigboss", "cydia-telesphoreo", "modmyi-archive", "legacy-archive"], notes: "Collector unit with stable Cydia environment and clean baseline snapshot." },
  { id: "ipad2-wifi-16", name: "iPad 2", identifier: "iPad2,1", chip: "A5", firmware: "9.3.5", os: "iOS", jailbreak: "Phoenix", manager: "Cydia", packageCount: 31, repositoryCount: 5, storageUsed: 82, memoryPressure: 71, batteryHealth: 74, status: "attention", services: ["AFC", "Lockdown"], installedPackages: ["icleaner-pro", "batterylife", "filza", "preferenceloader"], repositories: ["bigboss", "legacy-archive", "legacy-archive-mirror", "cydia-telesphoreo"], notes: "Needs repository cleanup and dependency review before more tweaks are installed." },
  { id: "iphone5-white-64", name: "iPhone 5", identifier: "iPhone5,2", chip: "A6", firmware: "8.4.1", os: "iOS", jailbreak: "EtasonJB", manager: "Cydia", packageCount: 57, repositoryCount: 9, storageUsed: 49, memoryPressure: 46, batteryHealth: 91, status: "stable", services: ["AFC", "SSH", "Lockdown"], installedPackages: ["winterboard", "activator", "icleaner-pro", "noslowanimations", "openssh"], repositories: ["bigboss", "chariz-legacy", "modmyi-archive", "cydia-telesphoreo"], notes: "Primary testing device for theme and performance package compatibility." }
];

const repositories = [
  { id: "bigboss", name: "BigBoss", url: "http://apt.thebigboss.org/repofiles/cydia/", description: "Essential legacy Cydia repository with utilities, UI tweaks, repair tools, and classic packages.", status: "verified", healthStatus: "online", lastRefreshDays: 2, lastHealthCheck: "5 minutes ago", lastSuccessfulPing: "5 minutes ago", httpSupport: true, sslSupport: false, packageCount: 18421, category: "Essential", communityRating: 4.9, verified: true, maintainer: "BigBoss team", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 184, packageIndexHash: "sha256:bb4c-local-fixture", tags: ["core", "legacy"], contains: ["Activator", "iCleaner", "iFile", "RecordMyScreen", "ColoredKnob", "LiveWallpaper"], notes: "Default source for many foundational legacy tweaks. Uses HTTP, which is normal for older Cydia setups." },
  { id: "skyglow", name: "SkyGlow", url: "http://cydia.skyglow.es/", description: "Service restoration source for legacy maps, YouTube, and community repair packages.", status: "verified", healthStatus: "online", lastRefreshDays: 1, lastHealthCheck: "8 minutes ago", lastSuccessfulPing: "8 minutes ago", httpSupport: true, sslSupport: false, packageCount: 42, category: "Service Restoration", communityRating: 4.7, verified: true, maintainer: "SkyGlow community", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 220, packageIndexHash: "sha256:sg2-local-fixture", tags: ["restoration", "services"], contains: ["MapsX", "TubeRepair", "Legacy restoration tweaks"], notes: "Recommended for iOS 6 service restoration experiments. Snapshot before changing service-related packages." },
  { id: "yzu", name: "Yzu", url: "http://yzu.moe/dev/", description: "Applications and preservation utilities for older jailbroken iOS environments.", status: "verified", healthStatus: "degraded", lastRefreshDays: 12, lastHealthCheck: "11 minutes ago", lastSuccessfulPing: "2 hours ago", httpSupport: true, sslSupport: false, packageCount: 18, category: "Applications", communityRating: 4.5, verified: true, maintainer: "Yzu", packageIndexAvailable: true, redirectDetected: true, sslIssue: false, responseMs: 1180, packageIndexHash: "sha256:yzu-local-fixture", tags: ["apps", "preservation"], contains: ["Veteris"], notes: "Useful for application restoration workflows. Marked degraded because responses may be slow or redirected." },
  { id: "galactic-server", name: "Galactic Server", url: "http://repo.galactic-server.info/", description: "Legacy utilities and classic system tools used by older jailbreak setups.", status: "verified", healthStatus: "online", lastRefreshDays: 4, lastHealthCheck: "6 minutes ago", lastSuccessfulPing: "6 minutes ago", httpSupport: true, sslSupport: false, packageCount: 73, category: "Utilities", communityRating: 4.4, verified: true, maintainer: "Galactic Server", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 260, packageIndexHash: "sha256:gs7-local-fixture", tags: ["utilities"], contains: ["SBSettings", "Legacy utilities"], notes: "Good candidate for utility recommendations on iOS 5 and iOS 6 devices." },
  { id: "cydia-telesphoreo", name: "Cydia/Telesphoreo", url: "http://apt.saurik.com/", description: "Core Cydia/Telesphoreo packages and base system dependencies.", status: "verified", healthStatus: "online", lastRefreshDays: 5, lastHealthCheck: "7 minutes ago", lastSuccessfulPing: "7 minutes ago", httpSupport: true, sslSupport: false, packageCount: 692, category: "Essential", communityRating: 4.8, verified: true, maintainer: "SaurikIT", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 210, packageIndexHash: "sha256:ct7-local-fixture", tags: ["core"], contains: ["OpenSSH", "APT", "core libraries"], notes: "Core dependency source. Removing it can break package management." },
  { id: "modmyi-archive", name: "ModMyi Archive", url: "http://apt.modmyi.com/", description: "Historical archive source for packages previously hosted by ModMyi.", status: "slow", healthStatus: "degraded", lastRefreshDays: 42, lastHealthCheck: "14 minutes ago", lastSuccessfulPing: "3 days ago", httpSupport: true, sslSupport: false, packageCount: 9210, category: "Archive", communityRating: 3.8, verified: false, maintainer: "Historical archive", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 2200, packageIndexHash: "sha256:mm1-local-fixture", tags: ["archive"], contains: ["Themes", "legacy tweaks"], notes: "Preserve historical value, but prefer verified mirrors when installs fail." },
  { id: "legacy-archive", name: "Legacy Archive", url: "https://legacy.example/archive", description: "Demo archive source used by LegacyDock for duplicate and mirror detection.", status: "duplicate-risk", healthStatus: "degraded", lastRefreshDays: 8, lastHealthCheck: "12 minutes ago", lastSuccessfulPing: "12 minutes ago", httpSupport: true, sslSupport: true, packageCount: 1800, category: "Archive", communityRating: 4.1, verified: false, maintainer: "Community mirror", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 430, packageIndexHash: "sha256:la9-local-fixture", tags: ["archive", "community"], contains: ["Archived tweaks"], notes: "Demo mirror used to model duplicate repository behavior." },
  { id: "legacy-archive-mirror", name: "Legacy Archive Mirror", url: "https://mirror.legacy.example/archive", description: "Mirror of the Legacy Archive demo source.", status: "duplicate-risk", healthStatus: "degraded", lastRefreshDays: 8, lastHealthCheck: "12 minutes ago", lastSuccessfulPing: "12 minutes ago", httpSupport: true, sslSupport: true, packageCount: 1800, category: "Archive", communityRating: 3.9, verified: false, maintainer: "Community mirror", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 510, packageIndexHash: "sha256:la9-local-fixture", tags: ["archive", "mirror"], contains: ["Archived tweaks"], notes: "Same package index as Legacy Archive. Device Doctor should suggest deduplication." },
  { id: "chariz-legacy", name: "Chariz Legacy", url: "https://repo.chariz.com/", description: "Modern repository with selected legacy-compatible packages and metadata.", status: "verified", healthStatus: "online", lastRefreshDays: 4, lastHealthCheck: "9 minutes ago", lastSuccessfulPing: "9 minutes ago", httpSupport: true, sslSupport: true, packageCount: 320, category: "Marketplace", communityRating: 4.6, verified: true, maintainer: "Chariz", packageIndexAvailable: true, redirectDetected: false, sslIssue: false, responseMs: 170, packageIndexHash: "sha256:cz6-local-fixture", tags: ["marketplace"], contains: ["NoSlowAnimations"], notes: "Useful for newer package metadata, but always verify legacy firmware support." }
];

const iosCompatibilityVersions = [
  "6.0", "6.0.1", "6.0.2", "6.1", "6.1.1", "6.1.2", "6.1.3", "6.1.4", "6.1.5", "6.1.6",
  "7.0", "7.0.1", "7.0.2", "7.0.3", "7.0.4", "7.0.5", "7.0.6", "7.1", "7.1.1", "7.1.2",
  "8.0", "8.0.1", "8.0.2", "8.1", "8.1.1", "8.1.2", "8.1.3", "8.2", "8.3", "8.4", "8.4.1",
  "9.0", "9.0.1", "9.0.2", "9.1", "9.2", "9.2.1", "9.3", "9.3.1", "9.3.2", "9.3.3", "9.3.4", "9.3.5", "9.3.6"
];

const packages = [
  { id: "winterboard", name: "WinterBoard", category: "theme", version: "0.9.3919", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate", "preferenceloader"], conflicts: ["iconomatic"], rating: 4.8, communitySuccess: 99, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Classic theming engine with strong legacy device support.", notes: "Known conflict with IconOmatic on some iOS 7 setups." },
  { id: "icleaner-pro", name: "iCleaner Pro", category: "repair", version: "7.7.5", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["apt7-lib"], conflicts: [], rating: 4.9, communitySuccess: 98, risk: "low", batteryImpact: "positive", performanceImpact: "positive", summary: "Removes cache waste and stale package data.", notes: "Create a snapshot before deep preference cleanup." },
  { id: "activator", name: "Activator", category: "safe", version: "1.9.13", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2"], dependencies: ["mobilesubstrate", "flipswitch"], conflicts: ["springtomize-old"], rating: 4.7, communitySuccess: 94, risk: "medium", batteryImpact: "small", performanceImpact: "small", summary: "Gesture and shortcut automation for legacy iOS.", notes: "Some iOS 9 builds report springboard restarts." },
  { id: "noslowanimations", name: "NoSlowAnimations", category: "safe", version: "4.2.1", repository: "chariz-legacy", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.6, communitySuccess: 97, risk: "low", batteryImpact: "neutral", performanceImpact: "positive", summary: "Reduces animation delays across older devices.", notes: "Best paired with conservative animation values." },
  { id: "openssh", name: "OpenSSH", category: "repair", version: "6.7p1", repository: "cydia-telesphoreo", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["openssl", "berkeleydb"], conflicts: [], rating: 4.5, communitySuccess: 96, risk: "medium", batteryImpact: "background service", performanceImpact: "light", summary: "Secure shell access for repairs, backups, and diagnostics.", notes: "Change the default password immediately after install." },
  { id: "batterylife", name: "BatteryLife", category: "diagnostic", version: "1.6.10", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["preferenceloader"], conflicts: [], rating: 4.4, communitySuccess: 93, risk: "low", batteryImpact: "neutral", performanceImpact: "light", summary: "Displays battery diagnostics and cycle health.", notes: "Useful for repair shop intake and collector records." },
  { id: "filza", name: "Filza File Manager", category: "repair", version: "3.5.2", repository: "bigboss", firmwareRange: ["6.0", "9.3.6"], devices: ["iPhone5,2", "iPad2,1"], dependencies: ["zip", "unzip", "coreutils"], conflicts: [], rating: 4.6, communitySuccess: 92, risk: "medium", batteryImpact: "neutral", performanceImpact: "light", summary: "On-device file manager for advanced repairs.", notes: "Powerful tool. LegacyDock should warn before destructive file edits." },
  { id: "ifile", name: "iFile", category: "utility", version: "2.2.0", repository: "bigboss", firmwareRange: ["3.0", "9.3.6"], devices: ["iPhone3,1", "iPhone5,2", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.7, communitySuccess: 96, risk: "medium", batteryImpact: "neutral", performanceImpact: "light", summary: "Classic on-device file manager for legacy jailbreak maintenance.", notes: "Use carefully. File edits can break SpringBoard or package manager state.", developer: "Carsten Heinelt", lastUpdated: "2015-09-21", screenshot: "File browser preview", verifiedStatus: "Verified Working", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "recordmyscreen", name: "RecordMyScreen", category: "recording", version: "1.3.0", repository: "bigboss", firmwareRange: ["5.0", "7.1.2"], devices: ["iPhone3,1", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.2, communitySuccess: 89, risk: "medium", batteryImpact: "high while recording", performanceImpact: "moderate", summary: "Screen recording utility for older iOS devices.", notes: "Performance varies by device. Avoid long recordings on low-storage devices.", developer: "CoolStar", lastUpdated: "2014-03-20", screenshot: "Recorder controls preview", verifiedStatus: "Partial", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "coloredknob", name: "ColoredKnob", category: "ui", version: "1.5", repository: "bigboss", firmwareRange: ["5.0", "7.1.2"], devices: ["iPhone3,1", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.1, communitySuccess: 91, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Lock screen slider customization for classic iOS releases.", notes: "Cosmetic tweak. Snapshot recommended when stacking lock screen modifications.", developer: "Legacy community", lastUpdated: "2013-12-12", screenshot: "Slider color preview", verifiedStatus: "Verified Working", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "livewallpaper", name: "LiveWallpaper", category: "ui", version: "2.1", repository: "bigboss", firmwareRange: ["5.0", "7.1.2"], devices: ["iPhone3,1", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: ["winterboard-heavy-theme"], rating: 4.0, communitySuccess: 86, risk: "medium", batteryImpact: "moderate", performanceImpact: "moderate", summary: "Animated wallpaper support for legacy devices.", notes: "Can reduce battery life and frame rate on A4/A5 devices.", developer: "Legacy community", lastUpdated: "2014-05-06", screenshot: "Animated wallpaper preview", verifiedStatus: "Partial", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "mapsx", name: "MapsX", category: "restoration", version: "1.0.4", repository: "skyglow", firmwareRange: ["6.0", "6.1.6"], devices: ["iPhone3,1", "iPad2,1"], dependencies: [], conflicts: [], rating: 4.8, communitySuccess: 95, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Maps service restoration tweak for iOS 6-era devices.", notes: "Requires the SkyGlow repository. Service behavior may vary by region.", developer: "SkyGlow community", lastUpdated: "2025-11-18", screenshot: "Maps restoration preview", verifiedStatus: "Verified Working", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "tuberepair", name: "TubeRepair", category: "restoration", version: "2.0.1", repository: "skyglow", firmwareRange: ["5.0", "7.1.2"], devices: ["iPhone3,1", "iPad2,1"], dependencies: [], conflicts: [], rating: 4.7, communitySuccess: 94, risk: "medium", batteryImpact: "minimal", performanceImpact: "light", summary: "YouTube playback restoration helper for older iOS builds.", notes: "Requires compatible service endpoint configuration.", developer: "SkyGlow community", lastUpdated: "2025-12-02", screenshot: "YouTube restoration preview", verifiedStatus: "Partial", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "veteris", name: "Veteris", category: "applications", version: "1.7.2", repository: "yzu", firmwareRange: ["5.0", "6.1.6"], devices: ["iPhone3,1", "iPad2,1"], dependencies: [], conflicts: [], rating: 4.8, communitySuccess: 96, risk: "low", batteryImpact: "minimal", performanceImpact: "light", summary: "Legacy app discovery and installation companion for preserved devices.", notes: "Requires Yzu repo. LegacyDock should treat all app acquisition as user-controlled and license-respecting.", developer: "Yzu", lastUpdated: "2024-08-12", screenshot: "Application catalog preview", verifiedStatus: "Verified Working", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" },
  { id: "sbsettings", name: "SBSettings", category: "utility", version: "6.0.5", repository: "galactic-server", firmwareRange: ["3.0", "6.1.6"], devices: ["iPhone3,1", "iPad2,1"], dependencies: ["mobilesubstrate"], conflicts: [], rating: 4.6, communitySuccess: 95, risk: "medium", batteryImpact: "small", performanceImpact: "light", summary: "Classic quick-toggle panel for legacy iOS.", notes: "Recommended on iOS 5 and 6. Less useful on newer Control Center-era firmware.", developer: "BigBoss / legacy community", lastUpdated: "2013-09-09", screenshot: "Toggle drawer preview", verifiedStatus: "Verified Working", lastVerified: "2026-06-15", testedIos: "iOS 6.1.3", testedDevice: "iPhone 4", contributor: "LegacyDock fixture" }
];

const essentialTweaks = [
  { group: "Utilities", ids: ["activator", "icleaner-pro", "ifile", "sbsettings"] },
  { group: "Recording", ids: ["recordmyscreen"] },
  { group: "UI", ids: ["coloredknob", "livewallpaper"] },
  { group: "Restoration", ids: ["mapsx", "tuberepair"] },
  { group: "Applications", ids: ["veteris"] }
];

const serviceCatalog = [
  { name: "TubeRepair", status: "Partial", description: "Restores YouTube playback paths on selected legacy iOS builds.", requiredRepo: "skyglow", supported: ["iOS 5", "iOS 6", "iOS 7"], limitations: "Endpoint availability and app version support can change.", guide: "Add SkyGlow, install TubeRepair, configure the service endpoint, then test playback." },
  { name: "MapsX", status: "Verified Working", description: "Restores Maps behavior for iOS 6 devices where legacy services are broken.", requiredRepo: "skyglow", supported: ["iOS 6"], limitations: "Regional behavior may vary.", guide: "Add SkyGlow, install MapsX, reboot, then test Maps search and routing." },
  { name: "Weather restoration", status: "Experimental", description: "Community-maintained fixes for older Weather endpoints.", requiredRepo: "community resource", supported: ["iOS 5", "iOS 6"], limitations: "Often endpoint-specific and may need manual configuration.", guide: "Review community notes before installing any profile or tweak." },
  { name: "iTunes Store restoration", status: "Needs Fix", description: "Research area for legacy storefront connectivity and certificates.", requiredRepo: "none", supported: ["iOS 5", "iOS 6"], limitations: "Server-side Apple behavior may be unavailable.", guide: "Use preservation reports and certificate checks before attempting fixes." },
  { name: "App Store restoration", status: "Experimental", description: "Tracks community attempts to improve old App Store compatibility.", requiredRepo: "Yzu / community resources", supported: ["iOS 5", "iOS 6"], limitations: "Do not bypass licensing or redistribute paid apps.", guide: "Use license-respecting archives and user-owned purchase history only." },
  { name: "Push notification restoration", status: "Partial", description: "Research and device-specific fixes for legacy push behavior.", requiredRepo: "community resource", supported: ["iOS 6", "iOS 7"], limitations: "Depends on certificates, activation state, and server behavior.", guide: "Snapshot first, then test with one known-good app." },
  { name: "Siri restoration", status: "Experimental", description: "Historical research for devices and firmware where Siri behavior can be restored.", requiredRepo: "community resource", supported: ["iOS 6", "iOS 7"], limitations: "Only applicable to some devices and may depend on unsupported services.", guide: "Treat as research. Do not install unknown certificates without review." },
  { name: "Game Center restoration", status: "Needs Fix", description: "Tracks old Game Center service status and compatibility notes.", requiredRepo: "none", supported: ["iOS 5", "iOS 6"], limitations: "Server-side support may be unavailable.", guide: "Document status in the preservation report." },
  { name: "YouTube restoration", status: "Partial", description: "Service restoration for older YouTube clients and web fallbacks.", requiredRepo: "skyglow", supported: ["iOS 5", "iOS 6", "iOS 7"], limitations: "Playback support changes with upstream endpoints.", guide: "Start with TubeRepair and keep a rollback snapshot." }
];

const deadRepositoryArchive = [
  { name: "ModMyi", originalUrl: "http://apt.modmyi.com/", state: "Archive available", mirror: "Historical mirrors vary", recovery: "Prefer archived package lists and verify hashes before install." },
  { name: "ZodTTD/MacCiti", originalUrl: "http://cydia.zodttd.com/repo/cydia/", state: "Completely lost", mirror: "No maintained official mirror in this fixture", recovery: "Use historical metadata only unless a trusted mirror is confirmed." },
  { name: "Legacy Archive Demo", originalUrl: "https://legacy.example/archive", state: "Mirror available", mirror: "https://mirror.legacy.example/archive", recovery: "Device Doctor should remove one duplicate source." }
];

const communityResources = [
  { name: "r/LegacyJailbreak", type: "Reddit", url: "https://www.reddit.com/r/LegacyJailbreak/", note: "Large community for device-specific legacy jailbreak help and restoration notes." },
  { name: "iPhoneOS Obscura", type: "Discord / community", url: "https://github.com/CatsLover2006/iOSobscuraServer", note: "Useful prior art for legacy iOS archival metadata and search concepts." },
  { name: "iPhoneOS Obscura Archive", type: "Archive", url: "https://github.com/CatsLover2006/iOSobscuraServer", note: "Reference point for metadata-first archive discovery. Respect licensing and copyright boundaries." },
  { name: "Legacy iOS Kit", type: "Guide / toolkit", url: "https://github.com/LukeZGD/Legacy-iOS-Kit", note: "Restore, downgrade, SHSH, jailbreak, and ramdisk workflow reference." },
  { name: "Legacy iOS Kit Jailbreaking Wiki", type: "Guide", url: "https://github.com/LukeZGD/Legacy-iOS-Kit/wiki/Jailbreaking", note: "Useful compatibility matrix for jailbreak method research." }
];

const seedSnapshots = [
  { id: "snap-clean-iphone4", title: "Clean jailbreak baseline", createdAt: "2026-06-14T21:12:00+08:00", deviceId: "iphone4-black-32", packageIds: ["icleaner-pro", "openssh", "preferenceloader", "mobilesubstrate"], repositoryIds: ["bigboss", "cydia-telesphoreo"], state: "verified", hash: "sha256:legacydock-clean-baseline" },
  { id: "snap-theme-iphone5", title: "Theme pack experiment", createdAt: "2026-06-13T18:40:00+08:00", deviceId: "iphone5-white-64", packageIds: ["winterboard", "activator", "icleaner-pro", "noslowanimations"], repositoryIds: ["bigboss", "chariz-legacy", "modmyi-archive"], state: "restorable", hash: "sha256:legacydock-theme-pack" },
  { id: "snap-shop-ipad2", title: "Repair shop intake", createdAt: "2026-06-11T10:25:00+08:00", deviceId: "ipad2-wifi-16", packageIds: ["icleaner-pro", "batterylife", "filza"], repositoryIds: ["bigboss", "legacy-archive", "legacy-archive-mirror"], state: "needs-review", hash: "sha256:legacydock-shop-intake" }
];

const cloudPlans = [
  { name: "Free", price: "$0", summary: "Unlimited Device Doctor scans, local snapshots, repository checks, compatibility checks, backups, and offline workflows." },
  { name: "LegacyDock Care", price: "$4.99/mo", summary: "Intelligent repair plans, community intelligence, bootloop risk, smart alternatives, modernization guidance, health timeline, cloud sync, and backups." },
  { name: "Care Yearly", price: "$39/yr", summary: "All LegacyDock Care intelligence with yearly billing for collectors and active maintainers." },
  { name: "Studio", price: "$15/mo", summary: "Repair shop inventory, customer notes, shared backups, team workspaces, and priority support." }
];

const restorationWorkflows = [
  {
    id: "legacy-ios-kit-shsh",
    name: "Save SHSH blobs",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "low",
    families: ["32-bit", "64-bit"],
    summary: "Preserve restore options by collecting onboard or server-available SHSH data before changing the device.",
    steps: ["Create a LegacyDock snapshot", "Confirm battery and cable stability", "Use Legacy iOS Kit as the external SHSH workflow", "Attach saved blob metadata to the preservation report"]
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
    steps: ["Read the upstream method notes", "Check whether sideloading, Safari, or PC/Mac execution is required", "Record tethered or semi-tethered constraints", "Keep LegacyDock as the documentation and recovery layer"]
  },
  {
    id: "legacy-ios-kit-ota-downgrade",
    name: "OTA restore or downgrade research",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    chips: ["A5", "A6"],
    summary: "Check whether the device has a signed OTA target, saved blobs, or a supported restore path before any destructive action.",
    steps: ["Export a preservation report", "Confirm exact model identifier", "Check signed OTA and blob requirements", "Do not proceed without a recovery plan"]
  },
  {
    id: "legacy-ios-kit-ssh-ramdisk",
    name: "SSH ramdisk repair planning",
    source: "Legacy iOS Kit",
    sourceUrl: "https://github.com/LukeZGD/Legacy-iOS-Kit",
    risk: "high",
    families: ["32-bit", "64-bit"],
    summary: "Plan advanced recovery or data extraction through an external ramdisk workflow when ordinary AFC/SSH access is unavailable.",
    steps: ["Snapshot known package state", "Confirm device support upstream", "Use read-only recovery goals first", "Document every mutation in repair history"]
  }
];

function parseVersion(version) {
  return String(version).split(".").map((part) => Number(part.padEnd(2, "0"))).reduce((total, part, index) => total + part / Math.pow(100, index), 0);
}

function inFirmwareRange(firmware, range) {
  const current = parseVersion(firmware);
  return current >= parseVersion(range[0]) && current <= parseVersion(range[1]);
}

function compatibleVersionsForRange(range) {
  return iosCompatibilityVersions.filter((version) => inFirmwareRange(version, range));
}

function platformSupportsFirmware(firmware) {
  return iosCompatibilityVersions.includes(firmware);
}

function evaluateCompatibility(device, pkg) {
  const catalogOk = platformSupportsFirmware(device.firmware);
  const firmwareOk = inFirmwareRange(device.firmware, pkg.firmwareRange);
  const deviceOk = pkg.devices.includes(device.identifier);
  const missingDependencies = pkg.dependencies.filter((dependency) => !device.installedPackages.includes(dependency));
  const installedConflicts = pkg.conflicts.filter((conflict) => device.installedPackages.includes(conflict));
  const checks = [
    { label: "Platform catalog", state: catalogOk ? "pass" : "block", detail: catalogOk ? `${device.os} ${device.firmware} is in the LegacyDock iOS 6.x.x-9.x.x catalog.` : `${device.os} ${device.firmware} is outside the current LegacyDock catalog.` },
    { label: "Firmware", state: firmwareOk ? "pass" : "block", detail: firmwareOk ? `${device.os} ${device.firmware} is inside ${pkg.firmwareRange.join(" to ")}.` : `${device.os} ${device.firmware} is outside ${pkg.firmwareRange.join(" to ")}.` },
    { label: "Device", state: deviceOk ? "pass" : "block", detail: deviceOk ? `${device.identifier} is listed as supported.` : `${device.identifier} is not in package metadata.` },
    { label: "Dependencies", state: missingDependencies.length ? "warn" : "pass", detail: missingDependencies.length ? `Missing dependencies: ${missingDependencies.join(", ")}.` : "All known dependencies are already present." },
    { label: "Conflicts", state: installedConflicts.length ? "warn" : "pass", detail: installedConflicts.length ? `Known installed conflicts: ${installedConflicts.join(", ")}.` : "No known installed conflicts detected." },
    { label: "Community", state: pkg.communitySuccess >= 95 ? "pass" : pkg.communitySuccess >= 90 ? "warn" : "block", detail: `${pkg.communitySuccess}% opt-in community success rate.` }
  ];
  const blocked = checks.some((check) => check.state === "block");
  const warnings = checks.filter((check) => check.state === "warn").length;
  const score = Math.max(0, Math.round(pkg.communitySuccess - warnings * 6 - (blocked ? 36 : 0)));
  return { supported: !blocked, recommendation: blocked ? "Not recommended" : warnings ? "Review first" : "Recommended", score, checks };
}

function packageIcon(pkg) {
  const paths = {
    theme: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" d="M24 7 41 17v14L24 41 7 31V17L24 7Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="m8 17 16 10 16-10M24 27v13"/><circle cx="24" cy="17" r="4" fill="currentColor"/>',
    repair: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M18 8h12l2 10H16l2-10ZM14 18h20l5 22H9l5-22Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M17 28h14M19 35h10"/>',
    safe: '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M12 25 21 34 37 15"/><path fill="none" stroke="currentColor" stroke-width="3" d="M24 43a19 19 0 1 0 0-38 19 19 0 0 0 0 38Z"/>',
    diagnostic: '<rect x="7" y="17" width="31" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="3"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M41 22v6M14 25h7M25 25h5"/>'
  };
  const fallback = '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" d="M14 6h14l8 8v28H14V6Z"/><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" d="M27 7v9h8M20 25h12M20 32h8"/>';
  return `<svg viewBox="0 0 48 48" aria-hidden="true">${paths[pkg.category] || fallback}</svg>`;
}

function scoreDevice(device, packageList) {
  const supportedCount = packageList.filter((pkg) => evaluateCompatibility(device, pkg).supported).length;
  return {
    Compatibility: Math.round((supportedCount / packageList.length) * 100),
    Stability: Math.max(0, Math.round(100 - device.memoryPressure * 0.28 - (device.status === "attention" ? 14 : 0))),
    Community: Math.round(packageList.reduce((sum, pkg) => sum + pkg.communitySuccess, 0) / packageList.length),
    Performance: Math.max(0, Math.round(100 - device.storageUsed * 0.22 - device.memoryPressure * 0.18))
  };
}

function deviceArchitecture(device) {
  return ["A4", "A5", "A6"].includes(device.chip) ? "32-bit" : "64-bit";
}

function workflowMatchesDevice(device, workflow) {
  const family = deviceArchitecture(device);
  const familyOk = !workflow.families || workflow.families.includes(family);
  const chipOk = !workflow.chips || workflow.chips.includes(device.chip);
  const firmwareOk = !workflow.firmwareRange || inFirmwareRange(device.firmware, workflow.firmwareRange);
  return (familyOk || chipOk) && firmwareOk;
}

function adviseRestoration(device) {
  return restorationWorkflows.map((workflow) => {
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

function scanRepositories(device, repositoryList) {
  const selected = repositoryList.filter((repo) => device.repositories.includes(repo.id));
  const hashMap = new Map();
  const issues = [];
  selected.forEach((repo) => {
    if (repo.status === "slow") issues.push({ severity: "low", title: `${repo.name} is slow`, detail: `${repo.name} has not refreshed in ${repo.lastRefreshDays} days.`, action: "Refresh source" });
    if (repo.lastRefreshDays > 30) issues.push({ severity: "medium", title: `${repo.name} package lists are stale`, detail: "Stale package indexes can hide dependency updates and conflict metadata.", action: "Rebuild index" });
    const existing = hashMap.get(repo.packageIndexHash);
    if (existing) issues.push({ severity: "medium", title: "Duplicate repository index", detail: `${repo.name} mirrors the same package index as ${existing.name}.`, action: "Merge duplicate" });
    else hashMap.set(repo.packageIndexHash, repo);
  });
  if (!device.services.includes("SSH")) issues.push({ severity: "low", title: "SSH repair channel unavailable", detail: "Some advanced recovery workflows need SSH. Only enable it when needed and secure credentials.", action: "Review access" });
  return issues;
}

function average(values) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function repositoryHealthScore(repoIssues) {
  const penalty = repoIssues.reduce((total, issue) => total + (issue.severity === "medium" ? 10 : issue.severity === "high" ? 18 : 5), 0);
  return Math.max(0, 100 - penalty);
}

function doctorScores(device) {
  const base = scoreDevice(device, packages);
  const repoIssues = scanRepositories(device, repositories);
  const battery = Math.max(0, Math.min(100, Number(device.batteryHealth || 0)));
  const storage = Math.max(0, Math.round(100 - Number(device.storageUsed || 0) * 0.72));
  const repository = repositoryHealthScore(repoIssues);
  const scores = [
    { id: "performance", label: "Performance", value: base.Performance, explanation: "Starts at 100 and subtracts storage pressure and memory pressure." },
    { id: "stability", label: "Stability", value: base.Stability, explanation: "Starts at 100 and subtracts memory pressure plus review-state penalties." },
    { id: "battery", label: "Battery", value: battery, explanation: "Uses detected or recorded battery capacity where available." },
    { id: "storage", label: "Storage", value: storage, explanation: "Estimates remaining safety margin from current storage usage." },
    { id: "compatibility", label: "Compatibility", value: base.Compatibility, explanation: "Percent of known catalog packages supported by this firmware and device identifier." },
    { id: "repository", label: "Repository Health", value: repository, explanation: "Starts at 100 and subtracts duplicate, stale, slow, dead, or invalid repository findings." }
  ];
  return [{ id: "health", label: "Overall Health", value: average(scores.map((score) => score.value)), explanation: "Average of every explainable Device Doctor score." }, ...scores];
}

function doctorDiagnostics(device) {
  const repoIssues = scanRepositories(device, repositories).map((issue) => ({
    ...issue,
    category: "repository",
    why: issue.title.includes("Duplicate")
      ? "Duplicate repositories may slow refresh operations and create duplicate package entries."
      : "Repository problems can hide dependency updates, conflict metadata, and repair paths.",
    recommendation: issue.action
  }));
  const missingRecommendedRepos = recommendedPackagesForDevice(device)
    .map(({ pkg }) => packageRepository(pkg))
    .filter((repo) => repo && !device.repositories.includes(repo.id))
    .filter((repo, index, list) => list.findIndex((item) => item.id === repo.id) === index)
    .map((repo) => ({
      severity: "low",
      category: "repository",
      title: `Recommended repository missing: ${repo.name}`,
      detail: `${repo.name} provides compatible packages or restoration services for ${device.name}.`,
      why: "Adding the right source reduces manual searching and improves dependency resolution.",
      recommendation: "Add source"
    }));
  const packageIssues = packages.flatMap((pkg) => {
    const result = evaluateCompatibility(device, pkg);
    return result.checks
      .filter((check) => check.state !== "pass")
      .map((check) => ({
        severity: check.state === "block" ? "high" : "medium",
        category: "package",
        title: `${pkg.name}: ${check.label}`,
        detail: check.detail,
        why: check.state === "block" ? "This package may fail or destabilize the device." : "This should be reviewed before making changes.",
        recommendation: result.recommendation
      }));
  });

  if (device.storageUsed >= 80) {
    packageIssues.push({
      severity: "medium",
      category: "storage",
      title: "Storage pressure detected",
      detail: `${device.name} is using ${device.storageUsed}% of its recorded storage.`,
      why: "Low storage can cause package installs, restores, and cache refreshes to fail.",
      recommendation: "Create a snapshot, then clean caches and orphaned package files."
    });
  }

  if (device.batteryHealth && device.batteryHealth < 80) {
    packageIssues.push({
      severity: "medium",
      category: "battery",
      title: "Battery health needs attention",
      detail: `${device.name} battery health is recorded at ${device.batteryHealth}%.`,
      why: "Weak batteries increase the risk of failed restores and unexpected shutdowns.",
      recommendation: "Charge fully before repair operations and consider battery service."
    });
  }

  return [...repoIssues, ...missingRecommendedRepos, ...packageIssues];
}

function careRepairPlan(device) {
  const diagnostics = doctorDiagnostics(device);
  return {
    estimatedSeconds: Math.max(15, diagnostics.slice(0, 5).length * 8),
    rollbackAvailable: Boolean(selectedSnapshot()),
    steps: diagnostics.slice(0, 5).map((issue) => ({
      title: issue.recommendation,
      risk: issue.severity,
      changes: issue.category === "repository" ? "Repository metadata only" : "Package plan only",
      why: issue.why
    }))
  };
}

function communitySignals(pkg) {
  return {
    installs: Math.round(pkg.communitySuccess * 186 + pkg.rating * 1000),
    success: `${pkg.communitySuccess}%`,
    battery: pkg.batteryImpact,
    performance: pkg.performanceImpact,
    stability: pkg.risk === "low" ? "Excellent" : "Review first",
    conflicts: pkg.conflicts.length,
    recommended: pkg.communitySuccess >= 95 && pkg.risk === "low"
  };
}

function bootloopRisk(pkg) {
  const confidence = Math.max(40, Math.min(99, pkg.communitySuccess - (pkg.risk === "medium" ? 4 : 0)));
  return {
    risk: pkg.risk === "low" ? "Very Low" : pkg.risk === "medium" ? "Moderate" : "High",
    confidence,
    reports: pkg.risk === "low" ? 0 : pkg.conflicts.length + 1,
    incompatibilities: pkg.conflicts
  };
}

function smartAlternatives(targetPackage) {
  return packages
    .filter((pkg) => pkg.id !== targetPackage.id && (pkg.category === targetPackage.category || pkg.risk === "low"))
    .sort((a, b) => b.communitySuccess - a.communitySuccess)
    .slice(0, 3)
    .map((pkg) => ({ name: pkg.name, reason: `${pkg.communitySuccess}% success, ${pkg.risk} risk, ${pkg.performanceImpact} performance impact.` }));
}

function modernizationRecommendations(device) {
  return [
    { title: "Certificate and TLS review", detail: "Improves access to modern HTTPS services where legacy firmware still allows it.", confidence: device.firmware.startsWith("9.") ? 92 : 84 },
    { title: "Conservative animation tuning", detail: "Makes older devices feel faster without heavy system modifications.", confidence: 95 },
    { title: "Repository cleanup", detail: "Speeds refreshes and reduces duplicate package metadata.", confidence: 97 }
  ];
}

function snapshotIntelligence(device) {
  const latest = state.snapshots.find((snapshot) => snapshot.deviceId === device.id);
  return {
    rollbackAvailable: Boolean(latest),
    latest: latest?.title || "No snapshot yet",
    recovery: latest ? "About 2 minutes" : "Unavailable until a snapshot exists",
    recommendation: latest ? "Use the latest snapshot as rollback before repair." : "Create a local snapshot before running any repair."
  };
}

function healthTimeline(device) {
  return [
    ...state.snapshots.filter((snapshot) => snapshot.deviceId === device.id).slice(0, 3).map((snapshot) => ({
      type: "Snapshot",
      title: snapshot.title,
      detail: `${snapshot.packageIds.length} packages and ${snapshot.repositoryIds.length} repositories captured.`,
      date: snapshot.createdAt
    })),
    { type: "Scan", title: "Device Doctor scan", detail: "Health, compatibility, repository, package, battery, and storage checks refreshed locally.", date: new Date().toISOString() }
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createSnapshot(device, repositoryList, packageList) {
  const stamp = new Date().toISOString();
  const packageIds = packageList.filter((pkg) => device.installedPackages.includes(pkg.id)).map((pkg) => pkg.id);
  const repositoryIds = repositoryList.filter((repo) => device.repositories.includes(repo.id)).map((repo) => repo.id);
  return { id: `snap-${device.id}-${Date.now()}`, title: `${device.name} working set`, createdAt: stamp, deviceId: device.id, packageIds, repositoryIds, state: "verified", hash: `local:${device.identifier}:${packageIds.length}:${repositoryIds.length}:${stamp}` };
}

function diffSnapshots(left, right) {
  const leftPackages = new Set(left.packageIds);
  const rightPackages = new Set(right.packageIds);
  return {
    added: [...rightPackages].filter((id) => !leftPackages.has(id)),
    removed: [...leftPackages].filter((id) => !rightPackages.has(id)),
    unchanged: [...rightPackages].filter((id) => leftPackages.has(id))
  };
}

function buildPreservationReport(device, repositoryList, packageList, snapshot) {
  return {
    schema: "legacydock.preservation-report.v1",
    generatedAt: new Date().toISOString(),
    device: { name: device.name, identifier: device.identifier, chip: device.chip, firmware: `${device.os} ${device.firmware}`, jailbreak: device.jailbreak, packageManager: device.manager, batteryHealth: device.batteryHealth, notes: device.notes },
    repositories: repositoryList.filter((repo) => device.repositories.includes(repo.id)).map((repo) => ({ name: repo.name, url: repo.url, status: repo.status, packageIndexHash: repo.packageIndexHash })),
    packages: packageList.filter((pkg) => device.installedPackages.includes(pkg.id)).map((pkg) => ({ id: pkg.id, name: pkg.name, version: pkg.version, repository: pkg.repository, dependencies: pkg.dependencies })),
    snapshot: snapshot ? { id: snapshot.id, title: snapshot.title, createdAt: snapshot.createdAt, hash: snapshot.hash } : null
  };
}

function downloadReport(report) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `legacydock-${report.device.identifier}-preservation-report.json`;
  link.click();
  URL.revokeObjectURL(url);
}

const STORE_KEY = "legacydock.demo.workspace";

function loadWorkspace(fallback) {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

function saveWorkspace(nextState) {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    selectedDeviceId: nextState.selectedDeviceId,
    snapshots: nextState.snapshots,
    telemetryEnabled: nextState.telemetryEnabled
  }));
}

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = loadWorkspace({
  selectedDeviceId: devices[0].id,
  deviceFilter: "all",
  packageFilter: "all",
  repositoryFilter: "all",
  packageIosFilter: "all",
  searchTerm: "",
  snapshots: seedSnapshots,
  telemetryEnabled: false
});

function selectedDevice() {
  return devices.find((device) => device.id === state.selectedDeviceId) || devices[0];
}

function selectedSnapshot() {
  return state.snapshots.find((snapshot) => snapshot.deviceId === selectedDevice().id) || state.snapshots[0];
}

function badge(text, kind = "neutral") {
  return `<span class="badge ${kind}">${text}</span>`;
}

function severityKind(value) {
  if (["pass", "low", "verified", "restorable", "safe", "Recommended"].includes(value)) return "good";
  if (["warn", "medium", "slow", "needs-review", "Review first"].includes(value)) return "warn";
  if (["block", "high", "Not recommended"].includes(value)) return "bad";
  return "neutral";
}

function matchesSearch(...values) {
  if (!state.searchTerm) return true;
  return values.join(" ").toLowerCase().includes(state.searchTerm);
}

function repoStatusKind(status) {
  if (["online", "verified", "Verified Working"].includes(status)) return "good";
  if (["degraded", "Partial", "Needs Fix", "Experimental"].includes(status)) return "warn";
  if (["offline", "Broken"].includes(status)) return "bad";
  return "neutral";
}

function repoHealthLabel(repo) {
  if (repo.healthStatus === "online") return "Online";
  if (repo.healthStatus === "degraded") return "Partial";
  return "Offline";
}

function packageRepository(pkg) {
  return repositories.find((repo) => repo.id === pkg.repository);
}

function packageSupportsIosFilter(pkg) {
  if (state.packageIosFilter === "all") return true;
  const major = state.packageIosFilter.replace("ios", "");
  return compatibleVersionsForRange(pkg.firmwareRange).some((version) => version.startsWith(`${major}.`));
}

function communityStatus(pkg) {
  if (pkg.verifiedStatus) return pkg.verifiedStatus;
  if (pkg.communitySuccess >= 95) return "Verified Working";
  if (pkg.communitySuccess >= 90) return "Partial";
  return "Experimental";
}

function cydiaUrl(repo) {
  return `cydia://url/https://cydia.saurik.com/api/share#?source=${encodeURIComponent(repo.url)}`;
}

function recommendedPackagesForDevice(device) {
  return packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .filter(({ result }) => result.supported && result.score >= 84)
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, 8);
}

function renderDevices() {
  const list = $("[data-device-list]");
  const filtered = devices.filter((device) => {
    const filterMatch = state.deviceFilter === "all" || device.status === state.deviceFilter;
    return filterMatch && matchesSearch(device.name, device.identifier, device.firmware, device.jailbreak, device.manager);
  });

  list.innerHTML = filtered.map((device) => {
    const scores = scoreDevice(device, packages);
    return `
      <button class="device-card ${device.id === state.selectedDeviceId ? "active" : ""}" data-device-id="${device.id}">
        <div class="card-top">
          <span class="device-dot"></span>
          <div>
            <strong>${device.name}</strong>
            <small>${device.identifier} &middot; ${device.os} ${device.firmware}</small>
          </div>
          ${badge(device.status === "stable" ? "Stable" : "Review", device.status === "stable" ? "good" : "warn")}
        </div>
        <div class="badge-row">
          ${badge(device.chip)}
          ${badge(device.jailbreak)}
          ${badge(device.manager)}
        </div>
        <div class="meter">
          <label><span>Compatibility</span><span>${scores.Compatibility}%</span></label>
          <div><i style="width:${scores.Compatibility}%"></i></div>
        </div>
      </button>
    `;
  }).join("");

  $$(".device-card", list).forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedDeviceId = card.dataset.deviceId;
      persistAndRender();
    });
  });
}

function renderCompatibilityMatrix() {
  const target = $("[data-compatibility-matrix]");
  if (!target) return;

  const selected = selectedDevice();
  const majorGroups = ["6", "7", "8", "9"].map((major) => ({
    major,
    versions: iosCompatibilityVersions.filter((version) => version.startsWith(`${major}.`))
  }));

  target.innerHTML = `
    <div class="compatibility-summary">
      <div>
        <p class="kicker">Compatibility catalog</p>
        <h3>iOS 6.x.x through iOS 9.x.x</h3>
        <p class="panel-note">${iosCompatibilityVersions.length} subversions indexed. Selected device firmware ${selected.os} ${selected.firmware} is ${platformSupportsFirmware(selected.firmware) ? "covered" : "not covered"}.</p>
      </div>
      ${badge(`${iosCompatibilityVersions[0]} to ${iosCompatibilityVersions[iosCompatibilityVersions.length - 1]}`, "good")}
    </div>
    ${majorGroups.map((group) => `
      <div>
        <strong>iOS ${group.major}.x.x</strong>
        <div class="version-grid">
          ${group.versions.map((version) => `<span class="version-chip">${version}</span>`).join("")}
        </div>
      </div>
    `).join("")}
  `;
}

function renderDeviceDetail() {
  const device = selectedDevice();
  const scores = scoreDevice(device, packages);
  const repoIssues = scanRepositories(device, repositories);
  const recommended = packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .filter((item) => item.result.supported)
    .sort((a, b) => b.result.score - a.result.score)
    .slice(0, 4);

  $("[data-device-detail]").innerHTML = `
    <div class="device-hero-card">
      <div class="ios-device">
        <div class="speaker"></div>
        <div class="screen">
          <span>${device.name}</span>
          <small>${device.os} ${device.firmware}</small>
        </div>
        <div class="home-button"></div>
      </div>
      <div>
        <p class="kicker">${device.identifier}</p>
        <h3>${device.name}</h3>
        <p>${device.jailbreak} with ${device.manager}. ${device.packageCount} packages, ${device.repositoryCount} repositories, ${device.batteryHealth}% battery health.</p>
        <div class="badge-row">
          ${device.services.map((service) => badge(service, "neutral")).join("")}
        </div>
      </div>
    </div>
    <div class="score-grid">
      ${Object.entries(scores).map(([label, score]) => `
        <div class="score-card">
          <small>${label}</small>
          <strong>${score}</strong>
          <div class="meter slim"><div><i style="width:${score}%"></i></div></div>
        </div>
      `).join("")}
    </div>
    <div class="detail-grid">
      <div class="panel">
        <div class="panel-head"><h4>Recommended installs</h4><button class="mini-button" data-jump="marketplace">Browse</button></div>
        <div class="list-stack">
          ${recommended.map(({ pkg, result }) => `
            <div class="list-row">
              <span>${pkg.name}</span>
              ${badge(`${result.score}% fit`, result.score > 90 ? "good" : "warn")}
            </div>
          `).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h4>Repository status</h4><button class="mini-button" data-jump="health">Repair</button></div>
        <div class="list-stack">
          ${repositories.filter((repo) => device.repositories.includes(repo.id)).map((repo) => `
            <div class="list-row">
              <span>${repo.name}</span>
              ${badge(repo.status, repo.status === "verified" ? "good" : "warn")}
            </div>
          `).join("")}
        </div>
        <p class="panel-note">${repoIssues.length} health recommendation${repoIssues.length === 1 ? "" : "s"} found.</p>
      </div>
    </div>
  `;

  $$("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => activateView(button.dataset.jump));
  });
}

function renderPackages() {
  const device = selectedDevice();
  const grid = $("[data-package-grid]");
  const filtered = packages.filter((pkg) => {
    const filterMatch =
      state.packageFilter === "all" ||
      pkg.category === state.packageFilter ||
      (state.packageFilter === "safe" && pkg.risk === "low");
    return filterMatch && matchesSearch(pkg.name, pkg.category, pkg.summary, pkg.repository);
  });

  grid.innerHTML = filtered.map((pkg) => {
    const result = evaluateCompatibility(device, pkg);
    return `
      <article class="package-card">
        <div class="package-media">${packageIcon(pkg)}</div>
        <div class="package-body">
          <div class="card-top">
            <div>
              <h4>${pkg.name}</h4>
              <small>${pkg.version} &middot; ${pkg.category}</small>
            </div>
            ${badge(result.recommendation, severityKind(result.recommendation))}
          </div>
          <p>${pkg.summary}</p>
          <div class="badge-row">
            ${badge(`${result.score}% compatibility`, result.score > 90 ? "good" : "warn")}
            ${badge(`${compatibleVersionsForRange(pkg.firmwareRange).length} iOS builds`, "neutral")}
            ${badge(`${pkg.communitySuccess}% success`, pkg.communitySuccess >= 95 ? "good" : "warn")}
            ${badge(`${pkg.risk} risk`, severityKind(pkg.risk))}
          </div>
        </div>
        <button class="aqua-button compact" data-review-package="${pkg.id}">Review</button>
      </article>
    `;
  }).join("");

  $$("[data-review-package]").forEach((button) => {
    button.addEventListener("click", () => openInstallDialog(button.dataset.reviewPackage));
  });
}

function renderRepositoryFilters() {
  const categoryTarget = $("[data-repository-filters]");
  const iosTarget = $("[data-ios-package-filters]");
  if (!categoryTarget || !iosTarget) return;
  const categories = ["all", ...new Set(repositories.map((repo) => repo.category))];
  categoryTarget.innerHTML = categories.map((category) => `
    <button class="${state.repositoryFilter === category ? "active" : ""}" data-repository-filter="${category}">${category === "all" ? "All repos" : category}</button>
  `).join("");
  iosTarget.innerHTML = ["all", "ios3", "ios4", "ios5", "ios6", "ios7", "ios8", "ios9"].map((version) => `
    <button class="${state.packageIosFilter === version ? "active" : ""}" data-ios-filter="${version}">${version === "all" ? "All iOS" : version.replace("ios", "iOS ")}</button>
  `).join("");

  $$("[data-repository-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.repositoryFilter = button.dataset.repositoryFilter;
      renderRepositories();
    });
  });
  $$("[data-ios-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.packageIosFilter = button.dataset.iosFilter;
      renderRepositories();
    });
  });
}

function renderRepositories() {
  const grid = $("[data-repository-grid]");
  if (!grid) return;
  renderRepositoryFilters();
  const device = selectedDevice();
  const filteredRepos = repositories.filter((repo) => {
    const categoryMatch = state.repositoryFilter === "all" || repo.category === state.repositoryFilter;
    return categoryMatch && matchesSearch(repo.name, repo.url, repo.description, repo.category, repo.contains.join(" "), repo.notes);
  });
  const filteredPackages = packages.filter((pkg) => {
    const repo = packageRepository(pkg);
    return packageSupportsIosFilter(pkg) && matchesSearch(pkg.name, pkg.summary, pkg.category, pkg.developer || "", repo?.name || "");
  });
  const onlineCount = repositories.filter((repo) => repo.healthStatus === "online").length;
  const degradedCount = repositories.filter((repo) => repo.healthStatus === "degraded").length;
  const verifiedCount = repositories.filter((repo) => repo.verified).length;

  $("[data-repo-summary]").innerHTML = [
    ["Repositories", repositories.length],
    ["Online", onlineCount],
    ["Partial", degradedCount],
    ["Verified", verifiedCount]
  ].map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("");

  grid.innerHTML = filteredRepos.map((repo) => `
    <article class="repository-card">
      <div class="card-top">
        <div>
          <h4>${repo.name}</h4>
          <small>${repo.url}</small>
        </div>
        ${badge(repo.verified ? "Verified" : "Community", repo.verified ? "good" : "neutral")}
      </div>
      <p>${repo.description}</p>
      <div class="repo-health-row">
        ${badge(repoHealthLabel(repo), repoStatusKind(repo.healthStatus))}
        ${badge(repo.sslSupport ? "SSL" : "HTTP only", repo.sslSupport ? "good" : "warn")}
        ${badge(`${repo.packageCount.toLocaleString()} packages`, "neutral")}
        ${badge(`${repo.communityRating}/5 rating`, "good")}
      </div>
      <dl class="repo-meta">
        <dt>Category</dt><dd>${repo.category}</dd>
        <dt>Maintainer</dt><dd>${repo.maintainer || "Unknown"}</dd>
        <dt>Last health check</dt><dd>${repo.lastHealthCheck}</dd>
        <dt>Last successful ping</dt><dd>${repo.lastSuccessfulPing}</dd>
        <dt>Package index</dt><dd>${repo.packageIndexAvailable ? "Available" : "Missing"}</dd>
        <dt>Response</dt><dd>${repo.responseMs}ms${repo.redirectDetected ? ", redirect detected" : ""}${repo.sslIssue ? ", SSL issue" : ""}</dd>
      </dl>
      <p class="panel-note">${repo.notes}</p>
      <div class="repo-contains">${repo.contains.map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="repo-actions">
        <a class="mini-button" href="${cydiaUrl(repo)}">Add to Cydia</a>
        <button class="mini-button" data-copy-repo="${repo.url}">Copy URL</button>
      </div>
    </article>
  `).join("");

  $("[data-repo-package-grid]").innerHTML = filteredPackages.map((pkg) => {
    const repo = packageRepository(pkg);
    const status = communityStatus(pkg);
    return `
      <article class="repo-package-card">
        <div class="package-screenshot">${pkg.screenshot || pkg.name}</div>
        <div>
          <div class="card-top">
            <div>
              <h4>${pkg.name}</h4>
              <small>${pkg.version} &middot; ${pkg.developer || "Legacy community"}</small>
            </div>
            ${badge(status, repoStatusKind(status))}
          </div>
          <p>${pkg.summary}</p>
          <div class="repo-health-row">
            ${badge(`${pkg.firmwareRange[0]}-${pkg.firmwareRange[1]}`, "neutral")}
            ${badge(repo?.name || pkg.repository, "good")}
            ${badge(`${pkg.rating}/5`, "good")}
            ${badge(`${pkg.communitySuccess}% success`, pkg.communitySuccess >= 95 ? "good" : "warn")}
          </div>
          <p class="panel-note">Dependencies: ${(pkg.dependencies && pkg.dependencies.length) ? pkg.dependencies.join(", ") : "none recorded"}. Last updated ${pkg.lastUpdated || "unknown"}.</p>
        </div>
      </article>
    `;
  }).join("");

  $("[data-essential-grid]").innerHTML = essentialTweaks.map((group) => `
    <article class="essential-card">
      <h4>${group.group}</h4>
      <div class="list-stack">
        ${group.ids.map((id) => {
          const pkg = packages.find((item) => item.id === id);
          const repo = packageRepository(pkg);
          return `<div class="list-row"><span>${pkg.name}<small>${pkg.summary}</small></span>${badge(repo?.name || pkg.repository, "good")}</div>`;
        }).join("")}
      </div>
    </article>
  `).join("");

  $("[data-service-grid]").innerHTML = serviceCatalog.map((service) => `
    <article class="service-card">
      <div class="card-top"><h4>${service.name}</h4>${badge(service.status, repoStatusKind(service.status))}</div>
      <p>${service.description}</p>
      <div class="repo-health-row">
        ${service.supported.map((item) => badge(item, "neutral")).join("")}
        ${badge(`Repo: ${repositories.find((repo) => repo.id === service.requiredRepo)?.name || service.requiredRepo}`, "good")}
      </div>
      <p class="panel-note"><strong>Guide:</strong> ${service.guide}</p>
      <p class="panel-note"><strong>Known limitations:</strong> ${service.limitations}</p>
    </article>
  `).join("");

  $("[data-submission-panel]").innerHTML = `
    <h3>Repository Submission</h3>
    <p class="panel-note">Submissions are staged for moderation before becoming verified.</p>
    <form class="submission-form" data-submission-form>
      <input name="url" placeholder="Repository URL" />
      <input name="description" placeholder="Description" />
      <input name="maintainer" placeholder="Maintainer" />
      <input name="website" placeholder="Website or screenshot URL" />
      <textarea name="notes" placeholder="Notes"></textarea>
      <button class="primary-button compact" type="submit">Submit for review</button>
    </form>
  `;

  $("[data-resource-center]").innerHTML = `
    <h3>Community Resource Center</h3>
    <div class="list-stack">
      ${communityResources.map((resource) => `
        <a class="resource-row" href="${resource.url}" target="_blank" rel="noreferrer">
          <span>${resource.name}<small>${resource.type} - ${resource.note}</small></span>
          ${badge("Open", "neutral")}
        </a>
      `).join("")}
    </div>
  `;

  $("[data-dead-repo-archive]").innerHTML = `
    <h3>Dead Repository Archive</h3>
    <div class="list-stack">
      ${deadRepositoryArchive.map((repo) => `
        <div class="list-row"><span>${repo.name}<small>${repo.originalUrl}<br>${repo.recovery}</small></span>${badge(repo.state, repo.state.includes("lost") ? "bad" : "warn")}</div>
      `).join("")}
    </div>
  `;

  $("[data-smart-recommendations]").innerHTML = `
    <h3>Smart Recommendations</h3>
    <p class="panel-note">Detected ${device.name} on ${device.os} ${device.firmware}. Recommended compatible essentials and restoration services:</p>
    <div class="list-stack">
      ${recommendedPackagesForDevice(device).map(({ pkg, result }) => {
        const repo = packageRepository(pkg);
        const missingRepo = repo && !device.repositories.includes(repo.id);
        return `<div class="list-row"><span>${pkg.name}<small>${pkg.summary}</small></span>${badge(missingRepo ? `Add ${repo.name}` : `${result.score}% fit`, missingRepo ? "warn" : "good")}</div>`;
      }).join("")}
    </div>
  `;

  $$("[data-copy-repo]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyRepo);
        toast("Repository URL copied.");
      } catch {
        toast(button.dataset.copyRepo);
      }
    });
  });

  $("[data-submission-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast("Repository submission staged for moderation.");
  });
}

function openInstallDialog(packageId) {
  const device = selectedDevice();
  const pkg = packages.find((item) => item.id === packageId);
  const result = evaluateCompatibility(device, pkg);
  const dialog = $("[data-install-dialog]");

  $("[data-dialog-title]").textContent = pkg.name;
  $("[data-dialog-risks]").innerHTML = [
    badge(result.recommendation, severityKind(result.recommendation)),
    badge(`${pkg.communitySuccess}% community success`, pkg.communitySuccess >= 95 ? "good" : "warn"),
    badge(`${pkg.batteryImpact} battery`, pkg.batteryImpact === "positive" ? "good" : "neutral")
  ].join("");
  $("[data-dialog-body]").innerHTML = result.checks.map((check) => `
    <div class="dialog-card">
      <div class="card-top"><strong>${check.label}</strong>${badge(check.state, severityKind(check.state))}</div>
      <p>${check.detail}</p>
    </div>
  `).join("") + `
    <div class="dialog-card">
      <div class="card-top"><strong>Recovery</strong>${badge("snapshot first", "good")}</div>
      <p>LegacyDock will capture a local snapshot before any install or repository mutation.</p>
    </div>
  `;

  $("[data-confirm-install]").onclick = () => toast(`${pkg.name} queued with pre-install snapshot protection.`);
  dialog.showModal();
}

function renderHealth() {
  const device = selectedDevice();
  const scores = doctorScores(device);
  const issues = doctorDiagnostics(device);
  const plan = careRepairPlan(device);
  const primaryPackage = packages
    .map((pkg) => ({ pkg, result: evaluateCompatibility(device, pkg) }))
    .sort((a, b) => b.result.score - a.result.score)[0].pkg;
  const signals = communitySignals(primaryPackage);
  const risk = bootloopRisk(primaryPackage);
  const snapshot = snapshotIntelligence(device);

  $("[data-health-score]").innerHTML = `<strong>${scores[0].value}</strong><span>overall health</span>`;
  $("[data-doctor-score-list]").innerHTML = scores.map((score) => `
    <button class="doctor-score-card" data-score-explanation="${score.explanation}">
      <span>${score.label}</span>
      <strong>${score.value}</strong>
      <small>${score.explanation}</small>
    </button>
  `).join("");

  $("[data-issue-list]").innerHTML = issues.slice(0, 8).map((issue) => `
    <article class="issue-card">
      <div class="card-top">
        <h4>${issue.title}</h4>
        ${badge(issue.severity, severityKind(issue.severity))}
      </div>
      <p>${issue.detail}</p>
      <p class="panel-note">${issue.why}</p>
      <button class="mini-button" data-stage-repair>${issue.recommendation}</button>
    </article>
  `).join("");

  $("[data-repair-plan]").innerHTML = `
    <h3>Intelligent Repair Plan</h3>
    <p class="panel-note">LegacyDock Care converts diagnostics into an explainable, rollback-aware repair sequence.</p>
    <div class="care-meta">
      ${badge(`${plan.estimatedSeconds}s estimate`, "good")}
      ${badge(plan.rollbackAvailable ? "Rollback available" : "Snapshot needed", plan.rollbackAvailable ? "good" : "warn")}
    </div>
    <ol class="care-steps">
      ${plan.steps.map((step) => `
        <li>
          <strong>${step.title}</strong>
          <span>${step.why}</span>
          <small>${step.changes} &middot; ${step.risk} risk</small>
        </li>
      `).join("") || "<li><strong>No repairs needed</strong><span>Device Doctor did not find actionable issues.</span><small>Keep a fresh snapshot anyway.</small></li>"}
    </ol>
    <button class="primary-button compact" data-stage-care-repair>Run Repair</button>
  `;

  $("[data-community-intel]").innerHTML = `
    <h3>Community Intelligence</h3>
    <p class="panel-note">${primaryPackage.name} on ${device.name}</p>
    <div class="intel-grid">
      <span>Community installs<strong>${signals.installs.toLocaleString()}</strong></span>
      <span>Success rate<strong>${signals.success}</strong></span>
      <span>Battery impact<strong>${signals.battery}</strong></span>
      <span>Performance<strong>${signals.performance}</strong></span>
      <span>Known conflicts<strong>${signals.conflicts}</strong></span>
      <span>Recommended<strong>${signals.recommended ? "Yes" : "Review"}</strong></span>
    </div>
  `;

  $("[data-bootloop-risk]").innerHTML = `
    <h3>Bootloop Risk</h3>
    <div class="risk-readout">
      <strong>${risk.risk}</strong>
      <span>${risk.confidence}% community confidence</span>
      <small>${risk.reports} confirmed reports &middot; ${risk.incompatibilities.length || 0} known incompatibilities</small>
    </div>
  `;

  $("[data-smart-alternatives]").innerHTML = `
    <h3>Smart Alternatives</h3>
    <div class="list-stack">
      ${smartAlternatives(primaryPackage).map((item) => `
        <div class="list-row"><span>${item.name}<small>${item.reason}</small></span>${badge("Care", "good")}</div>
      `).join("")}
    </div>
  `;

  $("[data-modernization]").innerHTML = `
    <h3>Device Modernization Assistant</h3>
    <div class="list-stack">
      ${modernizationRecommendations(device).map((item) => `
        <div class="list-row"><span>${item.title}<small>${item.detail}</small></span>${badge(`${item.confidence}%`, "good")}</div>
      `).join("")}
    </div>
  `;

  $("[data-snapshot-intel]").innerHTML = `
    <h3>Snapshot Intelligence</h3>
    <div class="list-stack">
      <div class="list-row"><span>Rollback</span>${badge(snapshot.rollbackAvailable ? "available" : "missing", snapshot.rollbackAvailable ? "good" : "warn")}</div>
      <div class="list-row"><span>Latest snapshot</span><strong>${snapshot.latest}</strong></div>
      <div class="list-row"><span>Recovery estimate</span><strong>${snapshot.recovery}</strong></div>
    </div>
    <p class="panel-note">${snapshot.recommendation}</p>
  `;

  $("[data-health-timeline]").innerHTML = `
    <h3>Health Timeline</h3>
    <div class="timeline-list">
      ${healthTimeline(device).map((item) => `
        <article>
          <small>${item.type} &middot; ${new Date(item.date).toLocaleString()}</small>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </article>
      `).join("")}
    </div>
  `;

  $$("[data-stage-repair]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Staged";
      button.disabled = true;
      toast("Repair action staged locally. No device changes were made.");
    });
  });

  $$("[data-score-explanation]").forEach((button) => {
    button.addEventListener("click", () => toast(button.dataset.scoreExplanation));
  });

  $("[data-stage-care-repair]").addEventListener("click", () => {
    toast("Care repair plan staged with snapshot rollback. No device changes were made.");
  });
}

function renderRestoration() {
  const device = selectedDevice();
  const workflows = adviseRestoration(device);
  $("[data-restoration-list]").innerHTML = workflows.map((workflow) => `
    <article class="workflow-card ${workflow.match ? "active" : ""}">
      <div class="card-top">
        <div>
          <h4>${workflow.name}</h4>
          <small>${workflow.source}</small>
        </div>
        ${badge(workflow.recommendation, workflow.match ? "good" : "neutral")}
      </div>
      <p>${workflow.summary}</p>
      <div class="badge-row">
        ${badge(`${workflow.risk} risk`, severityKind(workflow.risk))}
        ${workflow.firmwareRange ? badge(`${workflow.firmwareRange.join(" to ")}`) : ""}
        ${workflow.chips ? workflow.chips.map((chip) => badge(chip)).join("") : ""}
        ${workflow.families ? workflow.families.map((family) => badge(family)).join("") : ""}
      </div>
      <ol class="workflow-steps">
        ${workflow.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <a class="mini-button source-link" href="${workflow.sourceUrl}" target="_blank" rel="noreferrer">Open upstream</a>
    </article>
  `).join("");

  $("[data-restoration-source]").innerHTML = `
    <h4>Source trail</h4>
    <p class="panel-note">${device.name} is treated as a ${deviceArchitecture(device)} ${device.chip} device for local guidance.</p>
    <div class="list-stack">
      <div class="list-row"><span>External toolkit</span>${badge("Legacy iOS Kit", "good")}</div>
      <div class="list-row"><span>Local role</span>${badge("Plan, warn, document")}</div>
      <div class="list-row"><span>Execution role</span>${badge("External handoff", "warn")}</div>
      <div class="list-row"><span>Bundled exploit code</span>${badge("none", "good")}</div>
    </div>
    <p class="panel-note">LegacyDock should capture snapshots, explain risk, collect metadata, and preserve notes before sending users to external restore or jailbreak workflows.</p>
  `;
}

function renderSnapshots() {
  const device = selectedDevice();
  const deviceSnapshots = state.snapshots.filter((snapshot) => snapshot.deviceId === device.id);
  const fallback = state.snapshots.slice(0, 2);
  const visible = deviceSnapshots.length ? deviceSnapshots : fallback;
  const diff = visible.length > 1 ? diffSnapshots(visible[1], visible[0]) : { added: [], removed: [], unchanged: visible[0]?.packageIds || [] };

  $("[data-snapshot-timeline]").innerHTML = visible.map((snapshot) => `
    <article class="snapshot-card">
      <div class="card-top">
        <div>
          <h4>${snapshot.title}</h4>
          <small>${new Date(snapshot.createdAt).toLocaleString()}</small>
        </div>
        ${badge(snapshot.state, severityKind(snapshot.state))}
      </div>
      <p>${snapshot.packageIds.length} packages, ${snapshot.repositoryIds.length} repositories, preferences, and metadata captured.</p>
      <code>${snapshot.hash}</code>
    </article>
  `).join("");

  $("[data-snapshot-diff]").innerHTML = `
    <div class="panel">
      <h4>Latest diff</h4>
      <div class="diff-grid">
        <span>Added</span><strong>${diff.added.length}</strong>
        <span>Removed</span><strong>${diff.removed.length}</strong>
        <span>Unchanged</span><strong>${diff.unchanged.length}</strong>
      </div>
      <p class="panel-note">Restore previews compare manifests before touching the device.</p>
    </div>
  `;
}

function renderPreservation() {
  const device = selectedDevice();
  const report = buildPreservationReport(device, repositories, packages, selectedSnapshot());
  $("[data-preservation-profile]").innerHTML = `
    <h4>Selected profile</h4>
    <dl class="profile-list">
      ${Object.entries(report.device).map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join("")}
    </dl>
  `;
  $("[data-preservation-checks]").innerHTML = `
    <h4>Reproducibility checks</h4>
    <div class="list-stack">
      ${["Package versions", "Repository hashes", "Device metadata", "Snapshot recovery plan"].map((item) => `
        <div class="list-row"><span>${item}</span>${badge("captured", "good")}</div>
      `).join("")}
    </div>
  `;
  $("[data-manifest-preview]").textContent = JSON.stringify(report, null, 2);
}

function renderPlans() {
  const planGrid = $("[data-plan-grid]");
  if (!planGrid) return;
  planGrid.innerHTML = cloudPlans.map((plan, index) => `
    <article class="plan-card ${index === 0 ? "active" : ""}">
      <small>${plan.name}</small>
      <strong>${plan.price}</strong>
      <p>${plan.summary}</p>
    </article>
  `).join("");
}

function captureSnapshot() {
  const snapshot = createSnapshot(selectedDevice(), repositories, packages);
  state.snapshots = [snapshot, ...state.snapshots];
  persistAndRender();
  activateView("snapshots");
  toast("Snapshot captured locally.");
}

function exportReport() {
  const report = buildPreservationReport(selectedDevice(), repositories, packages, selectedSnapshot());
  downloadReport(report);
  toast("Preservation report exported.");
}

function activateView(name) {
  $$(".console-tab").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  $$(".console-view").forEach((view) => view.classList.toggle("active", view.id === `${name}-view`));
}

function viewFromHash() {
  const value = window.location.hash.replace("#", "").replace("-view", "");
  return ["dashboard", "marketplace", "repositories", "health", "restoration", "snapshots", "preservation"].includes(value) ? value : null;
}

function toast(message) {
  const node = $("[data-toast]");
  node.textContent = message;
  node.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("show"), 2600);
}

function persistAndRender() {
  saveWorkspace(state);
  renderAll();
}

function renderAll() {
  renderCompatibilityMatrix();
  renderDevices();
  renderDeviceDetail();
  renderPackages();
  renderRepositories();
  renderHealth();
  renderRestoration();
  renderSnapshots();
  renderPreservation();
  renderPlans();
}

$$(".console-tab").forEach((button) => {
  button.addEventListener("click", () => {
    activateView(button.dataset.view);
    history.replaceState(null, "", `#${button.dataset.view}`);
  });
});

$$("[data-device-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.deviceFilter = button.dataset.deviceFilter;
    $$("[data-device-filter]").forEach((item) => item.classList.toggle("active", item === button));
    persistAndRender();
  });
});

$$("[data-package-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.packageFilter = button.dataset.packageFilter;
    $$("[data-package-filter]").forEach((item) => item.classList.toggle("active", item === button));
    persistAndRender();
  });
});

$("#searchInput").addEventListener("input", (event) => {
  state.searchTerm = event.target.value.trim().toLowerCase();
  renderDevices();
  renderPackages();
  renderRepositories();
});

$("[data-capture-snapshot]").addEventListener("click", captureSnapshot);
$("[data-run-health]").addEventListener("click", () => toast("Health scan refreshed local compatibility and repository checks."));
$("[data-refresh-repositories]").addEventListener("click", () => {
  renderRepositories();
  toast("Repository health checks refreshed from the local community database.");
});
$("[data-export-report]").addEventListener("click", exportReport);
const telemetryToggle = $("[data-telemetry-toggle]");
if (telemetryToggle) {
  telemetryToggle.addEventListener("change", (event) => {
    state.telemetryEnabled = event.target.checked;
    persistAndRender();
    toast(event.target.checked ? "Anonymous community intelligence enabled." : "Community intelligence disabled.");
  });
}
renderAll();
const initialView = viewFromHash();
if (initialView) activateView(initialView);
