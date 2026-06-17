# Changelog

## 2026-06-17

- Wired the desktop app to the official Supabase JS client for optional hosted magic-link auth, added Vite-safe environment variables, and kept the service key out of the app boundary.
- Added a real-device beta QA panel to the desktop Reports surface plus a dedicated QA runbook for Windows libimobiledevice checks, package-manager detection, and read-only device validation.
- Rebuilt the current Windows `0.1.0` installers, removed stale smoke-test artifacts, refreshed the signed updater manifest, and updated the public Releases page to reflect the live Windows preview state and blocker list.
- Fixed remaining desktop clipping and wrapping issues in the reports, updater, privacy, and Device Doctor surfaces.
- Expanded privacy notes and terms into fuller local-first operational docs with clearer local/export/delete boundaries and hosted-cloud caveats.
- Added a Supabase cloud contract doc, env contract, starter RLS/schema SQL scaffold, and commercial API route for hosted auth/storage planning without shipping secrets.
- Added a formal beta release checklist with build, signing, updater, rollback, privacy, attribution, and hardware QA gates.
- Expanded third-party license review into a real inventory/status document and added a release-facing `THIRD_PARTY_NOTICES.md` file.

## 2026-06-16

- Wired the Tauri updater plugin into the desktop app, added updater permissions/capabilities, enabled updater artifact generation, added a desktop update center, and generated a real signed `updates/stable.json` manifest from the Windows NSIS bundle.
- Installed the Windows `libimobiledevice` binaries locally into `tools/libimobiledevice/win-x64`, added a repeatable bootstrap script, and taught both the Node adapter and the Tauri Rust device layer to look for that repo-local tool path.
- Added local updater-signing support by wiring root Tauri build scripts through an env loader that reads `.env` and `.env.local`, including `TAURI_SIGNING_PRIVATE_KEY_PATH` and `TAURI_PUBLIC_KEY_PATH`.
- Generated and documented the local updater-key workflow for Tauri signing without touching Windows code-signing, which remains blocked on the certificate.
- Finished desktop privacy and data-control flows with visible consent toggles, local-only mode, text and JSON export actions, and local workspace deletion controls.
- Marked privacy/legal readiness complete in the local commercial API, added a local delete endpoint, and updated the privacy, terms, and Windows setup docs to match the current desktop behavior.

## 2026-06-15

- Switched the active production release setup to Windows 10/11 only with NSIS/MSI packaging, Windows signing placeholders, updater endpoint planning, Supabase-ready configuration, and a Windows production setup guide.
- Updated Care yearly pricing to $49.99/year with a "2 months free!" badge, changed the website console into a desktop app showcase, restored its footer, removed bottom whitespace, and tightened mock-card text wrapping.
- Simplified pricing by removing the Studio card and folding Care Yearly into a switchable LegacyDock Care plan card.
- Restyled the website and Tauri app with a legacy Apple/Cydia-inspired visual system using Helvetica, brushed-metal headers, linen backgrounds, glossy aqua controls, and classic utility panels.
- Added the full desktop Console workspace to the Tauri app with Devices, Repositories, Package Browser, Device Doctor, Snapshots, Reports, and resource views.
- Added the Releases page, replaced public Browse/Open Console navigation with Releases, and configured GitHub Actions to build Windows and macOS desktop artifacts.
- Replaced the LegacyDock logo assets with the supplied SVG and added the desktop Setup Wizard flow for local legacy iOS onboarding.
- Installed desktop npm dependencies, added the desktop lockfile, upgraded Vite tooling to clear npm audit findings, and verified the React/Vite production build.
- Updated README direction, added Windows-first Tauri packaging targets, update-feed scaffold, Rust SQLite migration runner, privacy/terms docs, and preliminary third-party license review.
- Added the Tauri desktop application scaffold with React, Vite, Tailwind, Rust command modules, SQLite initialization, repository health checks, package parsing, device discovery boundaries, and dry-run mutation planning.
- Added commercial readiness contracts for desktop shell behavior, durable SQLite-style storage, read-only live inspection, safe mutation queueing, package index ingestion, entitlements, encrypted cloud sync, compliance, and release manifests.
- Added release verification workflow scaffolding for syntax checks, tests, and source checksums without requiring signing certificates or store credentials.
- Wired the console to the local commercial API with offline catalog fallback, API status display, API-backed install planning, snapshot capture, and preservation report export.
- Began the commercial build with a local API service for status, readiness gates, devices, Device Doctor, repositories, packages, install plans, snapshots, preservation reports, and pricing plans.
- Added the Legacy Repository Hub with searchable repository cards, health status, Cydia add/copy actions, package browsing, essential tweaks, service restoration catalog, dead repo archive, community resources, and smart recommendations.
- Updated credits and prior-art notes for legacy repository maintainers, service restoration projects, and community resources represented in the Repository Hub.
- Expanded Device Doctor into an explainable health dashboard with performance, stability, battery, storage, compatibility, repository, and overall health scores.
- Added LegacyDock Care intelligence panels for repair plans, community intelligence, bootloop risk, smart alternatives, modernization guidance, snapshot intelligence, and health timeline.
- Updated pricing around the "scanning is free, intelligence is premium" model with LegacyDock Care at $4.99/month or $49.99/year.
- Added a production-oriented local core with `libimobiledevice` discovery, Debian package index parsing, dependency resolution, guarded install planning, and JSON workspace persistence.
- Added `cli.js` commands for device discovery, doctor checks, install planning, snapshots, preservation reports, and package index imports.
- Added automated Node tests for adapter mapping, package index parsing, dependency resolution, and device mutation safety gates.
- Added a commercial readiness document that separates current working capabilities from remaining paid-product release gates.

## 2026-06-14

- Rebuilt the public website UI around the supplied LegacyDock reference style with a black device hero, white feature cards, Device Doctor preview, updated statistics, and matching public-page treatment.
- Added standalone `docs.html`, `changelog.html`, and `pricing.html` pages.
- Updated homepage and console navigation to route to the standalone pages.
- Split the working console into `console.html`.
- Rebuilt the landing page around Docs, Changelog, and Pricing.
- Added the attached LegacyDock SVG logo as the primary brand asset.
- Added vector icons for GitHub, theme controls, package cards, preservation, SHSH, cleanup, archive, SSH, battery, files, and compatibility.
- Added a full iOS 6.x.x through iOS 9.x.x compatibility catalog covering 44 releases from iOS 6.0 through iOS 9.3.6.
- Added console deep links such as `console.html#marketplace`, `console.html#restoration`, and `console.html#cloud`.
- Switched the site to start in dark theme by default.

## Earlier

- Added Legacy iOS Kit restoration guidance.
- Built the LegacyDock product foundation with a dashboard, marketplace, health center, snapshots, preservation reports, schemas, and docs.
