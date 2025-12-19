import { Rule, RuleIssue } from '../../core/rule';

export const noHardcodedSecretRule: Rule = {
    id: 'no-hardcoded-secret',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            const match = line.match(/password\s*=\s*["'`]/i);

            if (match) {
                issues.push({
                    line: index + 1,
                    columnStart: match.index ?? 0,
                    columnEnd: line.length,
                    severity: 'high',
                    message: 'Hardcoded password detected',
                    code: 'HARDCODED_SECRET'
                });
            }
        });

        return issues;
    }
};
