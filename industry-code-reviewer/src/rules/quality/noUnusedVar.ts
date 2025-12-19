import { Rule, RuleIssue } from '../../core/rule';

export const noUnusedVarRule: Rule = {
    id: 'no-unused-var',

    run(context) {
        const issues: RuleIssue[] = [];
        const regex = /const\s+(\w+)\s*=/g;

        const lines = context.text.split('\n');

        lines.forEach((line, index) => {
            let match;
            while ((match = regex.exec(line))) {
                const varName = match[1];
                const used = context.text.includes(varName + '(') ||
                             context.text.includes(varName + '.') ||
                             context.text.includes('=' + varName);

                if (!used) {
                    issues.push({
                        line: index + 1,
                        columnStart: match.index,
                        columnEnd: match.index + varName.length,
                        severity: 'low',
                        message: `Variable '${varName}' is declared but never used`,
                        code: 'UNUSED_VARIABLE'
                    });
                }
            }
        });

        return issues;
    }
};
