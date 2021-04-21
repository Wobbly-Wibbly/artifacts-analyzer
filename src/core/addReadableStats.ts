import { getReadableBytes } from '../utills/getReadableBytes';
import { CompareFolderStats, SimpleCompareFoldersStats } from './types';

export function addReadableStats(
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
