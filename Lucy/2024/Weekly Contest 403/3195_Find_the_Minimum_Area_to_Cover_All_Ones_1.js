/**
 * 3195. Find the Minimum Area to Cover All Ones I
 * URL: https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i/
 * DIFFICULTY: Medium
 * TOPIC: Array, Matrix
 * DATE: 2024.06.29(SAT)~
 */

/**
 * bfs 방법으로 순회하여 grid 배열의 요소가 1인 좌표를 coordinates 배열에 담아서 반환하는 함수
 * @param {number[][]} grid
 * @param {boolean[][]} visited
 * @param {number} row
 * @param {number} col
 * @param {number} ROW
 * @param {number} COL
 * @returns {number[]} coordinates
 */
function getCoordinates(grid, visited, row, col, ROW, COL) {
  // bfs traversal

  // 상하좌우 총 4개의 방향을 담는 상수 DIRECTION_CNT 초기화
  const DIRECTION_CNT = 4;

  // row 방향을 계산할 배열 directionRow 선언 및 초기화
  const directionRow = [-1, 0, 1, 0]; // 상 하
  // col 방향을 계산할 배열 directionCol 선언 및 초기화
  const directionCol = [0, 1, 0, -1]; // 우 좌

  /**
   * 탐색이 가능한 좌표(탐색을 한 번도 하지 않은 경우, 배열을 벗어나지 않은 경우)인지 확인해주는 함수
   * @param {boolean[][]} visited
   * @param {number} row
   * @param {number} col
   * @returns {boolean}
   */
  const isValid = (visited, row, col) => {
    if (row < 0 || col < 0 || row >= ROW || col >= COL) {
      return false;
    }

    if (visited[row][col]) {
      return false;
    }

    return true;
  };

  // bfs 탐색에 활용할 queue
  const queue = [];
  // 초기 (row, col) 좌표를 queue에 push
  queue.push([row, col]);
  // 초기 (row, col) 좌표 탐색했다고 표시
  visited[row][col] = true;

  // 배열 요소가 1인 좌표를 담을 배열 coordinates 선언 및 초기화
  const coordinates = [];

  // queue가 비어있을 때까지 반복
  while (queue.length !== 0) {
    // 현재 방문한 배열의 위치를 담는 변수 cell 선언 및 초기화
    const cell = queue[0];
    // 현재 방문한 배열의 x 좌표, y 좌표를 각각 x, y 변수에 재할당
    const [x, y] = cell;

    // 배열의 요소가 1인 경우, coordinates 배열에 push
    if (grid[x][y] === 1) coordinates.push([x, y]);

    // dequeue
    queue.shift();

    // 상 하 좌 우 반복
    for (let i = 0; i < DIRECTION_CNT; i++) {
      // 인접한 x, y 좌표 계산
      const adjX = x + directionRow[i];
      const adjY = y + directionCol[i];

      // 탐색할 수 있는 좌표인 경우
      if (isValid(visited, adjX, adjY, ROW, COL)) {
        // queue에 인접해있는 좌표 삽입
        queue.push([adjX, adjY]);
        // 방문했다고 표시
        visited[adjX][adjY] = true;
      }
    }
  }

  // 배열의 요소가 1인 경우의 좌표 값들을 담은 배열 coordinates 배열 반환
  return coordinates;
}

/**
 * coordinates 배열에서 x좌표의 최댓값과 최솟값을 찾아서 width 값을 계산하는 함수
 * @param {number[][]} coordinates
 * @returns {number}
 */
function getWidth(coordinates) {
  const xCoordinates = coordinates.map((row) => row[1]);
  const maxX = Math.max(...xCoordinates);
  const minX = Math.min(...xCoordinates);
  return maxX - minX + 1;
}

/**
 * coordinates 배열에서 y좌표의 최댓값과 최솟값을 찾아서 height 값을 계산하는 함수
 * @param {number[][]} coordinates
 * @returns {number}
 */
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
  // ROW, COL 초기화
  const ROW = grid.length;
  const COL = grid[0].length;

  // bfs 순회시 사용할 visited 함수 선언 및 초기화, ROW * COL Matrix
  const visited = Array.from({ length: ROW }, () => Array(COL).fill(false));
  // bfs 순회하여 배열의 요소가 1인 좌표를 찾아내서 반환
  const coordinates = getCoordinates(grid, visited, 0, 0, ROW, COL);

  // width 계산
  const width = getWidth(coordinates);
  // height 계산
  const height = getHeight(coordinates);

  // 직사각형 area = width * height
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
