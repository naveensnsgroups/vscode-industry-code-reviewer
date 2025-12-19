"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAnchorForInternalLinkRule = void 0;
exports.noAnchorForInternalLinkRule = {
    id: 'next-no-anchor-internal',
    run(context) {
        const issues = [];
        const lines = context.text.split('\n');
        lines.forEach((line, index) => {
            if (/<a\s+href=["']\/.+["']/.test(line)) {
                issues.push({
                    line: index + 1,
                    columnStart: line.indexOf('<a'),
                    columnEnd: line.length,
                    severity: 'medium',
                    message: 'Use Next.js <Link> instead of <a> for internal routes',
                    code: 'NEXT_INTERNAL_LINK'
                });
            }
        });
        return issues;
    }
};
//# sourceMappingURL=noAnchorForInternalLink.js.map