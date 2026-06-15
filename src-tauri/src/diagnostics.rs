use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct DeviceInput {
    pub id: String,
    pub name: String,
    pub identifier: String,
    pub firmware: String,
    pub battery_health: Option<u8>,
    pub status: String,
}

#[derive(Debug, Serialize)]
pub struct DoctorScore {
    pub label: String,
    pub value: u8,
    pub explanation: String,
}

fn clamp(value: i16) -> u8 {
    value.clamp(0, 100) as u8
}

#[tauri::command]
pub fn run_device_doctor(device: DeviceInput) -> Vec<DoctorScore> {
    let battery = device.battery_health.unwrap_or(82);
    let firmware_supported = device.firmware.starts_with('6')
        || device.firmware.starts_with('7')
        || device.firmware.starts_with('8')
        || device.firmware.starts_with('9');
    let compatibility = if firmware_supported { 96 } else { 64 };
    let stability = if device.status == "detected" { 88 } else { 82 };
    let repository = if device.identifier == "Unknown" { 72 } else { 91 };
    let overall = ((battery as u16 + compatibility as u16 + stability as u16 + repository as u16) / 4) as u8;

    vec![
        DoctorScore { label: "Overall Health".to_string(), value: overall, explanation: "Average of battery, compatibility, stability, and repository readiness.".to_string() },
        DoctorScore { label: "Battery".to_string(), value: clamp(battery as i16), explanation: "Uses lockdown battery capacity when available.".to_string() },
        DoctorScore { label: "Compatibility".to_string(), value: compatibility, explanation: "Checks whether firmware is in the iOS 6-9 support window.".to_string() },
        DoctorScore { label: "Stability".to_string(), value: stability, explanation: "Starts conservative until package state is parsed.".to_string() },
        DoctorScore { label: "Repository Health".to_string(), value: repository, explanation: "Improves after source list and Packages indexes are inspected.".to_string() },
    ]
}
