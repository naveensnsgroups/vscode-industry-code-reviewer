import { Rule, RuleIssue } from '../../core/rule';
import * as vscode from 'vscode';

export const noConsoleLogRule: Rule = {
    // ✅ MUST MATCH issue.code
    id: 'CONSOLE_LOG',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            const col = line.indexOf('console.log');
            if (col !== -1) {
                issues.push({
                    line: index + 1,
                    columnStart: col,
                    columnEnd: line.length,
                    severity: 'low',
                    message: 'Avoid console.log in production code',
                    code: 'CONSOLE_LOG'
                });
            }
        });

        return issues;
    },

    // ✅ SAFE FIX
    fix: {
        title: 'Remove console.log',
        apply(document, issue) {
            const edit = new vscode.WorkspaceEdit();

            edit.delete(
                document.uri,
                new vscode.Range(
                    issue.line - 1,
                    issue.columnStart,
                    issue.line - 1,
                    issue.columnEnd
                )
            );

            return edit;
        }
    }
};
