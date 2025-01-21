function equalPairs(grid: number[][]): number {
  const SEPARATION = "|";
  const INIT_VALUE = 0;

  let answer = 0;
  const rowNumberCount = new Map();
  const colNumberCount = new Map();

  grid.forEach((row, i, arr) => {
    const joinedRow = row.join(SEPARATION);
    rowNumberCount.set(joinedRow, (rowNumberCount.get(joinedRow) || INIT_VALUE) + 1);

    const joinedCol = arr.map((row) => row[i]).join(SEPARATION);
    colNumberCount.set(joinedCol, (colNumberCount.get(joinedCol) || INIT_VALUE) + 1);
  });

  const rowNumbers = Array.from(rowNumberCount.keys());
  const colNumbers = Array.from(colNumberCount.keys());

  const numberKeys = new Set([...rowNumbers, ...colNumbers]);

  numberKeys.forEach((key) => {
    if (rowNumberCount.has(key) && colNumberCount.has(key)) {
      answer += rowNumberCount.get(key) * colNumberCount.get(key);
    }
  });

  return answer;
}

equalPairs([
  [3, 2, 1],
  [1, 7, 6],
  [2, 7, 7],
]); // 1

equalPairs([
  [3, 1, 2, 2],
  [1, 4, 4, 5],
  [2, 4, 2, 2],
  [2, 4, 2, 2],
]); // 3
