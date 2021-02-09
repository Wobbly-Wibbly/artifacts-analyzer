"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlReport = void 0;
const fs_1 = __importDefault(require("fs"));
const base = (folderStats, rows) => `
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
const generateFolderRow = (stat) => `
<tr>
  <td>${stat.folderName}</td>
  <td>${stat.readable.sizeWas}</td>
  <td>${stat.readable.sizeNew}</td>
  <td class="${stat.isSizeDecreased ? 'green' : 'red'}">${stat.isSizeDecreased ? '' : '+'}${stat.readable.diffSize}</td>
</tr>
`;
const generateRow = (stat) => `
<tr>
  <td>${stat.file}</td>
  <td>${stat.sizeReadable}</td>
  <td>${stat.newSizeReadable}</td>
  <td class="${stat.isSizeDecreased ? 'green' : 'red'}">${stat.isSizeDecreased ? '' : '+'}${stat.diffReadable}</td>
</tr>
`;
function htmlReport(stats, pathToReport = 'report.html') {
    const folderStats = stats.folderStats.map(generateFolderRow).join('\n');
    const fileStats = stats.fileStats.map(generateRow).join('\n');
    const report = base(folderStats, fileStats);
    fs_1.default.writeFileSync(pathToReport, report);
}
exports.htmlReport = htmlReport;
