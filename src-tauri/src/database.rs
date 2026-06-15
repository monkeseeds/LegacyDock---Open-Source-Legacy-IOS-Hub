use rusqlite::Connection;
use crate::migrations::run_migrations;

#[tauri::command]
pub fn initialize_database() -> Result<String, String> {
    let connection = Connection::open("legacydock.sqlite").map_err(|error| error.to_string())?;
    let applied = run_migrations(&connection).map_err(|error| error.to_string())?;
    Ok(format!("SQLite ready, {} migration(s) applied", applied.len()))
}
