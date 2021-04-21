import { CompareFilesStats, SimpleCompareFoldersStats } from '../types';

export function joinFileStatsToFolderStats(
  compareFilesStats: CompareFilesStats[]
): SimpleCompareFoldersStats {
  if (!compareFilesStats.length) {
    throw new Error('No way!');
  }

  return compareFilesStats.reduce(
    (memo, right) => ({
      folderName: compareFilesStats[0].folderName,
      fileType: compareFilesStats[0].fileType,
      diffSize: memo.diffSize + right.diffSize,
      sizeWas: memo.sizeWas + right.sizeWas,
      sizeNew: memo.sizeNew + right.sizeNew,
    }),
    {
      fileType: '',
      folderName: '',
      diffSize: 0,
      sizeWas: 0,
      sizeNew: 0,
    }
  );
}
