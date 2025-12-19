import { Rule } from './rule';

import { noHardcodedSecretRule } from '../rules/security/noHardcodedSecret';
import { noHardcodedApiKeyRule } from '../rules/security/noHardcodedApiKey';
import { noConsoleSensitiveRule } from '../rules/security/noConsoleSensitive';
import { noPlainTextPasswordCompareRule } from '../rules/security/noPlainTextPasswordCompare';
import { noTokenInUrlRule } from '../rules/security/noTokenInUrl';

import { noConsoleLogRule } from '../rules/quality/noConsoleLog';
import { noUnusedVarRule } from '../rules/quality/noUnusedVar';
import { longFunctionRule } from '../rules/quality/longFunction';

export function getAllRules(): Rule[] {
    return [
        // 🔐 SECURITY
        noHardcodedSecretRule,
        noHardcodedApiKeyRule,
        noConsoleSensitiveRule,
        noPlainTextPasswordCompareRule,
        noTokenInUrlRule,

        // 🧹 QUALITY
        noConsoleLogRule,
        noUnusedVarRule,
        longFunctionRule
    ];
}
