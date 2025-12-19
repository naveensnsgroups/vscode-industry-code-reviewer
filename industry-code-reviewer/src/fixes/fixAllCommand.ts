import * as vscode from 'vscode';
import { getFixForRule } from './fixRegistry';

export async function fixAllSafeIssues() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const diagnostics =
        vscode.languages.getDiagnostics(document.uri);

    const workspaceEdit = new vscode.WorkspaceEdit();
    let appliedFixes = 0;

    for (const diagnostic of diagnostics) {
        const rule = getFixForRule(String(diagnostic.code));
        if (!rule || !rule.fix) continue;

        const edit = rule.fix.apply(document, {
            line: diagnostic.range.start.line + 1,
            columnStart: diagnostic.range.start.character,
            columnEnd: diagnostic.range.end.character,
            severity: 'low',
            message: diagnostic.message,
            code: String(diagnostic.code)
        });

        // 🔥 THIS IS THE FIX
        for (const [uri, edits] of edit.entries()) {
            for (const e of edits) {
                workspaceEdit.replace(uri, e.range, e.newText ?? '');
                appliedFixes++;
            }
        }
    }

    if (appliedFixes > 0) {
        await vscode.workspace.applyEdit(workspaceEdit);
    } else {
        vscode.window.showInformationMessage(
            'No safe fixes available'
        );
    }
}
