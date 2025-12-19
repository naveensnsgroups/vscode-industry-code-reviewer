"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRules = getAllRules;
const noHardcodedSecret_1 = require("../rules/security/noHardcodedSecret");
const noHardcodedApiKey_1 = require("../rules/security/noHardcodedApiKey");
const noConsoleSensitive_1 = require("../rules/security/noConsoleSensitive");
const noPlainTextPasswordCompare_1 = require("../rules/security/noPlainTextPasswordCompare");
const noTokenInUrl_1 = require("../rules/security/noTokenInUrl");
const noConsoleLog_1 = require("../rules/quality/noConsoleLog");
const noUnusedVar_1 = require("../rules/quality/noUnusedVar");
const longFunction_1 = require("../rules/quality/longFunction");
function getAllRules() {
    return [
        // 🔐 SECURITY
        noHardcodedSecret_1.noHardcodedSecretRule,
        noHardcodedApiKey_1.noHardcodedApiKeyRule,
        noConsoleSensitive_1.noConsoleSensitiveRule,
        noPlainTextPasswordCompare_1.noPlainTextPasswordCompareRule,
        noTokenInUrl_1.noTokenInUrlRule,
        // 🧹 QUALITY
        noConsoleLog_1.noConsoleLogRule,
        noUnusedVar_1.noUnusedVarRule,
        longFunction_1.longFunctionRule
    ];
}
//# sourceMappingURL=registry.js.map