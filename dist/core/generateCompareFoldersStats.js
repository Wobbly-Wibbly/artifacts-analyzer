"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompareFoldersStats = void 0;
const getReadableBytes_1 = require("../utills/getReadableBytes");
function joinFileStatsToFolderStats(compareFilesStats) {
    if (!compareFilesStats.length) {
        throw new Error('No way!');
    }
    return compareFilesStats.reduce((memo, right) => ({
        folderName: compareFilesStats[0].folderName,
        diffSize: memo.diffSize + right.diffSize,
        sizeWas: memo.sizeWas + right.sizeWas,
        sizeNew: memo.sizeNew + right.sizeNew,
    }), {
        folderName: '',
        diffSize: 0,
        sizeWas: 0,
        sizeNew: 0,
    });
}
function groupByFolder(filesStats) {
    return filesStats.reduce((memo, fileStats) => {
        if (!memo[fileStats.folderName]) {
            memo[fileStats.folderName] = [];
        }
        memo[fileStats.folderName].push(fileStats);
        return memo;
    }, {});
}
function addReadableStats(simpleCompareFolderStats) {
    return {
        ...simpleCompareFolderStats,
        readable: {
            sizeWas: getReadableBytes_1.getReadableBytes(simpleCompareFolderStats.sizeWas),
            sizeNew: getReadableBytes_1.getReadableBytes(simpleCompareFolderStats.sizeNew),
            diffSize: getReadableBytes_1.getReadableBytes(simpleCompareFolderStats.diffSize),
        },
        isSizeDecreased: simpleCompareFolderStats.diffSize < 0,
    };
}
function generateCompareFoldersStats(fileStats) {
    const byFolder = groupByFolder(fileStats);
    const simpleCompareFolderStats = Object.values(byFolder).map(joinFileStatsToFolderStats);
    return simpleCompareFolderStats.map(addReadableStats);
}
exports.generateCompareFoldersStats = generateCompareFoldersStats;
