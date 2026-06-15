use rusqlite::Connection;

const SCHEMA: [&str; 8] = [
    "create table if not exists devices (id text primary key, payload text not null, updated_at text not null)",
    "create table if not exists snapshots (id text primary key, device_id text not null, payload text not null, created_at text not null)",
    "create table if not exists repositories (id text primary key, url text not null, payload text not null, checked_at text)",
    "create table if not exists package_indexes (repository_id text primary key, payload text not null, fetched_at text not null, expires_at text not null)",
    "create table if not exists health_history (id text primary key, device_id text not null, payload text not null, created_at text not null)",
    "create table if not exists submissions (id text primary key, type text not null, status text not null, payload text not null, created_at text not null)",
    "create table if not exists settings (key text primary key, value text not null, updated_at text not null)",
    "create table if not exists entitlements (id text primary key, payload text not null, updated_at text not null)"
];

#[tauri::command]
pub fn initialize_database() -> Result<String, String> {
    let connection = Connection::open("legacydock.sqlite").map_err(|error| error.to_string())?;
    for statement in SCHEMA {
        connection.execute(statement, []).map_err(|error| error.to_string())?;
    }
    Ok("SQLite ready".to_string())
}
