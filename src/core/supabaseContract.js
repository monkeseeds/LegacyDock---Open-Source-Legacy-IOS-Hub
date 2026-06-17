export function supabaseEnvContract() {
  return {
    requiredClientEnv: [
      "SUPABASE_URL",
      "SUPABASE_ANON_KEY",
      "SUPABASE_AUTH_REDIRECT_URL"
    ],
    requiredServerEnv: [
      "SUPABASE_SERVICE_KEY"
    ],
    optionalEnv: [
      "SUPABASE_PROJECT_REF",
      "SUPABASE_STORAGE_BUCKET_EXPORTS",
      "SUPABASE_STORAGE_BUCKET_BACKUPS",
      "SUPABASE_STORAGE_BUCKET_REPORTS",
      "SUPABASE_STORAGE_BUCKET_COMMUNITY"
    ],
    authMode: "decision-pending",
    recommendation: "Use local-only free mode by default and add hosted auth only for optional sync, backups, teams, and moderation."
  };
}

export function supabaseSchemaPlan() {
  return {
    tables: [
      "profiles",
      "devices",
      "snapshots",
      "reports",
      "compatibility_submissions",
      "moderation_queue",
      "team_memberships",
      "billing_customers"
    ],
    storageBuckets: [
      { name: "legacydock-exports", access: "private" },
      { name: "legacydock-backups", access: "private" },
      { name: "legacydock-reports", access: "private" },
      { name: "legacydock-community", access: "private-moderated" }
    ],
    rlsRules: [
      "users can read and write only their own profiles, devices, snapshots, reports, and exports",
      "team data requires explicit membership",
      "moderation queues are admin-only",
      "service key stays server-only and never ships in the desktop app"
    ]
  };
}

export function supabaseLaunchChecklist() {
  return [
    "choose hosted auth model",
    "apply schema and RLS policies",
    "create storage buckets and storage policies",
    "wire desktop redirect callback",
    "test export and delete parity between local and hosted records"
  ];
}
