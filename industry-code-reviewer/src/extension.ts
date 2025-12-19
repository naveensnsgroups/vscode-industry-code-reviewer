import * as vscode from 'vscode';
import { runEngine } from './core/engine';
import { DiagnosticsService } from './diagnostics/diagnosticsService';
import { getAllRules } from './core/registry';
import { registerFixes, getFixForRule } from './fixes/fixRegistry';
import { FixProvider } from './fixes/fixProvider';
import { RuleIssue } from './core/rule';

let diagnostics: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Industry Code Reviewer Activated');

    /* ============================
       🔍 DIAGNOSTICS COLLECTION
    ============================ */
    diagnostics = vscode.languages.createDiagnosticCollection(
        'industry-review'
    );
    context.subscriptions.push(diagnostics);

    /* ============================
       🧠 REGISTER RULES & FIXES
    ============================ */
    const rules = getAllRules();
    registerFixes(rules);

    /* ============================
       🔧 QUICK FIX PROVIDER
    ============================ */
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(
            [
                'javascript',
                'javascriptreact',
                'typescript',
                'typescriptreact'
            ],
            new FixProvider(),
            {
                providedCodeActionKinds:
                    FixProvider.providedCodeActionKinds
            }
        )
    );

    /* ============================
       🔍 ANALYZE FUNCTION
    ============================ */
    const analyze = (doc?: vscode.TextDocument) => {
        if (!doc) return;

        const supportedLanguages = [
            'javascript',
            'javascriptreact',
            'typescript',
            'typescriptreact'
        ];

        if (!supportedLanguages.includes(doc.languageId)) return;

        const issues = runEngine(doc);
        DiagnosticsService.update(doc, issues, diagnostics);
    };

    /* ============================
       🔄 FILE EVENTS
    ============================ */
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(analyze),
        vscode.workspace.onDidSaveTextDocument(analyze),
        vscode.window.onDidChangeActiveTextEditor(editor =>
            analyze(editor?.document)
        )
    );

    if (vscode.window.activeTextEditor) {
        analyze(vscode.window.activeTextEditor.document);
    }

    /* =====================================================
       🛠 PHASE 2 — FIX ALL SAFE ISSUES (FINAL VERSION)
    ===================================================== */
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'industry-code-reviewer.fixAll',
            async () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showWarningMessage(
                        'No active editor'
                    );
                    return;
                }

                const document = editor.document;
                const fileDiagnostics =
                    vscode.languages.getDiagnostics(document.uri);

                if (fileDiagnostics.length === 0) {
                    vscode.window.showInformationMessage(
                        'No issues found'
                    );
                    return;
                }

                const workspaceEdit = new vscode.WorkspaceEdit();
                let appliedFixes = 0;

                for (const diagnostic of fileDiagnostics) {
                    const rule = getFixForRule(
                        String(diagnostic.code)
                    );
                    if (!rule || !rule.fix) continue;

                    const issue: RuleIssue = {
                        line:
                            diagnostic.range.start.line + 1,
                        columnStart:
                            diagnostic.range.start.character,
                        columnEnd:
                            diagnostic.range.end.character,
                        severity: 'low',
                        message: diagnostic.message,
                        code: String(diagnostic.code)
                    };

                    const edit = rule.fix.apply(
                        document,
                        issue
                    );

                    for (const [uri, edits] of edit.entries()) {
                        for (const e of edits) {
                            // ✅ Supports delete & replace safely
                            workspaceEdit.replace(
                                uri,
                                e.range,
                                e.newText ?? ''
                            );
                            appliedFixes++;
                        }
                    }
                }

                if (appliedFixes === 0) {
                    vscode.window.showInformationMessage(
                        'No safe fixes available'
                    );
                    return;
                }

                await vscode.workspace.applyEdit(workspaceEdit);

                vscode.window.showInformationMessage(
                    `Applied ${appliedFixes} safe fix(es)`
                );
            }
        )
    );
}

export function deactivate() {
    diagnostics?.dispose();
}
