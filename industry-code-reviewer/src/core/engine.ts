import * as vscode from 'vscode';
import { getAllRules } from './registry';
import { RuleIssue } from './rule';
import { createContext } from './context';
import {
    getRuleSeverity,
    isReviewerEnabled
} from './config';

export function runEngine(
    document: vscode.TextDocument
): RuleIssue[] {

    // 🔕 Extension disabled globally
    if (!isReviewerEnabled()) {
        return [];
    }

    const context = createContext(document);
    const rules = getAllRules();

    const issues: RuleIssue[] = [];

    for (const rule of rules) {
        try {
            const severity = getRuleSeverity(rule.id);

            // 🔕 Rule disabled
            if (severity === 'off') continue;

            const ruleIssues = rule.run(context);

            // 🎚 Override severity from user config
            for (const issue of ruleIssues) {
                issue.severity = severity;
            }

            issues.push(...ruleIssues);

        } catch (error) {
            console.error(
                `[Industry Code Reviewer] Rule failed: ${rule.id}`,
                error
            );
        }
    }

    return issues;
}
