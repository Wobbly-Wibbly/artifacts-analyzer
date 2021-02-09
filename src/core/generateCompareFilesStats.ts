import { folderNameFromPath } from '../utills/folderNameFromPath';
import { getReadableBytes } from '../utills/getReadableBytes';
import { CompareFilesStats, SimpleFileStats } from './types';

export function generateCompareFilesStats(
  fileName: string,
  leftStats: SimpleFileStats,
  rightStat: SimpleFileStats
): CompareFilesStats {
  const diffSize = rightStat.size - leftStats.size;
  const bothFileExistDiff = rightStat.size && leftStats.size ? diffSize : 0;

  return {
    sizeWas: leftStats.size,
    sizeNew: rightStat.size,
    file: fileName,
    folderName: folderNameFromPath(fileName),
    sizeReadable: getReadableBytes(leftStats.size),
    newSizeReadable: getReadableBytes(rightStat.size),
    diffSize,
    bothFileExistDiff: bothFileExistDiff,
    order: Math.abs(bothFileExistDiff),
    diffReadable: getReadableBytes(diffSize),
    isSizeDecreased: diffSize < 0,
  };
}
