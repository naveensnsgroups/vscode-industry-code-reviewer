import * as vscode from 'vscode';

const SUPPORTED_LANGUAGES = [
    'javascript',
    'typescript',
    'javascriptreact',
    'typescriptreact'
];

export function shouldAnalyze(document: vscode.TextDocument): boolean {
    return SUPPORTED_LANGUAGES.includes(document.languageId);
}
