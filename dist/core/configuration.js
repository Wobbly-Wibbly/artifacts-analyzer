"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const path_1 = __importDefault(require("path"));
// TODO give a possibility to change this!
exports.configuration = {
    targetProjectFolder: path_1.default.resolve(process.cwd()),
    buildFolderPath: path_1.default.join(process.cwd(), 'build'),
    buildSizeLogsPath: path_1.default.join(process.cwd(), 'buildSizeLogs.json'),
    reportPath: path_1.default.join(process.cwd(), 'buildSizeReport.html'),
};
