use rusqlite::{params, Connection};

pub struct Migration {
    pub version: i64,
    pub name: &'static str,
    pub statements: &'static [&'static str],
}

const MIGRATIONS: &[Migration] = &[
    Migration {
        version: 1,
        name: "commercial_core",
        statements: &[
            "create table if not exists devices (id text primary key, payload text not null, updated_at text not null)",
            "create table if not exists snapshots (id text primary key, device_id text not null, payload text not null, created_at text not null)",
            "create table if not exists repositories (id text primary key, url text not null, payload text not null, checked_at text)",
            "create table if not exists package_indexes (repository_id text primary key, payload text not null, fetched_at text not null, expires_at text not null)",
            "create table if not exists health_history (id text primary key, device_id text not null, payload text not null, created_at text not null)",
            "create table if not exists submissions (id text primary key, type text not null, status text not null, payload text not null, created_at text not null)",
            "create table if not exists settings (key text primary key, value text not null, updated_at text not null)",
            "create table if not exists entitlements (id text primary key, payload text not null, updated_at text not null)"
        ],
    },
];

pub fn run_migrations(connection: &Connection) -> Result<Vec<String>, rusqlite::Error> {
    connection.execute(
        "create table if not exists schema_migrations (
            version integer primary key,
            name text not null,
            applied_at text not null default current_timestamp
        )",
        [],
    )?;

    let mut applied = Vec::new();
    for migration in MIGRATIONS {
        let exists: i64 = connection.query_row(
            "select count(*) from schema_migrations where version = ?1",
            params![migration.version],
            |row| row.get(0),
        )?;
        if exists > 0 {
            continue;
        }

        let transaction = connection.unchecked_transaction()?;
        for statement in migration.statements {
            transaction.execute(statement, [])?;
        }
        transaction.execute(
            "insert into schema_migrations (version, name) values (?1, ?2)",
            params![migration.version, migration.name],
        )?;
        transaction.commit()?;
        applied.push(format!("{}:{}", migration.version, migration.name));
    }

    Ok(applied)
}
