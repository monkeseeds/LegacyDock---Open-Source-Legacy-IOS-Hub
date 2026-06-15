use serde::Serialize;
use std::time::Duration;

#[derive(Debug, Serialize)]
pub struct RepositoryHealth {
    pub url: String,
    pub status: String,
    pub package_index_available: bool,
    pub detail: String,
}

fn package_index_url(url: &str) -> String {
    let trimmed = url.trim_end_matches('/');
    format!("{trimmed}/dists/stable/main/binary-iphoneos-arm/Packages")
}

#[tauri::command]
pub fn check_repository_health(urls: Vec<String>) -> Vec<RepositoryHealth> {
    let client = reqwest::blocking::Client::builder()
        .timeout(Duration::from_secs(5))
        .redirect(reqwest::redirect::Policy::limited(4))
        .build();

    let Ok(client) = client else {
        return urls.into_iter().map(|url| RepositoryHealth {
            url,
            status: "offline".to_string(),
            package_index_available: false,
            detail: "HTTP client unavailable.".to_string(),
        }).collect();
    };

    urls.into_iter().map(|url| {
        let index_url = package_index_url(&url);
        match client.get(&index_url).send() {
            Ok(response) => {
                let status = if response.status().is_success() { "online" } else { "degraded" };
                RepositoryHealth {
                    url,
                    status: status.to_string(),
                    package_index_available: response.status().is_success(),
                    detail: format!("Checked {index_url} with HTTP {}", response.status()),
                }
            }
            Err(error) => RepositoryHealth {
                url,
                status: "offline".to_string(),
                package_index_available: false,
                detail: error.to_string(),
            },
        }
    }).collect()
}
