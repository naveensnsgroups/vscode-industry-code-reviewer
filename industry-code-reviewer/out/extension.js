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
let diagnostics;
function activate(context) {
    vscode.window.showInformationMessage('Industry Code Reviewer Activated');
    diagnostics = vscode.languages.createDiagnosticCollection('industry-review');
    context.subscriptions.push(diagnostics);
    const analyze = (doc) => {
        if (!doc)
            return;
        if (!['javascript', 'typescript'].includes(doc.languageId))
            return;
        const issues = (0, engine_1.runEngine)(doc);
        diagnosticsService_1.DiagnosticsService.update(doc, issues, diagnostics);
    };
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(analyze), vscode.workspace.onDidSaveTextDocument(analyze), vscode.window.onDidChangeActiveTextEditor(e => analyze(e?.document)));
}
function deactivate() {
    diagnostics?.dispose();
}
//# sourceMappingURL=extension.js.map