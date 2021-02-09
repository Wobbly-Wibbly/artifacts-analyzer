"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportPath = exports.buildSizeLogsPath = exports.buildFolderPath = void 0;
const path_1 = __importDefault(require("path"));
exports.buildFolderPath = path_1.default.join(process.cwd(), 'build');
exports.buildSizeLogsPath = path_1.default.join(process.cwd(), 'buildSizeLogs.json');
exports.reportPath = path_1.default.join(process.cwd(), 'buildSizeReport.html');
