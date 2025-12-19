"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTokenInUrlRule = void 0;
exports.noTokenInUrlRule = {
    id: 'no-token-in-url',
    run(context) {
        const issues = [];
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
//# sourceMappingURL=noTokenInUrl.js.map