"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEngine = runEngine;
const registry_1 = require("./registry");
const context_1 = require("./context");
function runEngine(document) {
    const context = (0, context_1.createContext)(document);
    const rules = (0, registry_1.getAllRules)();
    const issues = [];
    for (const rule of rules) {
        try {
            const ruleIssues = rule.run(context);
            issues.push(...ruleIssues);
        }
        catch (error) {
            console.error(`Rule failed: ${rule.id}`, error);
        }
    }
    return issues;
}
//# sourceMappingURL=engine.js.map