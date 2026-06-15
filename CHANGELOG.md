# Changelog

## 2026-06-15

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
- Updated pricing around the "scanning is free, intelligence is premium" model with LegacyDock Care at $4.99/month or $39/year.
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
