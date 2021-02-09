"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const configuration_1 = require("./core/configuration");
const main_1 = require("./main");
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}
function cli(cliArguments) {
    var _a, _b;
    const command = (_a = cliArguments[0]) !== null && _a !== void 0 ? _a : 'report';
    const availableCommand = ['record', 'report'];
    if (!availableCommand.includes(command)) {
        console.log(`Command [${command}] not found, available command: ${availableCommand.join(', ')}`);
        return;
    }
    const buildFolder = (_b = cliArguments[1]) !== null && _b !== void 0 ? _b : 'build';
    const fullFolderPath = path_1.default.join(configuration_1.configuration.targetProjectFolder, buildFolder);
    console.info(`parsing [${fullFolderPath}]...`);
    if (!fs_1.default.existsSync(fullFolderPath)) {
        // TODO use Inquirer.js to ask for a build folder
        throw new Error(`Folder does not exists! ${fullFolderPath}. Pass a folder in a cli argument -> artifacts-analyzer myBuildFolder`);
    }
    switch (command) {
        case 'record': {
            main_1.recordReport(fullFolderPath);
        }
        case 'report': {
            main_1.generateReport(fullFolderPath);
        }
    }
}
cli(process.argv.slice(2));
