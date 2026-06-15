# LegacyDock

LegacyDock is an open-source, local-first operating center for preserving, maintaining, repairing, enhancing, and documenting legacy Apple devices running iOS 6 through iOS 9.

It is not another jailbreak tool, piracy surface, or package manager clone. LegacyDock is meant to become the trusted hub users open when they need to understand an old iPhone, iPad, or iPod touch and safely manage its software environment.

## What Is Included Now

This repository now contains a fuller static product foundation:

- proper landing page with a retro-modern Apple-inspired visual direction,
- Jan.ai-inspired product storytelling and Flathub-inspired browse/storefront flow,
- standalone docs, changelog, and pricing pages,
- separate `console.html` product console,
- dark theme by default,
- working product console demo,
- device dashboard,
- Device Doctor health dashboard with explainable performance, stability, battery, storage, compatibility, and repository scores,
- basic diagnostics for repositories, packages, dependencies, storage, battery, and compatibility,
- LegacyDock Care intelligence for repair plans, community signals, bootloop risk, smart alternatives, modernization guidance, snapshot intelligence, and health timeline,
- Legacy Repository Hub with searchable repositories, package browsing, health status, essential tweaks, service restoration catalog, submissions, dead repo archive, community resources, and device-specific recommendations,
- compatibility-aware marketplace,
- explainable package safety review,
- repository health scanner,
- restoration guidance lab,
- snapshot creation and diffing,
- preservation report export,
- optional cloud workspace positioning,
- full iOS 6.x.x through iOS 9.x.x compatibility catalog,
- JSON schemas for the core data model,
- local engines for compatibility, repository scanning, snapshots, and reports,
- production-oriented local core modules for `libimobiledevice` discovery, Debian package index parsing, dependency resolution, guarded operation planning, and JSON workspace persistence,
- reusable Device Doctor core modules for explainable diagnostics, Care repair planning, community intelligence, snapshot intelligence, and health timeline data,
- CLI commands for device discovery, doctor checks, install planning, snapshots, preservation reports, and package index imports,
- automated tests for core parsing, adapter mapping, dependency resolution, and safety gates,
- architecture, integration, community intelligence, and roadmap docs.

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

## Core Principles

- Open-source local core
- Local-first and useful without an account
- Privacy focused
- Safety before convenience
- Transparent compatibility and risk explanations
- Optional cloud services for sync, backup, and community intelligence
- Long-term preservation of legacy hardware

## Technical Direction

The static app is a product and architecture scaffold. The likely production direction is:

1. Tauri desktop shell for macOS, Windows, and Linux.
2. Rust local core for device adapters, SQLite, snapshots, and file IO.
3. Reused web UI for dashboard and marketplace flows.
4. Adapter layer for libimobiledevice, AFC, SSH, package index parsing, and archive discovery.
5. Optional cloud services for encrypted sync, team inventory, and aggregated compatibility intelligence.

See:

- [Architecture](docs/architecture.md)
- [Device Doctor And Care](docs/device-doctor-care.md)
- [Repository Hub And Community Resources](docs/repository-hub.md)
- [Integration Research](docs/integrations.md)
- [Commercial Readiness Plan](docs/commercial-readiness.md)
- [Community Intelligence](docs/community-intelligence.md)
- [Changelog](CHANGELOG.md)
- [Product Blueprint](docs/legacydock-blueprint.md)

## Credits And Prior Art

LegacyDock is inspired by open-source, local-first, and developer-focused products including Docker, n8n, Supabase, Ryujinx, and preservation-minded community projects.

Special ecosystem credit:

- [CatsLover2006/iOSobscuraServer](https://github.com/CatsLover2006/iOSobscuraServer) for useful prior art around searching legacy iOS archival metadata. LegacyDock does not vendor that code in this repository; future archive discovery integrations should credit upstream work, preserve license obligations, and focus on metadata and user-controlled preservation workflows.
- [LukeZGD/Legacy-iOS-Kit](https://github.com/LukeZGD/Legacy-iOS-Kit) for major prior art around restore/downgrade workflows, SHSH blob saving, jailbreak guidance, SSH ramdisk utilities, and legacy device support research. LegacyDock uses it as credited integration research and external handoff inspiration, not as bundled code.
- BigBoss, Cydia/Telesphoreo, ModMyi Archive, Chariz, SkyGlow, Yzu, Galactic Server, and other legacy Cydia repository maintainers for the ecosystem knowledge represented by the Repository Hub seed catalog. LegacyDock stores metadata and user-facing guidance only; it does not mirror, vendor, or redistribute repository packages.
- r/LegacyJailbreak and the broader legacy iOS Discord/forum/archive community for years of device compatibility notes, service restoration research, dead repository reports, and preservation practices.
- TubeRepair, MapsX, Veteris, SBSettings, iFile, Activator, iCleaner, RecordMyScreen, ColoredKnob, LiveWallpaper, and similar legacy projects are credited as ecosystem references in the fixture catalog. Their names, packages, and repositories remain owned by their respective maintainers.

## License

This repository is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
