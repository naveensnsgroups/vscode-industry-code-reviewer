import * as vscode from 'vscode';
import { getAllRules } from './registry';
import { RuleIssue } from './rule';
import { createContext } from './context';

export function runEngine(document: vscode.TextDocument): RuleIssue[] {
    const context = createContext(document);
    const rules = getAllRules();

    const issues: RuleIssue[] = [];

    for (const rule of rules) {
        try {
            const ruleIssues = rule.run(context);
            issues.push(...ruleIssues);
        } catch (error) {
            console.error(`Rule failed: ${rule.id}`, error);
        }
    }

    return issues;
}
