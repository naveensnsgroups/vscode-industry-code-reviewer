import { Rule, RuleIssue } from '../../core/rule';

export const noHardcodedApiKeyRule: Rule = {
    id: 'no-hardcoded-api-key',

    run(context) {
        const issues: RuleIssue[] = [];
        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            const match = line.match(/apiKey\s*=\s*["'`]/i);
            if (match) {
                issues.push({
                    line: index + 1,
                    columnStart: match.index ?? 0,
                    columnEnd: line.length,
                    severity: 'high',
                    message: 'Hardcoded API key detected',
                    code: 'HARDCODED_API_KEY'
                });
            }
        });

        return issues;
    }
};
