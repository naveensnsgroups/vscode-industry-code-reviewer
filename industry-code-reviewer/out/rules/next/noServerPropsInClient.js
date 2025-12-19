"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noServerPropsInClientRule = void 0;
exports.noServerPropsInClientRule = {
    id: 'next-no-ssr-in-client',
    run(context) {
        const issues = [];
        if (context.text.includes('getServerSideProps') &&
            context.text.includes('"use client"')) {
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
//# sourceMappingURL=noServerPropsInClient.js.map