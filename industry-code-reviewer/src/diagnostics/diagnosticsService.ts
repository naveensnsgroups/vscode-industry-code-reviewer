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

            const diagnostic = new vscode.Diagnostic(
                range,
                issue.message,
                mapSeverity(issue.severity)
            );

            diagnostic.source = 'Industry Code Reviewer';
            diagnostic.code = issue.code;

            return diagnostic;
        });

        collection.set(document.uri, diagnostics);
    }
}

function mapSeverity(
    severity: RuleIssue['severity']
): vscode.DiagnosticSeverity {
    switch (severity) {
        case 'low':
            return vscode.DiagnosticSeverity.Information;
        case 'medium':
            return vscode.DiagnosticSeverity.Warning;
        case 'high':
            return vscode.DiagnosticSeverity.Error;
        default:
            return vscode.DiagnosticSeverity.Warning;
    }
}
