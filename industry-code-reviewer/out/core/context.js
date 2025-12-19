"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
function createContext(document) {
    return {
        document,
        text: document.getText(),
        languageId: document.languageId,
        fileName: document.fileName
    };
}
//# sourceMappingURL=context.js.map