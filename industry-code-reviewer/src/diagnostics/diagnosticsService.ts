import * as vscode from 'vscode';
import { RuleIssue } from '../core/rule';

export class DiagnosticsService {
    static update(
        document: vscode.TextDocument,
        issues: RuleIssue[],
        collection: vscode.DiagnosticCollection
    ) {
        const diagnostics = issues.map(issue => {
            const range = new vscode.Range(
                new vscode.Position(issue.line - 1, issue.columnStart),
                new vscode.Position(issue.line - 1, issue.columnEnd)
            );

            const diag = new vscode.Diagnostic(
                range,
                issue.message,
                issue.severity === 'high'
                    ? vscode.DiagnosticSeverity.Error
                    : vscode.DiagnosticSeverity.Warning
            );

            diag.source = 'Industry Code Reviewer';
            diag.code = issue.code;

            return diag;
        });

        collection.set(document.uri, diagnostics);
    }
}
