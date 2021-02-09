import fs from 'fs';
import { SimpleFileStats } from './types';

function getFilesSafeAndSorted(dirPath: string) {
  return getFilesSafe(dirPath).sort((l, r) => r.size - l.size);
}

function getFilesSafe(dirPath: string) {
  try {
    return getFiles(dirPath);
  } catch (err) {
    console.log(err);
    return [];
  }
}

function getFiles(dirPath: string, relativePath = '.'): SimpleFileStats[] {
  const files = fs.readdirSync(dirPath);

  return files.flatMap((file) => {
    const filePath = dirPath + '/' + file;
    const relativeFilePath = relativePath + '/' + file;
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const fileStat = {
        file: relativeFilePath,
        size: stats.size,
      };
      return [fileStat];
    }
    if (stats.isDirectory()) {
      return getFiles(filePath, relativeFilePath);
    }
    return [];
  });
}

export function generateSimpleFileStats(path: string) {
  const x = getFilesSafeAndSorted(path);
  return x;
}
