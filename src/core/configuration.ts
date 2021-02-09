import path from 'path';

// TODO give a possibility to change this!
export const configuration = {
  targetProjectFolder: path.resolve(process.cwd()),
  buildFolderPath: path.join(process.cwd(), 'build'),
  buildSizeLogsPath: path.join(process.cwd(), 'buildSizeLogs.json'),
  reportPath: path.join(process.cwd(), 'buildSizeReport.html'),
};
