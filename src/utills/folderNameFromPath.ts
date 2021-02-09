export function folderNameFromPath(path: string) {
  const parts = path.split('/');
  return parts.splice(0, parts.length - 1).join('/');
}
