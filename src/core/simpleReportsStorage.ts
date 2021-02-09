import fs from 'fs';
import { configuration } from './configuration';
import { SimpleReport } from './types';

const MAX_LOGS = 10;

export function readSavedReports(): SimpleReport[] {
  if (!fs.existsSync(configuration.buildSizeLogsPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(configuration.buildSizeLogsPath, 'utf-8'));
}

export function writeNewReport(report: SimpleReport) {
  const reports = readSavedReports();
  reports.push(report);

  if (reports.length > MAX_LOGS) {
    reports.splice(MAX_LOGS, reports.length - MAX_LOGS);
  }

  fs.writeFileSync(configuration.buildSizeLogsPath, JSON.stringify(reports));
}
