import { groupBy } from '../../utills/groupBy';
import { addReadableStats } from '../addReadableStats';
import { joinFileStatsToFolderStats } from './joinFileStatsToFolderStats';
import { CompareFilesStats } from '../types';

function groupByFolder(
  filesStats: CompareFilesStats[]
): Record<string, CompareFilesStats[]> {
  return groupBy(filesStats, (stat) => stat.folderName);
}

export function generateCompareFoldersStats(fileStats: CompareFilesStats[]) {
  const byFolder = groupByFolder(fileStats);
  const simpleCompareFolderStats = Object.values(byFolder).map(
    joinFileStatsToFolderStats
  );

  return simpleCompareFolderStats.map(addReadableStats);
}
