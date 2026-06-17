# LegacyDock

LegacyDock is an open-source, local-first project for preserving, maintaining, repairing, enhancing, and documenting legacy Apple devices running iOS 6 through iOS 9.

A passion project catered towards the jaibreaking, sideloading and ios enthusiast communities. 

Have fun!

## What It Does

LegacyDock is the companion app Cydia never had.

It provides device diagnostics, debugging, compatibility intelligence, snapshots, backups, repair tools, and curated tweaks to preserve and enhance legacy devices.

While Cydia excels at installing and managing packages directly on your device, LegacyDock focuses on everything around that experience. It helps you understand your device, prevent problems before they happen, recover from issues when they do, and preserve your setup for years to come.

Using device diagnostics, debugging tools, compatibility intelligence, snapshots, backups, repair tools, and community-powered recommendations, LegacyDock helps users safely maintain and enhance their legacy Apple devices.

Before installing a tweak, LegacyDock can tell you if it is compatible with your device and iOS version, highlight known conflicts, estimate performance and battery impact, and surface community-reported issues. After installation, Device Doctor can scan for broken dependencies, dead repositories, configuration problems, and other common issues that often require hours of troubleshooting.


## What Is Included Now
- Tauri desktop scaffold with React, Vite, Tailwind, and Rust command modules.
- Windows-only production release scaffold for Windows 10/11 packaging, signing preparation, secure updater planning, and Supabase-ready optional cloud contracts.
- Desktop Setup Wizard for beginner-friendly device detection, compatibility, repo health, essential setup, Device Doctor, service restoration, and final setup reports.
- Local API for devices, repositories, packages, Device Doctor, snapshots, reports, package ingestion, entitlements, cloud contracts, compliance, and release metadata.
- Repository Hub, package browser, essential tweaks, restoration catalog, dead repo archive, and community resource links.
- iOS 6.0 through iOS 9.3.6 compatibility catalog.
- Device Doctor and LegacyDock Care logic for diagnostics, repair planning, bootloop risk, smart alternatives, and health timelines.
- Safety-gated install planning, dry-run mutation queue, snapshot creation, and preservation report export.
- Durable storage contracts with SQLite schema plus JSON fallback.
- CLI commands, JSON schemas, release workflow scaffold, and automated tests.

The site is built with static HTML, CSS, and JavaScript so it can run directly on GitHub Pages without a build pipeline.

## Try It Locally

Open `index.html` in a browser.

For a simple local server:

```bash
npx serve .
```

Then open the shown local URL.

For local core workflows:

```bash
npm run cli -- devices
npm run cli -- discover
npm run cli -- doctor iphone4-black-32
npm run cli -- plan-install iphone4-black-32 winterboard
npm run cli -- snapshot iphone4-black-32
npm run cli -- report iphone4-black-32
```

Run checks:

```bash
npm test
npm run check
```

## Website Link

```text
https://monkeseeds.github.io/LegacyDock---Open-Source-Legacy-IOS-Hub/
```

## Technical Direction

The production direction is:

1. Tauri desktop app with a React/Vite/Tailwind interface and Rust backend.
2. Setup Wizard first, then deeper dashboard tools after a device profile exists.
3. Windows 10/11 installers first; macOS and Linux are deferred but kept possible through isolated platform boundaries.
4. SQLite for local device state, snapshots, repository indexes, reports, settings, and entitlements.
5. Read-only `libimobiledevice`, AFC, package-state, and repository inspection before any device mutation.
6. Optional Supabase-backed services later for accounts, encrypted sync, backups, teams, moderation, and compatibility intelligence. Stripe is deferred for now.

See:

- [Architecture](docs/architecture.md)
- [Device Doctor And Care](docs/device-doctor-care.md)
- [Repository Hub And Community Resources](docs/repository-hub.md)
- [Integration Research](docs/integrations.md)
- [Commercial Readiness Plan](docs/commercial-readiness.md)
- [Windows Production Setup](docs/windows-production-setup.md)
- [Community Intelligence](docs/community-intelligence.md)
- [Changelog](CHANGELOG.md)
- [Product Blueprint](docs/legacydock-blueprint.md)

## Credits And Prior Art

LegacyDock is inspired by open-source, local-first, and developer-focused products including Docker, n8n, Supabase, Ryujinx, and preservation-minded community projects.

Special ecosystem credit:

- [CatsLover2006/iOSobscuraServer](https://github.com/CatsLover2006/iOSobscuraServer) for useful prior art around searching legacy iOS archival metadata. LegacyDock does not vendor that code in this repository; future archive discovery integrations should credit upstream work, preserve license obligations, and focus on metadata and user-controlled preservation workflows.
- [LukeZGD/Legacy-iOS-Kit](https://github.com/LukeZGD/Legacy-iOS-Kit) for major prior art around restore/downgrade workflows, SHSH blob saving, jailbreak guidance, SSH ramdisk utilities, and legacy device support research. LegacyDock uses it as credited integration research and external handoff inspiration, not as bundled code.
- [BigBoss](http://apt.thebigboss.org/repofiles/cydia/), [Cydia/Telesphoreo](http://apt.saurik.com/), [ModMyi Archive](http://apt.modmyi.com/), [Chariz](https://repo.chariz.com/), [SkyGlow](https://cydia.skyglow.es/), [Yzu](https://yzu.moe/dev/), [bag.xml](https://cydia.bag-xml.com/), [InvoxiPlayGames](https://cydia.invoxiplaygames.uk/), [Invoxi Beta](https://cydia.invoxiplaygames.uk/beta/), [Preloading](https://cydia.preloading.dev/), [Pwnage Archive](http://pwnage.dev/), [MomentumDev](http://repo.mtmdev.org/), [Legacy iOS Repo](https://albyvar.github.io/legacyrepo/), [iOS 3 Party](https://cydia.invoxiplaygames.uk/ios3/), [Karen's Repo Mirror](https://lukezgd.github.io/repo/), [Zebra Official Repo](https://getzbra.com/repo/), [Galactic Server](http://repo.galactic-server.info/), and other legacy Cydia repository maintainers for the ecosystem knowledge represented by the Repository Hub seed catalog. LegacyDock stores metadata and user-facing guidance only; it does not mirror, vendor, or redistribute repository packages.
- [r/LegacyJailbreak](https://www.reddit.com/r/LegacyJailbreak/), [iPhoneOS Obscura](https://github.com/CatsLover2006/iOSobscuraServer), and the broader legacy iOS Discord/forum/archive community for years of device compatibility notes, service restoration research, dead repository reports, and preservation practices.
- [TubeRepair](https://github.com/bag-xml/TubeRepair), [MapsX](https://cydia.skyglow.es/), [Veteris](https://yzu.moe/dev/), [ChatGPT for Legacy iOS](https://github.com/bag-xml/ChatGPT-for-Legacy-iOS), [Discord Classic](https://github.com/bag-xml/Discord-Classic), [SBSettings](http://repo.galactic-server.info/), [iFile](http://apt.thebigboss.org/repofiles/cydia/), [Activator](http://apt.thebigboss.org/repofiles/cydia/), [iCleaner](http://apt.thebigboss.org/repofiles/cydia/), [RecordMyScreen](http://apt.thebigboss.org/repofiles/cydia/), [ColoredKnob](http://apt.thebigboss.org/repofiles/cydia/), [LiveWallpaper](http://apt.thebigboss.org/repofiles/cydia/), and similar legacy projects are credited as ecosystem references in the fixture catalog. Their names, packages, and repositories remain owned by their respective maintainers.

## License

This repository is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
