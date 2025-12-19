import { Rule, RuleIssue } from '../../core/rule';

export const noInlineFunctionInJsxRule: Rule = {
    id: 'react-no-inline-function-jsx',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            if (/<.*onClick=\{\(\)\s*=>/.test(line)) {
                issues.push({
                    line: index + 1,
                    columnStart: line.indexOf('onClick'),
                    columnEnd: line.length,
                    severity: 'low',
                    message: 'Avoid inline anonymous functions in JSX',
                    code: 'REACT_INLINE_FUNCTION'
                });
            }
        });

        return issues;
    }
};
