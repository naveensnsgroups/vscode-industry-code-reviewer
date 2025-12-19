import { Rule, RuleIssue } from '../../core/rule';

export const noConsoleLogRule: Rule = {
    id: 'no-console-log',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            if (/console\.log/.test(line)) {
                issues.push({
                    line: index + 1,
                    columnStart: 0,
                    columnEnd: line.length,
                    severity: 'medium',
                    message: 'console.log should be removed in production code',
                    code: 'CONSOLE_LOG'
                });
            }
        });

        return issues;
    }
};
