"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldAnalyze = shouldAnalyze;
const SUPPORTED_LANGUAGES = [
    'javascript',
    'typescript',
    'javascriptreact',
    'typescriptreact'
];
function shouldAnalyze(document) {
    return SUPPORTED_LANGUAGES.includes(document.languageId);
}
//# sourceMappingURL=fileFilter.js.map