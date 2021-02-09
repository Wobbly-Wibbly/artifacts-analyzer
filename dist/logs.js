"use strict";
const fs = require('fs');
const paths = require('./paths');
const MAX_LOGS = 10;
function readBuildSizeLogs() {
    if (!fs.existsSync(paths.buildSizeLogsPath)) {
        fs.writeFileSync(paths.buildSizeLogsPath, '[]');
        return [];
    }
    return JSON.parse(fs.readFileSync(paths.buildSizeLogsPath, 'utf-8'));
}
function writeNewReport(logs, report) {
    let newLogs = [...logs, report];
    if (newLogs.length > MAX_LOGS) {
        newLogs.splice(MAX_LOGS, newLogs.length - MAX_LOGS);
    }
    fs.writeFileSync(paths.buildSizeLogsPath, JSON.stringify(newLogs));
}
module.exports = {
    readBuildSizeLogs,
    writeNewReport,
};
