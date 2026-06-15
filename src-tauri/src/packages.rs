use serde::Serialize;
use std::collections::HashMap;

#[derive(Debug, Serialize)]
pub struct PackageRecord {
    pub id: String,
    pub name: String,
    pub version: String,
    pub dependencies: Vec<String>,
    pub summary: String,
}

fn parse_relationships(value: &str) -> Vec<String> {
    value.split(',')
        .map(|item| item.split('|').next().unwrap_or("").trim())
        .map(|item| item.split('(').next().unwrap_or("").trim().to_string())
        .filter(|item| !item.is_empty())
        .collect()
}

#[tauri::command]
pub fn parse_packages_index(text: String) -> Vec<PackageRecord> {
    text.split("\n\n")
        .filter_map(|block| {
            let fields: HashMap<String, String> = block.lines()
                .filter_map(|line| line.split_once(':'))
                .map(|(key, value)| (key.trim().to_string(), value.trim().to_string()))
                .collect();
            let id = fields.get("Package")?.to_string();
            Some(PackageRecord {
                name: fields.get("Name").cloned().unwrap_or_else(|| id.clone()),
                version: fields.get("Version").cloned().unwrap_or_else(|| "unknown".to_string()),
                dependencies: fields.get("Depends").map(|value| parse_relationships(value)).unwrap_or_default(),
                summary: fields.get("Description").cloned().unwrap_or_else(|| "Imported package metadata.".to_string()),
                id,
            })
        })
        .collect()
}
