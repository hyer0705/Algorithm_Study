/**
 * 3248. Snake in Matrix
 * url: https://leetcode.com/problems/snake-in-matrix/
 *
 * topic: Array, String, Simulation
 * difficulty: Easy
 * date: 2024.08.21(WED)~
 */

const COMMANDS = Object.freeze({
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
});
const MOVEMENT = Object.freeze({
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
});

/**
 * @param {number} n
 * @param {string[]} commands
 * @return {number}
 */
var finalPositionOfSnake = function (n, commands) {
  const grid = Array.from({ length: n }, (_) => new Array(n).fill(0));
  // 1. grid 초기화
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grid[i][j] = i * n + j;
    }
  }

  // 2. 명령어에 따라 이동
  let cell = [0, 0];
  commands.forEach((cmd) => {
    let nx = 0,
      ny = 0;

    switch (cmd) {
      case COMMANDS.UP:
        nx = MOVEMENT.UP[0];
        ny = MOVEMENT.UP[1];
        break;
      case COMMANDS.DOWN:
        nx = MOVEMENT.DOWN[0];
        ny = MOVEMENT.DOWN[1];
        break;
      case COMMANDS.LEFT:
        nx = MOVEMENT.LEFT[0];
        ny = MOVEMENT.LEFT[1];
        break;
      case COMMANDS.RIGHT:
        nx = MOVEMENT.RIGHT[0];
        ny = MOVEMENT.RIGHT[1];
        break;
    }

    cell[0] += nx;
    cell[1] += ny;
  });

  const [x, y] = cell;
  return grid[x][y];
};

console.log(finalPositionOfSnake(2, ["RIGHT", "DOWN"]));
console.log(finalPositionOfSnake(3, ["DOWN", "RIGHT", "UP"]));
