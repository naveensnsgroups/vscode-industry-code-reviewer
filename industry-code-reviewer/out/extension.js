"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const engine_1 = require("./core/engine");
const diagnosticsService_1 = require("./diagnostics/diagnosticsService");
const registry_1 = require("./core/registry");
const fixRegistry_1 = require("./fixes/fixRegistry");
const fixProvider_1 = require("./fixes/fixProvider");
const applyFixes_1 = require("./fixes/applyFixes");
let diagnostics;
function activate(context) {
    vscode.window.showInformationMessage('Industry Code Reviewer Activated');
    /* ============================
       🔍 DIAGNOSTICS COLLECTION
    ============================ */
    diagnostics = vscode.languages.createDiagnosticCollection('industry-review');
    context.subscriptions.push(diagnostics);
    /* ============================
       🧠 REGISTER RULES & FIXES
    ============================ */
    (0, fixRegistry_1.registerFixes)((0, registry_1.getAllRules)());
    /* ============================
       🔧 QUICK FIX PROVIDER (Ctrl+.)
    ============================ */
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider([
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact'
    ], new fixProvider_1.FixProvider(), {
        providedCodeActionKinds: fixProvider_1.FixProvider.providedCodeActionKinds
    }));
    /* ============================
       🔍 ANALYZE FUNCTION
    ============================ */
    const analyze = (doc) => {
        if (!doc)
            return;
        const supported = [
            'javascript',
            'javascriptreact',
            'typescript',
            'typescriptreact'
        ];
        if (!supported.includes(doc.languageId))
            return;
        const issues = (0, engine_1.runEngine)(doc);
        diagnosticsService_1.DiagnosticsService.update(doc, issues, diagnostics);
    };
    /* ============================
       🔄 FILE EVENTS
    ============================ */
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(analyze), vscode.workspace.onDidSaveTextDocument(async (document) => {
        analyze(document);
        const config = vscode.workspace.getConfiguration('industryCodeReviewer');
        if (!config.get('fixOnSave', false))
            return;
        const fileDiagnostics = vscode.languages.getDiagnostics(document.uri);
        await (0, applyFixes_1.applyFixes)(document, fileDiagnostics);
    }), vscode.window.onDidChangeActiveTextEditor(editor => analyze(editor?.document)));
    /* ============================
       🔍 ANALYZE ACTIVE FILE
    ============================ */
    if (vscode.window.activeTextEditor) {
        analyze(vscode.window.activeTextEditor.document);
    }
    /* ============================
       🛠 FIX ALL SAFE ISSUES COMMAND
    ============================ */
    context.subscriptions.push(vscode.commands.registerCommand('industry-code-reviewer.fixAll', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor');
            return;
        }
        const document = editor.document;
        const diagnosticsForFile = vscode.languages.getDiagnostics(document.uri);
        if (diagnosticsForFile.length === 0) {
            vscode.window.showInformationMessage('No issues found');
            return;
        }
        const applied = await (0, applyFixes_1.applyFixes)(document, diagnosticsForFile);
        vscode.window.showInformationMessage(applied === 0
            ? 'No safe fixes available'
            : `Applied ${applied} safe fix(es)`);
    }));
}
function deactivate() {
    diagnostics?.dispose();
}
//# sourceMappingURL=extension.js.map