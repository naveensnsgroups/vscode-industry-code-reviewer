import { Rule, RuleIssue } from '../../core/rule';

export const noTokenInUrlRule: Rule = {
    id: 'no-token-in-url',

    run(context) {
        const issues: RuleIssue[] = [];
        const regex = /(token|apikey|key)=/i;

        context.text.split('\n').forEach((line, index) => {
            if (regex.test(line) && line.includes('http')) {
                issues.push({
                    line: index + 1,
                    columnStart: line.search(regex),
                    columnEnd: line.length,
                    severity: 'medium',
                    message: 'Sensitive token passed via URL',
                    code: 'TOKEN_IN_URL'
                });
            }
        });

        return issues;
    }
};
