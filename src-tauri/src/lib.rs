mod database;
mod device;
mod diagnostics;
mod mutation;
mod packages;
mod repository;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            database::initialize_database,
            device::discover_devices,
            diagnostics::run_device_doctor,
            mutation::plan_safe_mutation,
            packages::parse_packages_index,
            repository::check_repository_health
        ])
        .run(tauri::generate_context!())
        .expect("error while running LegacyDock");
}
