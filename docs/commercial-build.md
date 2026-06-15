# Commercial Build

This is the start of the commercial-ready product path. The current milestone adds a local API boundary that a future Tauri, Electron, or native desktop shell can call without depending on a hosted account.

## Local API

Run:

```bash
npm run api
```

Default URL:

```text
http://127.0.0.1:4317
```

## Endpoints

```text
GET  /api/status
GET  /api/commercial/readiness
GET  /api/pricing/plans
GET  /api/devices
GET  /api/devices/:id
GET  /api/devices/:id/doctor
GET  /api/repositories
GET  /api/packages
POST /api/install-plan
POST /api/snapshots
GET  /api/preservation/:deviceId
```

The API is local-first and conservative. It plans operations, creates local snapshots, generates reports, and exposes commercial readiness gates. It does not mutate connected devices.

## Console Integration

`console.html` now attempts to connect to the local API at startup. If the API is available, the console hydrates devices, repositories, packages, and pricing plans from the service. Snapshot capture, preservation report export, and package install planning also route through the API.

If the API is not running, the console stays usable in offline catalog mode with the built-in fixture data. A different API base can be supplied with:

```text
console.html?api=http://127.0.0.1:4317
```

The override is stored in local storage for future console sessions.

## Next Commercial Milestones

- Add a durable SQLite workspace store.
- Add signed desktop packaging.
- Add live AFC and SSH discovery adapters.
- Add Stripe checkout and entitlement verification.
- Add privacy, terms, telemetry consent, and data export pages.
