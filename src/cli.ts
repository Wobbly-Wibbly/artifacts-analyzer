#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { configuration } from './core/configuration';
import { generateReport, recordReport } from './main';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

function cli(cliArguments: string[]) {
  const command = cliArguments[0] ?? 'report';
  const availableCommand = ['record', 'report'];
  if (!availableCommand.includes(command)) {
    console.log(
      `Command [${command}] not found, available command: ${availableCommand.join(
        ', '
      )}`
    );
    return;
  }

  const buildFolder = cliArguments[1] ?? 'build';
  const fullFolderPath = path.join(
    configuration.targetProjectFolder,
    buildFolder
  );
  console.info(`parsing [${fullFolderPath}]...`);

  if (!fs.existsSync(fullFolderPath)) {
    // TODO use Inquirer.js to ask for a build folder
    throw new Error(
      `Folder does not exists! ${fullFolderPath}. Pass a folder in a cli argument -> artifacts-analyzer myBuildFolder`
    );
  }

  switch (command) {
    case 'record': {
      recordReport(fullFolderPath);
    }
    case 'report': {
      generateReport(fullFolderPath);
    }
  }
}

cli(process.argv.slice(2));
