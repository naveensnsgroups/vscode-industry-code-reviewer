"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noConsoleSensitiveRule = void 0;
exports.noConsoleSensitiveRule = {
    id: 'no-console-sensitive',
    run(context) {
        const issues = [];
        const regex = /console\.log\(.*(password|secret|token|key).*\)/i;
        context.text.split('\n').forEach((line, index) => {
            if (regex.test(line)) {
                issues.push({
                    line: index + 1,
                    columnStart: line.indexOf('console.log'),
                    columnEnd: line.length,
                    severity: 'high',
                    message: 'Sensitive data logged to console',
                    code: 'LOGGING_SENSITIVE_DATA'
                });
            }
        });
        return issues;
    }
};
//# sourceMappingURL=noConsoleSensitive.js.map