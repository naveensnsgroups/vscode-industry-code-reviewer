import * as vscode from 'vscode';
import { RuleSeverity } from './rule';

/**
 * Check whether the extension is globally enabled
 */
export function isReviewerEnabled(): boolean {
    const config = vscode.workspace.getConfiguration(
        'industryCodeReviewer'
    );
    return config.get<boolean>('enable', true);
}

/**
 * Get severity for a specific rule
 * off | low | medium | high
 */
export function getRuleSeverity(ruleId: string): RuleSeverity {
    const config = vscode.workspace.getConfiguration(
        'industryCodeReviewer'
    );

    const rules =
        config.get<Record<string, RuleSeverity>>('rules', {});

    // Default severity when rule not configured
    return rules[ruleId] ?? 'low';
}
