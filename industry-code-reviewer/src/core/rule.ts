import { RuleContext } from './context';

export interface RuleIssue {
    line: number;
    columnStart: number;
    columnEnd: number;
    severity: 'low' | 'medium' | 'high';
    message: string;
    code: string;
}

export interface Rule {
    id: string;
    run(context: RuleContext): RuleIssue[];
}
