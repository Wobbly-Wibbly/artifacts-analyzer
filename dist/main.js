"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.recordReport = void 0;
const fs_1 = __importDefault(require("fs"));
const configuration_1 = require("./core/configuration");
const generateCompareReport_1 = require("./core/generateCompareReport");
const generateHtmlReport_1 = require("./core/generateHtmlReport");
const generateSimpleFileStats_1 = require("./core/generateSimpleFileStats");
const simpleReport_1 = require("./core/simpleReport");
const simpleReportsStorage_1 = require("./core/simpleReportsStorage");
const openFileInDefaultBrowser_1 = require("./utills/openFileInDefaultBrowser");
function recordReport(fullFolderPath) {
    const simpleReport = simpleReport_1.createSimpleReport(generateSimpleFileStats_1.generateSimpleFileStats(fullFolderPath));
    simpleReportsStorage_1.writeNewReport(simpleReport);
    console.log('Report generated and writen to logs..');
}
exports.recordReport = recordReport;
function generateReport(fullFolderPath) {
    const simpleReport = simpleReport_1.createSimpleReport(generateSimpleFileStats_1.generateSimpleFileStats(fullFolderPath));
    const savedReports = simpleReportsStorage_1.readSavedReports();
    if (!savedReports.length) {
        simpleReportsStorage_1.writeNewReport(simpleReport);
        console.log('Report generated and writen to logs, please modify the build, and run this command again, to compare!');
        return;
    }
    const lastReport = savedReports[savedReports.length - 1];
    const compareReport = generateCompareReport_1.generateCompareReport(lastReport, simpleReport);
    const htmlReport = generateHtmlReport_1.generateHtmlReport(compareReport);
    fs_1.default.writeFileSync(configuration_1.configuration.reportPath, htmlReport);
    console.log(`report written in -> ${configuration_1.configuration.reportPath}`);
    openFileInDefaultBrowser_1.openFileInDefaultBrowser(configuration_1.configuration.reportPath);
}
exports.generateReport = generateReport;
