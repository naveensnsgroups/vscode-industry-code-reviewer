"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missingUseEffectDepsRule = void 0;
exports.missingUseEffectDepsRule = {
    id: 'react-missing-useeffect-deps',
    run(context) {
        const issues = [];
        const lines = context.text.split('\n');
        lines.forEach((line, index) => {
            if (line.includes('useEffect(') &&
                !context.text.includes('useEffect(() =>') // simple heuristic
            ) {
                issues.push({
                    line: index + 1,
                    columnStart: 0,
                    columnEnd: line.length,
                    severity: 'medium',
                    message: 'useEffect missing dependency array',
                    code: 'REACT_USEEFFECT_DEPS'
                });
            }
        });
        return issues;
    }
};
//# sourceMappingURL=missingUseEffectDeps.js.map