import * as vscode from 'vscode';
import { runEngine } from './core/engine';
import { DiagnosticsService } from './diagnostics/diagnosticsService';
import { getAllRules } from './core/registry';
import { registerFixes } from './fixes/fixRegistry';
import { FixProvider } from './fixes/fixProvider';
import { applyFixes } from './fixes/applyFixes';

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
    registerFixes(getAllRules());

    /* ============================
       🔧 QUICK FIX PROVIDER (Ctrl+.)
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

        const supported = [
            'javascript',
            'javascriptreact',
            'typescript',
            'typescriptreact'
        ];

        if (!supported.includes(doc.languageId)) return;

        const issues = runEngine(doc);
        DiagnosticsService.update(doc, issues, diagnostics);
    };

    /* ============================
       🔄 FILE EVENTS
    ============================ */
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(analyze),

        vscode.workspace.onDidSaveTextDocument(async document => {
            analyze(document);

            const config =
                vscode.workspace.getConfiguration(
                    'industryCodeReviewer'
                );

            if (!config.get<boolean>('fixOnSave', false)) return;

            const fileDiagnostics =
                vscode.languages.getDiagnostics(document.uri);

            await applyFixes(document, fileDiagnostics);
        }),

        vscode.window.onDidChangeActiveTextEditor(editor =>
            analyze(editor?.document)
        )
    );

    /* ============================
       🔍 ANALYZE ACTIVE FILE
    ============================ */
    if (vscode.window.activeTextEditor) {
        analyze(vscode.window.activeTextEditor.document);
    }

    /* ============================
       🛠 FIX ALL SAFE ISSUES COMMAND
    ============================ */
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
                const diagnosticsForFile =
                    vscode.languages.getDiagnostics(
                        document.uri
                    );

                if (diagnosticsForFile.length === 0) {
                    vscode.window.showInformationMessage(
                        'No issues found'
                    );
                    return;
                }

                const applied = await applyFixes(
                    document,
                    diagnosticsForFile
                );

                vscode.window.showInformationMessage(
                    applied === 0
                        ? 'No safe fixes available'
                        : `Applied ${applied} safe fix(es)`
                );
            }
        )
    );
}

export function deactivate() {
    diagnostics?.dispose();
}
