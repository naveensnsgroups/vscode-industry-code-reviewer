"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEngine = runEngine;
const registry_1 = require("./registry");
const context_1 = require("./context");
const config_1 = require("./config");
function runEngine(document) {
    // 🔕 Extension disabled globally
    if (!(0, config_1.isReviewerEnabled)()) {
        return [];
    }
    const context = (0, context_1.createContext)(document);
    const rules = (0, registry_1.getAllRules)();
    const issues = [];
    for (const rule of rules) {
        try {
            const severity = (0, config_1.getRuleSeverity)(rule.id);
            // 🔕 Rule disabled
            if (severity === 'off')
                continue;
            const ruleIssues = rule.run(context);
            // 🎚 Override severity from user config
            for (const issue of ruleIssues) {
                issue.severity = severity;
            }
            issues.push(...ruleIssues);
        }
        catch (error) {
            console.error(`[Industry Code Reviewer] Rule failed: ${rule.id}`, error);
        }
    }
    return issues;
}
//# sourceMappingURL=engine.js.map