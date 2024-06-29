/**
 * 3195. Find the Minimum Area to Cover All Ones I
 * URL: https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i/
 * DIFFICULTY: Medium
 * TOPIC: Array, Matrix
 * DATE: 2024.06.29(SAT)~
 */

function getCoordinates(grid, visited, row, col, ROW, COL) {
  // bfs traversal

  const DIRECTION_CNT = 4;

  const directionRow = [-1, 0, 1, 0]; // 상 하
  const directionCol = [0, 1, 0, -1]; // 우 좌

  const isValid = (visited, row, col) => {
    if (row < 0 || col < 0 || row >= ROW || col >= COL) {
      return false;
    }

    if (visited[row][col]) {
      return false;
    }

    return true;
  };

  const queue = [];
  queue.push([row, col]);
  visited[row][col] = true;

  const coordinates = [];

  while (queue.length !== 0) {
    const cell = queue[0];
    const [x, y] = cell;

    if (grid[x][y] === 1) coordinates.push([x, y]);

    queue.shift();

    for (let i = 0; i < DIRECTION_CNT; i++) {
      const adjX = x + directionRow[i];
      const adjY = y + directionCol[i];

      if (isValid(visited, adjX, adjY, ROW, COL)) {
        queue.push([adjX, adjY]);
        visited[adjX][adjY] = true;
      }
    }
  }

  return coordinates;
}

function getWidth(coordinates) {
  const xCoordinates = coordinates.map((row) => row[1]);
  const maxX = Math.max(...xCoordinates);
  const minX = Math.min(...xCoordinates);
  return maxX - minX + 1;
}

function getHeight(coordinates) {
  const yCoordinates = coordinates.map((row) => row[0]);
  const maxY = Math.max(...yCoordinates);
  const minY = Math.min(...yCoordinates);
  return maxY - minY + 1;
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumArea = function (grid) {
  const ROW = grid.length;
  const COL = grid[0].length;

  const visited = Array.from({ length: ROW }, () => Array(COL).fill(false));
  const coordinates = getCoordinates(grid, visited, 0, 0, ROW, COL);

  const width = getWidth(coordinates);
  const height = getHeight(coordinates);

  return width * height;
};

console.log(
  minimumArea([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 1],
  ])
);
