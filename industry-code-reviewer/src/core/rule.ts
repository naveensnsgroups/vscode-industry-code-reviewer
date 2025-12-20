import * as vscode from 'vscode';

/* =========================
   RULE SEVERITY & CONFIG
========================= */

export type RuleSeverity = 'off' | 'low' | 'medium' | 'high';

export interface RuleConfig {
    severity: RuleSeverity;
}

/* =========================
   RULE CONTEXT
========================= */

export interface RuleContext {
    text: string;
    document: vscode.TextDocument;
}

/* =========================
   RULE ISSUE
========================= */

export interface RuleIssue {
    line: number;
    columnStart: number;
    columnEnd: number;
    severity: RuleSeverity;
    message: string;
    code: string;
}

/* =========================
   RULE FIX
========================= */

export interface RuleFix {
    title: string;
    apply(
        document: vscode.TextDocument,
        issue: RuleIssue
    ): vscode.WorkspaceEdit;
}

/* =========================
   RULE DEFINITION
========================= */

export interface Rule {
    id: string;
    run(context: RuleContext): RuleIssue[];
    fix?: RuleFix; // optional auto-fix
}
