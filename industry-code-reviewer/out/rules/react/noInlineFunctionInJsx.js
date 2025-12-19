"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInlineFunctionInJsxRule = void 0;
exports.noInlineFunctionInJsxRule = {
    id: 'react-no-inline-function-jsx',
    run(context) {
        const issues = [];
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
//# sourceMappingURL=noInlineFunctionInJsx.js.map