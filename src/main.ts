import fs from 'fs';
import { configuration } from './core/configuration';
import { generateCompareReport } from './core/generateCompareReport';
import { generateHtmlReport } from './core/generateHtmlReport';
import { generateSimpleFileStats } from './core/generateSimpleFileStats';
import { createSimpleReport } from './core/simpleReport';
import { readSavedReports, writeNewReport } from './core/simpleReportsStorage';
import { openFileInDefaultBrowser } from './utills/openFileInDefaultBrowser';

export function recordReport(fullFolderPath: string) {
  const simpleReport = createSimpleReport(
    generateSimpleFileStats(fullFolderPath)
  );

  writeNewReport(simpleReport);
  console.log('Report generated and writen to logs..');
}

export function generateReport(fullFolderPath: string) {
  const simpleReport = createSimpleReport(
    generateSimpleFileStats(fullFolderPath)
  );
  const savedReports = readSavedReports();

  if (!savedReports.length) {
    writeNewReport(simpleReport);
    console.log(
      'Report generated and writen to logs, please modify the build, and run this command again, to compare!'
    );
    return;
  }

  const lastReport = savedReports[savedReports.length - 1];
  const compareReport = generateCompareReport(lastReport, simpleReport);

  const htmlReport = generateHtmlReport(compareReport);

  fs.writeFileSync(configuration.reportPath, htmlReport);
  console.log(`report written in -> ${configuration.reportPath}`);

  openFileInDefaultBrowser(configuration.reportPath);
}
