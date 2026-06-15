# LegacyDock

LegacyDock is an open-source, local-first operating center for preserving, maintaining, repairing, enhancing, and documenting legacy Apple devices running iOS 6 through iOS 9.


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

## Project Link

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

## License

This repository is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
