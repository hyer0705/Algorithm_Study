function orangesRotting(grid: number[][]): number {
  const ORANGE = {
    empty: 0,
    fresh: 1,
    rotten: 2,
  };
  const ROW = grid.length;
  const COL = grid[0].length;

  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue: number[][] = []; // [row, col, time];

  // find the coordinates of the rotten orange
  const countOrangeMap = new Map<number, number>();
  countOrangeMap.set(ORANGE.empty, 0);
  countOrangeMap.set(ORANGE.fresh, 0);
  countOrangeMap.set(ORANGE.rotten, 0);

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === ORANGE.rotten) {
        queue.push([i, j, 0]);
        countOrangeMap.set(ORANGE.rotten, (countOrangeMap.get(ORANGE.rotten) ?? 0) + 1);
      } else if (grid[i][j] === ORANGE.fresh) {
        countOrangeMap.set(ORANGE.fresh, (countOrangeMap.get(ORANGE.fresh) ?? 0) + 1);
      } else {
        countOrangeMap.set(ORANGE.empty, (countOrangeMap.get(ORANGE.empty) ?? 0) + 1);
      }
    }
  }

  // 오렌지가 없는 경우 => 0
  if (countOrangeMap.get(ORANGE.rotten) === 0 && countOrangeMap.get(ORANGE.fresh) === 0) return 0;
  // 썪은 오렌지가 없는 경우 => -1
  if (countOrangeMap.get(ORANGE.rotten) === 0) return -1;

  // bfs
  let time: number = -1;
  while (queue.length > 0) {
    const [row, col, currentTime] = queue.shift()!;

    time = Math.max(time, currentTime);

    for (const [dr, dc] of direction) {
      const [nr, nc] = [row + dr, col + dc];

      if (nr >= 0 && nr < ROW && nc >= 0 && nc < COL && grid[nr][nc] === ORANGE.fresh) {
        queue.push([nr, nc, currentTime + 1]);
        grid[nr][nc] = ORANGE.rotten;

        countOrangeMap.set(ORANGE.fresh, (countOrangeMap.get(ORANGE.fresh) ?? 0) - 1);
        countOrangeMap.set(ORANGE.rotten, (countOrangeMap.get(ORANGE.rotten) ?? 0) + 1);
      }
    }
  }

  if ((countOrangeMap.get(ORANGE.fresh) ?? 0) > 0) {
    return -1;
  }

  return time;
}
