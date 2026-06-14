# LegacyDock

LegacyDock is an open-source, local-first operating center for preserving, maintaining, repairing, enhancing, and documenting legacy Apple devices running iOS 6 through iOS 9.

It is not another jailbreak tool, piracy surface, or package manager clone. LegacyDock is meant to become the trusted hub users open when they need to understand an old iPhone, iPad, or iPod touch and safely manage its software environment.

## What Is Included Now

This repository now contains a fuller static product foundation:

- proper landing page with a retro-modern Apple-inspired visual direction,
- Jan.ai-inspired product storytelling and Flathub-inspired browse/storefront flow,
- working product console demo,
- device dashboard,
- compatibility-aware marketplace,
- explainable package safety review,
- repository health scanner,
- restoration guidance lab,
- snapshot creation and diffing,
- preservation report export,
- optional cloud workspace positioning,
- JSON schemas for the core data model,
- local engines for compatibility, repository scanning, snapshots, and reports,
- architecture, integration, community intelligence, and roadmap docs.

The site is built with static HTML, CSS, and JavaScript so it can run directly on GitHub Pages without a build pipeline.

## Try It Locally

Open `index.html` in a browser.

For a simple local server:

```bash
npx serve .
```

Then open the shown local URL.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- app.js
|-- assets/
|   |-- legacydock-hero.png
|   `-- logodock.svg
|-- src/
|   |-- data/
|   |   |-- catalog.js
|   |   `-- restorationMatrix.js
|   `-- lib/
|       |-- adapters.js
|       |-- compatibility.js
|       |-- localStore.js
|       |-- preservationReport.js
|       |-- restorationAdvisor.js
|       |-- repositoryScanner.js
|       `-- snapshotEngine.js
|-- schemas/
|-- docs/
`-- .github/workflows/pages.yml
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
- [Integration Research](docs/integrations.md)
- [Community Intelligence](docs/community-intelligence.md)
- [Roadmap](docs/roadmap.md)
- [Product Blueprint](docs/legacydock-blueprint.md)

## Credits And Prior Art

LegacyDock is inspired by open-source, local-first, and developer-focused products including Docker, n8n, Supabase, Ryujinx, and preservation-minded community projects.

Special ecosystem credit:

- [CatsLover2006/iOSobscuraServer](https://github.com/CatsLover2006/iOSobscuraServer) for useful prior art around searching legacy iOS archival metadata. LegacyDock does not vendor that code in this repository; future archive discovery integrations should credit upstream work, preserve license obligations, and focus on metadata and user-controlled preservation workflows.
- [LukeZGD/Legacy-iOS-Kit](https://github.com/LukeZGD/Legacy-iOS-Kit) for major prior art around restore/downgrade workflows, SHSH blob saving, jailbreak guidance, SSH ramdisk utilities, and legacy device support research. LegacyDock uses it as credited integration research and external handoff inspiration, not as bundled code.

## Legal And Safety Notes

LegacyDock should not distribute copyrighted apps, bypass licensing, host exploit chains, or encourage piracy. The project should focus on user-owned devices, metadata, compatibility intelligence, package state, repository management, local backups, and preservation reports.

Every device-changing operation should show compatibility, risk, known issues, recovery options, and snapshot recommendations before execution.

## License

This repository is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
