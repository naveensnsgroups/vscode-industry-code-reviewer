import { Rule, RuleIssue } from '../../core/rule';

export const noPlainTextPasswordCompareRule: Rule = {
    id: 'no-plaintext-password-compare',

    run(context) {
        const issues: RuleIssue[] = [];
        const regex = /password\s*===?\s*["'`]/i;

        context.text.split('\n').forEach((line, index) => {
            if (regex.test(line)) {
                issues.push({
                    line: index + 1,
                    columnStart: line.search(regex),
                    columnEnd: line.length,
                    severity: 'high',
                    message: 'Plain text password comparison detected',
                    code: 'PLAINTEXT_PASSWORD_COMPARE'
                });
            }
        });

        return issues;
    }
};
