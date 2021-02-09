import fs from 'fs';
import { CompareFilesStats, CompareFolderStats, CompareReport } from './types';

const base = (folderStats: string, rows: string, timeOfReport: string) => `
<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
td.green {
  background-color: #6a7045;
}
td.red {
  background-color: #bc6d4c;
}
</style>
</head>
<body>

<h2>Artifacts Report</h2>
<h2>Compared with report generated at: ${timeOfReport}</h2>

<table>
  <tr>
    <th>Folder Name</th>
    <th>Size Was</th>
    <th>Size New</th>
    <th>Diff</th>
  </tr>
  ${folderStats}
</table>

<table>
  <tr>
    <th>File</th>
    <th>Size</th>
    <th>New Size</th>
    <th>Diff</th>
  </tr>
  ${rows}
</table>

</body>
</html>

`;

const generateFolderRow = (stat: CompareFolderStats) => `
<tr>
  <td>${stat.folderName}</td>
  <td>${stat.readable.sizeWas}</td>
  <td>${stat.readable.sizeNew}</td>
  <td class="${stat.isSizeDecreased ? 'green' : 'red'}">${
  stat.isSizeDecreased ? '' : '+'
}${stat.readable.diffSize}</td>
</tr>
`;

const generateRow = (stat: CompareFilesStats) => `
<tr>
  <td>${stat.file}</td>
  <td>${stat.sizeReadable}</td>
  <td>${stat.newSizeReadable}</td>
  <td class="${stat.isSizeDecreased ? 'green' : 'red'}">${
  stat.isSizeDecreased ? '' : '+'
}${stat.diffReadable}</td>
</tr>
`;

export function generateHtmlReport(stats: CompareReport) {
  const folderStats = stats.folderStats.map(generateFolderRow).join('\n');
  const fileStats = stats.fileStats.map(generateRow).join('\n');
  const timeOfReport = new Date(stats.leftReportTimestamp).toLocaleString();
  return base(folderStats, fileStats, timeOfReport);
}
