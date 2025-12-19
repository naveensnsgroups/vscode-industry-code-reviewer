import * as vscode from 'vscode';
import { runEngine } from './core/engine';
import { DiagnosticsService } from './diagnostics/diagnosticsService';

let diagnostics: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Industry Code Reviewer Activated');

    diagnostics = vscode.languages.createDiagnosticCollection('industry-review');
    context.subscriptions.push(diagnostics);

    const analyze = (doc?: vscode.TextDocument) => {
        if (!doc) return;
        if (!['javascript', 'typescript'].includes(doc.languageId)) return;

        const issues = runEngine(doc);
        DiagnosticsService.update(doc, issues, diagnostics);
    };

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(analyze),
        vscode.workspace.onDidSaveTextDocument(analyze),
        vscode.window.onDidChangeActiveTextEditor(e => analyze(e?.document))
    );
}

export function deactivate() {
    diagnostics?.dispose();
}
