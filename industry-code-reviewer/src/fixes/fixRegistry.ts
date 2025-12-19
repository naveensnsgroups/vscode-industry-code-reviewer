import { Rule } from '../core/rule';

const fixMap = new Map<string, Rule>();

export function registerFixes(rules: Rule[]) {
    for (const rule of rules) {
        if (rule.fix) {
            fixMap.set(rule.id, rule);
        }
    }
}

export function getFixForRule(ruleId: string): Rule | undefined {
    return fixMap.get(ruleId);
}
