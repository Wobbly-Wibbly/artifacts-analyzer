"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderNameFromPath = void 0;
function folderNameFromPath(path) {
    const parts = path.split('/');
    return parts.splice(0, parts.length - 1).join('/');
}
exports.folderNameFromPath = folderNameFromPath;
