function nearestExit(maze: string[][], entrance: number[]): number {
  const queue: [number, number, number][] = [];
  queue.push([entrance[0], entrance[1], 0]); // [row, col, path]

  const ROW = maze.length;
  const COL = maze[0].length;
  const EMPTY = ".";

  const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited: boolean[][] = Array.from({ length: ROW }, () => new Array(COL).fill(false));

  const getCoordinates = (row: number, col: number): string => `${row},${col}`;

  while (queue.length > 0) {
    const [row, col, currentPath] = queue.shift()!;

    if (row === 0 || row === ROW - 1 || col === 0 || col === COL - 1) {
      if (getCoordinates(row, col) !== getCoordinates(entrance[0], entrance[1])) {
        return currentPath;
      }
    }

    for (const [dr, dc] of direction) {
      const [nr, nc] = [row + dr, col + dc];

      if (nr >= 0 && nr < ROW && nc >= 0 && nc < COL && maze[nr][nc] === EMPTY && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc, currentPath + 1]);
      }
    }
  }

  return -1;
}
