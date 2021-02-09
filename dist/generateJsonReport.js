"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJsonReport = void 0;
const fs_1 = __importDefault(require("fs"));
function getFilesSafeAndSorted(dirPath) {
    return getFilesSafe(dirPath).sort((l, r) => r.size - l.size);
}
function getFilesSafe(dirPath) {
    try {
        return getFiles(dirPath);
    }
    catch (err) {
        console.log(err);
        return [];
    }
}
function getFiles(dirPath, relativePath = '.') {
    const files = fs_1.default.readdirSync(dirPath);
    return files.flatMap((file) => {
        const filePath = dirPath + '/' + file;
        const relativeFilePath = relativePath + '/' + file;
        const stats = fs_1.default.statSync(filePath);
        if (stats.isFile()) {
            const fileStat = {
                file: relativeFilePath,
                size: stats.size,
            };
            return [fileStat];
        }
        if (stats.isDirectory()) {
            return getFiles(filePath, relativeFilePath);
        }
        return [];
    });
}
function generateJsonReport(path) {
    const x = getFilesSafeAndSorted(path);
    return x;
}
exports.generateJsonReport = generateJsonReport;
