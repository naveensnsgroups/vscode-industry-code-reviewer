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
exports.fixAllSafeIssues = fixAllSafeIssues;
const vscode = __importStar(require("vscode"));
const fixRegistry_1 = require("./fixRegistry");
async function fixAllSafeIssues() {
    const editor = vscode.window.activeTextEditor;
    if (!editor)
        return;
    const document = editor.document;
    const diagnostics = vscode.languages.getDiagnostics(document.uri);
    const workspaceEdit = new vscode.WorkspaceEdit();
    let appliedFixes = 0;
    for (const diagnostic of diagnostics) {
        const rule = (0, fixRegistry_1.getFixForRule)(String(diagnostic.code));
        if (!rule || !rule.fix)
            continue;
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
    }
    else {
        vscode.window.showInformationMessage('No safe fixes available');
    }
}
//# sourceMappingURL=fixAllCommand.js.map