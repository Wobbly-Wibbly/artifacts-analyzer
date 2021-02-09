import { generateCompareFilesStats } from './generateCompareFilesStats';
import { generateCompareFoldersStats } from './generateCompareFoldersStats';
import {
  SimpleFileStats,
  SimpleFilesStats,
  CompareReport,
  SimpleReport,
} from './types';

function getFileListFromBothReports(
  left: { file: string; size: number }[],
  right: { file: string; size: number }[]
): string[] {
  const merged = left.concat(right).sort((l, r) => r.size - l.size);
  const names = merged.map((s) => s.file);
  return [...new Set(names)];
}

function byFileNameReducer(
  memo: Record<string, SimpleFileStats>,
  value: SimpleFileStats
): Record<string, SimpleFileStats> {
  memo[value.file] = value;
  return memo;
}

export function generateCompareReport(
  { simpleFileStats: left, reportTimestamp: leftReportTimestamp }: SimpleReport,
  { simpleFileStats: right }: SimpleReport
): CompareReport {
  const leftByFileName = left.reduce(byFileNameReducer, {});
  const byFileName = right.reduce(byFileNameReducer, {});

  const bothFileLists = getFileListFromBothReports(left, right);

  const emptyFileStats: SimpleFileStats = {
    size: 0,
    file: 'emptyFilePlaceholder',
  };

  const fileStats = bothFileLists
    .map((fileName: string) => {
      const leftStats = leftByFileName[fileName] || emptyFileStats;
      const rightStat = byFileName[fileName] || emptyFileStats;
      return generateCompareFilesStats(fileName, leftStats, rightStat);
    })
    .sort((l, r) => r.order - l.order);

  const folderStats = generateCompareFoldersStats(fileStats);

  return {
    fileStats,
    folderStats,
    leftReportTimestamp,
  };
}
