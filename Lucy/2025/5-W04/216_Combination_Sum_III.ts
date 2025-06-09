function combinationSum3(k: number, n: number): number[][] {
  const minNum = Array.from({ length: k }, (_, i) => i + 1).reduce((acc, num) => acc + num, 0);
  if (minNum > n) return [];

  const results: number[][] = [];

  const backtrack = (path: number[], currentSum: number, startNumber: number) => {
    if (path.length === k && currentSum === n) {
      results.push([...path]);
      return;
    }

    if (currentSum > n || path.length >= k) {
      return;
    }

    for (let i = startNumber; i <= 9; i++) {
      backtrack([...path, i], currentSum + i, i + 1);
    }
  };

  for (let startNumber = 1; startNumber <= 9; startNumber++) {
    backtrack([startNumber], startNumber, startNumber + 1);
  }

  return results;
}
