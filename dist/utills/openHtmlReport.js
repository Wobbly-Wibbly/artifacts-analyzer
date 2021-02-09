"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openFileInDefaultBrowser = void 0;
function openFileInDefaultBrowser(reportFilePath) {
    var url = `file://${reportFilePath}`;
    var start = process.platform == 'darwin'
        ? 'open'
        : process.platform == 'win32'
            ? 'start'
            : 'xdg-open';
    require('child_process').exec(start + ' ' + url);
}
exports.openFileInDefaultBrowser = openFileInDefaultBrowser;
