use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct MutationPlan {
    pub device_id: String,
    pub target: String,
    pub confirmation_phrase: String,
    pub supplied_confirmation: String,
    pub snapshot_id: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct MutationDecision {
    pub status: String,
    pub execution: String,
    pub rollback_available: bool,
    pub message: String,
}

#[tauri::command]
pub fn plan_safe_mutation(plan: MutationPlan) -> MutationDecision {
    if plan.snapshot_id.is_none() {
        return MutationDecision {
            status: "blocked".to_string(),
            execution: "none".to_string(),
            rollback_available: false,
            message: "A verified snapshot is required before mutation.".to_string(),
        };
    }

    if plan.confirmation_phrase != plan.supplied_confirmation {
        return MutationDecision {
            status: "blocked".to_string(),
            execution: "none".to_string(),
            rollback_available: true,
            message: format!("Confirmation phrase must match: {}", plan.confirmation_phrase),
        };
    }

    MutationDecision {
        status: "queued-dry-run".to_string(),
        execution: "dry-run".to_string(),
        rollback_available: true,
        message: format!("{} queued for {}. No device changes were made.", plan.target, plan.device_id),
    }
}
