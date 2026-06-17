# Supabase Cloud Contract

LegacyDock stays local-first. Supabase is the optional hosted layer for sync, backups, teams, moderation, and future paid entitlements.

## Recommended Boundary

- free setup, diagnostics, repository guidance, exports, and local reports stay account-free
- hosted auth is only required for optional cloud features
- the desktop app uses the anon key only
- the service key stays server-only

## Env Contract

Client-side:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_AUTH_REDIRECT_URL=legacydock://auth/callback
```

The desktop app reads the `VITE_` values through Vite and initializes the official Supabase JS client. The anon key can ship in the app; the service key cannot.

Server-side only:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```

Operational:

```env
SUPABASE_PROJECT_REF=
SUPABASE_STORAGE_BUCKET_EXPORTS=legacydock-exports
SUPABASE_STORAGE_BUCKET_BACKUPS=legacydock-backups
SUPABASE_STORAGE_BUCKET_REPORTS=legacydock-reports
SUPABASE_STORAGE_BUCKET_COMMUNITY=legacydock-community
```

## Auth Model

Recommended default:

- keep the free desktop experience local-only
- use email magic-link auth for the first hosted flow
- require hosted auth only when cloud sync, backups, teams, moderation, or paid intelligence are turned on
- keep local diagnostics, exports, and setup guidance usable without an account

Current desktop status:

- `Console > Reports` has a hosted auth panel
- the panel sends a Supabase magic link when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present
- sign-out is wired through `supabase.auth.signOut()`
- native deep-link callback handling still needs final Tauri registration before production

## Tables

The current scaffold covers:

- `profiles`
- `devices`
- `snapshots`
- `reports`
- `compatibility_submissions`
- `team_memberships`
- `billing_customers`

See [supabase/legacydock-cloud.sql](../supabase/legacydock-cloud.sql) for the first schema and RLS scaffold.

## Storage Buckets

- `legacydock-exports` private
- `legacydock-backups` private
- `legacydock-reports` private
- `legacydock-community` private and moderation-gated

No public bucket should be used for device exports, backups, or diagnostics.

## RLS Rules

Every user table needs row-level security before launch.

Minimum policy shape:

- users can read and write their own profiles, devices, snapshots, reports, and exports
- team data requires explicit membership
- moderation queues are admin-only
- service-role flows are restricted to backend jobs

## Launch Checklist

- choose the hosted auth model
- apply the SQL schema and RLS policies
- create storage buckets and storage policies
- wire the desktop auth callback
- verify export/delete parity between local and hosted records
- add moderation and retention docs before public submissions open
