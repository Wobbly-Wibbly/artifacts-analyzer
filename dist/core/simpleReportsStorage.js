"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNewReport = exports.readSavedReports = void 0;
const fs_1 = __importDefault(require("fs"));
const configuration_1 = require("./configuration");
const MAX_LOGS = 10;
function readSavedReports() {
    if (!fs_1.default.existsSync(configuration_1.configuration.buildSizeLogsPath)) {
        return [];
    }
    return JSON.parse(fs_1.default.readFileSync(configuration_1.configuration.buildSizeLogsPath, 'utf-8'));
}
exports.readSavedReports = readSavedReports;
function writeNewReport(report) {
    const reports = readSavedReports();
    reports.push(report);
    if (reports.length > MAX_LOGS) {
        reports.splice(MAX_LOGS, reports.length - MAX_LOGS);
    }
    fs_1.default.writeFileSync(configuration_1.configuration.buildSizeLogsPath, JSON.stringify(reports));
}
exports.writeNewReport = writeNewReport;
