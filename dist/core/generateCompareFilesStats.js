"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompareFilesStats = void 0;
const folderNameFromPath_1 = require("../utills/folderNameFromPath");
const getReadableBytes_1 = require("../utills/getReadableBytes");
function generateCompareFilesStats(fileName, leftStats, rightStat) {
    const diffSize = rightStat.size - leftStats.size;
    const bothFileExistDiff = rightStat.size && leftStats.size ? diffSize : 0;
    return {
        sizeWas: leftStats.size,
        sizeNew: rightStat.size,
        file: fileName,
        folderName: folderNameFromPath_1.folderNameFromPath(fileName),
        sizeReadable: getReadableBytes_1.getReadableBytes(leftStats.size),
        newSizeReadable: getReadableBytes_1.getReadableBytes(rightStat.size),
        diffSize,
        bothFileExistDiff: bothFileExistDiff,
        order: Math.abs(bothFileExistDiff),
        diffReadable: getReadableBytes_1.getReadableBytes(diffSize),
        isSizeDecreased: diffSize < 0,
    };
}
exports.generateCompareFilesStats = generateCompareFilesStats;
