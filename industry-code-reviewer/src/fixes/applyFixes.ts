import * as vscode from 'vscode';
import { getFixForRule } from './fixRegistry';

export async function applyFixes(
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[]
): Promise<number> {
    const workspaceEdit = new vscode.WorkspaceEdit();
    let applied = 0;

    for (const diagnostic of diagnostics) {
        const rule = getFixForRule(String(diagnostic.code));
        if (!rule || !rule.fix) continue;

        const edit = rule.fix.apply(document, diagnostic as any);
        if (!edit) continue;

        for (const [uri, edits] of edit.entries()) {
            for (const e of edits) {
                workspaceEdit.replace(uri, e.range, e.newText);
                applied++;
            }
        }
    }

    if (applied > 0) {
        await vscode.workspace.applyEdit(workspaceEdit);
    }

    return applied;
}
