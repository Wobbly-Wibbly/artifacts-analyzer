"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompareReport = void 0;
const generateCompareFilesStats_1 = require("./generateCompareFilesStats");
const generateCompareFoldersStats_1 = require("./generateCompareFoldersStats");
function getFileListFromBothReports(left, right) {
    const merged = left.concat(right).sort((l, r) => r.size - l.size);
    const names = merged.map((s) => s.file);
    return [...new Set(names)];
}
function byFileNameReducer(memo, value) {
    memo[value.file] = value;
    return memo;
}
function generateCompareReport({ simpleFileStats: left, reportTimestamp: leftReportTimestamp }, { simpleFileStats: right }) {
    const leftByFileName = left.reduce(byFileNameReducer, {});
    const byFileName = right.reduce(byFileNameReducer, {});
    const bothFileLists = getFileListFromBothReports(left, right);
    const emptyFileStats = {
        size: 0,
        file: 'emptyFilePlaceholder',
    };
    const fileStats = bothFileLists
        .map((fileName) => {
        const leftStats = leftByFileName[fileName] || emptyFileStats;
        const rightStat = byFileName[fileName] || emptyFileStats;
        return generateCompareFilesStats_1.generateCompareFilesStats(fileName, leftStats, rightStat);
    })
        .sort((l, r) => r.order - l.order);
    const folderStats = generateCompareFoldersStats_1.generateCompareFoldersStats(fileStats);
    return {
        fileStats,
        folderStats,
        leftReportTimestamp,
    };
}
exports.generateCompareReport = generateCompareReport;
