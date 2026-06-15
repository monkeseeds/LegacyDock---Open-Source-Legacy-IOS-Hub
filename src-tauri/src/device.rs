use serde::Serialize;
use std::collections::HashMap;
use std::process::Command;

#[derive(Debug, Serialize)]
pub struct DeviceProfile {
    pub id: String,
    pub name: String,
    pub identifier: String,
    pub firmware: String,
    pub battery_health: Option<u8>,
    pub status: String,
}

#[derive(Debug, Serialize)]
pub struct DiscoveryResult {
    pub devices: Vec<DeviceProfile>,
    pub diagnostics: Vec<String>,
}

fn parse_key_values(text: &str) -> HashMap<String, String> {
    text.lines()
        .filter_map(|line| line.split_once(':'))
        .map(|(key, value)| (key.trim().to_string(), value.trim().to_string()))
        .collect()
}

fn read_lockdown(udid: &str) -> Result<DeviceProfile, String> {
    let output = Command::new("ideviceinfo")
        .arg("-u")
        .arg(udid)
        .output()
        .map_err(|error| format!("ideviceinfo unavailable: {error}"))?;
    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }
    let values = parse_key_values(&String::from_utf8_lossy(&output.stdout));
    Ok(DeviceProfile {
        id: udid.to_string(),
        name: values.get("DeviceName").cloned().unwrap_or_else(|| "Legacy iOS device".to_string()),
        identifier: values.get("ProductType").cloned().unwrap_or_else(|| "Unknown".to_string()),
        firmware: values.get("ProductVersion").cloned().unwrap_or_else(|| "Unknown".to_string()),
        battery_health: values.get("BatteryCurrentCapacity").and_then(|value| value.parse::<u8>().ok()),
        status: "detected".to_string(),
    })
}

#[tauri::command]
pub fn discover_devices() -> Result<DiscoveryResult, String> {
    let output = Command::new("idevice_id")
        .arg("-l")
        .output()
        .map_err(|error| format!("idevice_id unavailable: {error}"))?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    let mut devices = Vec::new();
    let mut diagnostics = Vec::new();
    for udid in String::from_utf8_lossy(&output.stdout).lines().map(str::trim).filter(|line| !line.is_empty()) {
        match read_lockdown(udid) {
            Ok(device) => devices.push(device),
            Err(error) => diagnostics.push(format!("{udid}: {error}")),
        }
    }

    Ok(DiscoveryResult { devices, diagnostics })
}
