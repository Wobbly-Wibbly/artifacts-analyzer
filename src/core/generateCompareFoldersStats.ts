import { getReadableBytes } from '../utills/getReadableBytes';
import {
  CompareFilesStats,
  CompareFolderStats,
  SimpleCompareFoldersStats,
} from './types';

function joinFileStatsToFolderStats(
  compareFilesStats: CompareFilesStats[]
): SimpleCompareFoldersStats {
  if (!compareFilesStats.length) {
    throw new Error('No way!');
  }

  return compareFilesStats.reduce(
    (memo, right) => ({
      folderName: compareFilesStats[0].folderName,
      diffSize: memo.diffSize + right.diffSize,
      sizeWas: memo.sizeWas + right.sizeWas,
      sizeNew: memo.sizeNew + right.sizeNew,
    }),
    {
      folderName: '',
      diffSize: 0,
      sizeWas: 0,
      sizeNew: 0,
    }
  );
}

function groupByFolder(
  filesStats: CompareFilesStats[]
): Record<string, CompareFilesStats[]> {
  return filesStats.reduce(
    (memo: Record<string, CompareFilesStats[]>, fileStats) => {
      if (!memo[fileStats.folderName]) {
        memo[fileStats.folderName] = [];
      }

      memo[fileStats.folderName].push(fileStats);
      return memo;
    },
    {}
  );
}

function addReadableStats(
  simpleCompareFolderStats: SimpleCompareFoldersStats
): CompareFolderStats {
  return {
    ...simpleCompareFolderStats,
    readable: {
      sizeWas: getReadableBytes(simpleCompareFolderStats.sizeWas),
      sizeNew: getReadableBytes(simpleCompareFolderStats.sizeNew),
      diffSize: getReadableBytes(simpleCompareFolderStats.diffSize),
    },
    isSizeDecreased: simpleCompareFolderStats.diffSize < 0,
  };
}

export function generateCompareFoldersStats(fileStats: CompareFilesStats[]) {
  const byFolder = groupByFolder(fileStats);
  const simpleCompareFolderStats = Object.values(byFolder).map(
    joinFileStatsToFolderStats
  );

  return simpleCompareFolderStats.map(addReadableStats);
}
