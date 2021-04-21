export function groupBy<T>(
  items: T[],
  getKey: (item: T) => string
): Record<string, T[]> {
  return items.reduce((memo: Record<string, T[]>, item) => {
    const key = getKey(item);
    if (!memo[key]) {
      memo[key] = [];
    }

    memo[key].push(item);
    return memo;
  }, {});
}
