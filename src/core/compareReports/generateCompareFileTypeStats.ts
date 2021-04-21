import { groupBy } from '../../utills/groupBy';
import { addReadableStats } from '../addReadableStats';
import { joinFileStatsToFolderStats } from './joinFileStatsToFolderStats';
import { CompareFilesStats } from '../types';

export function generateCompareFileTypeStats(fileStats: CompareFilesStats[]) {
  const byFolder = groupBy(
    fileStats,
    (stat) => `${stat.folderName} - ${stat.fileType}`
  );
  const simpleCompareFolderStats = Object.values(byFolder).map(
    joinFileStatsToFolderStats
  );

  return simpleCompareFolderStats.map(addReadableStats);
}
