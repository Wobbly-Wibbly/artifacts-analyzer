export function openFileInDefaultBrowser(reportFilePath: string) {
  var url = `file://${reportFilePath}`;
  var start =
    process.platform == 'darwin'
      ? 'open'
      : process.platform == 'win32'
      ? 'start'
      : 'xdg-open';
  require('child_process').exec(start + ' ' + url);
}
