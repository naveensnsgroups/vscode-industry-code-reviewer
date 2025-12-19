import * as vscode from 'vscode';
import { getFixForRule } from './fixRegistry';

export class FixProvider implements vscode.CodeActionProvider {

    static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix
    ];

    provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range,
        context: vscode.CodeActionContext
    ): vscode.CodeAction[] {

        const actions: vscode.CodeAction[] = [];

        for (const diagnostic of context.diagnostics) {
            const rule = getFixForRule(String(diagnostic.code));
            if (!rule || !rule.fix) continue;

            const action = new vscode.CodeAction(
                rule.fix.title,
                vscode.CodeActionKind.QuickFix
            );

            action.edit = rule.fix.apply(document, diagnostic as any);
            action.diagnostics = [diagnostic];
            action.isPreferred = true;

            actions.push(action);
        }

        return actions;
    }
}
