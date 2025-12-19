import { Rule, RuleIssue } from '../../core/rule';

export const noServerPropsInClientRule: Rule = {
    id: 'next-no-ssr-in-client',

    run(context) {
        const issues: RuleIssue[] = [];

        if (
            context.text.includes('getServerSideProps') &&
            context.text.includes('"use client"')
        ) {
            issues.push({
                line: 1,
                columnStart: 0,
                columnEnd: 20,
                severity: 'high',
                message: 'getServerSideProps cannot be used in client components',
                code: 'NEXT_SSR_CLIENT'
            });
        }

        return issues;
    }
};
