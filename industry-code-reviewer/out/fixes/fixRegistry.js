"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFixes = registerFixes;
exports.getFixForRule = getFixForRule;
const fixMap = new Map();
function registerFixes(rules) {
    for (const rule of rules) {
        if (rule.fix) {
            fixMap.set(rule.id, rule);
        }
    }
}
function getFixForRule(ruleId) {
    return fixMap.get(ruleId);
}
//# sourceMappingURL=fixRegistry.js.map