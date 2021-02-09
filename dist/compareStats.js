"use strict";
function folderNameFromPath(path) {
    const parts = path.split('/');
    return parts.splice(0, parts.length - 1).join('/');
}
function joinFileStatsToFolderStats(left, right) {
    return Object.fromEntries(Object.entries(left)
        .filter(([key]) => ['folderName', 'diffSize', 'sizeWas', 'sizeNew'].includes(key))
        .map(([key, value]) => {
        switch (key) {
            case 'folderName': {
                return [key, value];
            }
            case 'diffSize':
            case 'sizeWas':
            case 'sizeNew': {
                return [key, value + right[key]];
            }
            default: {
                return [key, value];
            }
        }
    }));
}
function getFileListFromBothReports(left, right) {
    const merged = left.concat(right).sort((l, r) => r.size - l.size);
    const names = merged.map((s) => s.file);
    return [...new Set(names)];
}
function byFileNameReducer(memo, value) {
    memo[value.file] = value;
    return memo;
}
function compareStats(left, right) {
    const leftByFileName = left.reduce(byFileNameReducer, {});
    const byFileName = right.reduce(byFileNameReducer, {});
    const bothFileLists = getFileListFromBothReports(left, right);
    const fileStats = bothFileLists
        .map((fileName) => {
        const stat = leftByFileName[fileName] || { size: 0 };
        const newStats = byFileName[fileName] || { size: 0 };
        const diffSize = newStats.size - stat.size; // newStats ? newStats.size - stat.size : 0;
        const bothFileExistDiff = newStats.size && stat.size ? diffSize : 0;
        const fileStat = {
            sizeWas: stat.size,
            sizeNew: newStats.size,
            file: fileName,
            folderName: folderNameFromPath(fileName),
            sizeReadable: getReadableBytes(stat.size),
            newSizeReadable: getReadableBytes(newStats.size),
            diffSize,
            bothFileExistDiff: bothFileExistDiff,
            order: Math.abs(bothFileExistDiff),
            diffReadable: getReadableBytes(diffSize),
            isSizeDecreased: diffSize < 0,
        };
        return fileStat;
    })
        // .filter((s) => s.diffAbs > 1024 * 10);
        .sort((l, r) => r.order - l.order);
    const folderStats = Object.values(fileStats.reduce((memo, fileStats) => {
        if (!memo[fileStats.folderName]) {
            memo[fileStats.folderName] = fileStats;
        }
        else {
            memo[fileStats.folderName] = joinFileStatsToFolderStats(memo[fileStats.folderName], fileStats);
        }
        return memo;
    }, {})).map((meanStat) => ({
        ...meanStat,
        readable: {
            sizeWas: getReadableBytes(meanStat.sizeWas),
            sizeNew: getReadableBytes(meanStat.sizeNew),
            diffSize: getReadableBytes(meanStat.diffSize),
        },
        isSizeDecreased: meanStat.diffSize < 0,
    }));
    return { fileStats, folderStats };
}
module.exports = compareStats;
