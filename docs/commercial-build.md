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

## Next Commercial Milestones

- Wire the web console to the local API when running inside a desktop shell.
- Add a durable SQLite workspace store.
- Add signed desktop packaging.
- Add live AFC and SSH discovery adapters.
- Add Stripe checkout and entitlement verification.
- Add privacy, terms, telemetry consent, and data export pages.
