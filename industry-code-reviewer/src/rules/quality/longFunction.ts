import { Rule, RuleIssue } from '../../core/rule';

export const longFunctionRule: Rule = {
    id: 'long-function',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        let functionStart = -1;

        lines.forEach((line, index) => {
            if (line.includes('function ')) {
                functionStart = index;
            }

            if (functionStart >= 0 && line.includes('}')) {
                const length = index - functionStart;
                if (length > 30) {
                    issues.push({
                        line: functionStart + 1,
                        columnStart: 0,
                        columnEnd: lines[functionStart].length,
                        severity: 'medium',
                        message: 'Function is too long (over 30 lines)',
                        code: 'LONG_FUNCTION'
                    });
                }
                functionStart = -1;
            }
        });

        return issues;
    }
};
