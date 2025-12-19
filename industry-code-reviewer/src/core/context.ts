import * as vscode from 'vscode';

export interface RuleContext {
    document: vscode.TextDocument;
    text: string;
    languageId: string;
    fileName: string;
}

export function createContext(document: vscode.TextDocument): RuleContext {
    return {
        document,
        text: document.getText(),
        languageId: document.languageId,
        fileName: document.fileName
    };
}
