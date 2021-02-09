import { SimpleFilesStats, SimpleReport } from './types';

export function createSimpleReport(
  simpleFileStats: SimpleFilesStats
): SimpleReport {
  return {
    simpleFileStats,
    reportTimestamp: Date.now(),
  };
}
