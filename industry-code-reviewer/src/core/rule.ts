import * as vscode from 'vscode';
export interface RuleContext {
    text: string;
    document: any;
}

export interface RuleIssue {
    line: number;
    columnStart: number;
    columnEnd: number;
    severity: 'low' | 'medium' | 'high';
    message: string;
    code: string;
}

export interface RuleFix {
    title: string;
    apply(
        document: vscode.TextDocument,
        issue: RuleIssue
    ): vscode.WorkspaceEdit;
}

export interface Rule {
    id: string;
    run(context: RuleContext): RuleIssue[];
    fix?: RuleFix; // 👈 optional fix per rule
}
