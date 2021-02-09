"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const configuration_1 = require("./configuration");
const MAX_LOGS = 10;
function readBuildSizeLogs() {
    if (!fs_1.default.existsSync(configuration_1.configuration.buildSizeLogsPath)) {
        fs_1.default.writeFileSync(configuration_1.configuration.buildSizeLogsPath, '[]');
        return [];
    }
    return JSON.parse(fs_1.default.readFileSync(configuration_1.configuration.buildSizeLogsPath, 'utf-8'));
}
function writeNewReport(logs, report) {
    let newLogs = [...logs, report];
    if (newLogs.length > MAX_LOGS) {
        newLogs.splice(MAX_LOGS, newLogs.length - MAX_LOGS);
    }
    fs_1.default.writeFileSync(configuration_1.configuration.buildSizeLogsPath, JSON.stringify(newLogs));
}
module.exports = {
    readBuildSizeLogs,
    writeNewReport,
};
