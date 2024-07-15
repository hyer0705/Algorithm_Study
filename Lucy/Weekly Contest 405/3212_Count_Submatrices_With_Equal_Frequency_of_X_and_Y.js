/**
 * 3212. Count Submatrices With Equal Frequency of X and Y
 *
 * url: https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/
 * difficulty: Medium
 * topic: Array, Matrix, Prefix Sum
 * date: 2024.07.15(MON)~
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function (grid) {
  const GRID = Object.freeze({
    X: 1,
    Y: -1,
    ".": 0,
  });

  const prefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );
  const xCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );
  const yCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );

  prefixSum[0][0] = GRID[grid[0][0]];
  xCntPrefixSum[0][0] = grid[0][0] === "X" ? 1 : 0;
  yCntPrefixSum[0][0] = grid[0][0] === "Y" ? 1 : 0;

  for (let col = 1; col < prefixSum[0].length; col++) {
    prefixSum[0][col] = GRID[grid[0][col]] + prefixSum[0][col - 1];
    xCntPrefixSum[0][col] =
      grid[0][col] === "X"
        ? xCntPrefixSum[0][col - 1] + 1
        : xCntPrefixSum[0][col - 1];
    yCntPrefixSum[0][col] =
      grid[0][col] === "Y"
        ? yCntPrefixSum[0][col - 1] + 1
        : yCntPrefixSum[0][col - 1];
  }

  for (let row = 1; row < prefixSum.length; row++) {
    prefixSum[row][0] = GRID[grid[row][0]] + prefixSum[row - 1][0];
    xCntPrefixSum[row][0] =
      grid[row][0] === "X"
        ? xCntPrefixSum[row - 1][0] + 1
        : xCntPrefixSum[row - 1][0];
    yCntPrefixSum[row][0] =
      grid[row][0] === "Y"
        ? yCntPrefixSum[row - 1][0] + 1
        : yCntPrefixSum[row - 1][0];
  }

  for (let row = 1; row < prefixSum.length; row++) {
    for (let col = 1; col < prefixSum[row].length; col++) {
      prefixSum[row][col] =
        prefixSum[row - 1][col] +
        prefixSum[row][col - 1] -
        prefixSum[row - 1][col - 1] +
        GRID[grid[row][col]];

      xCntPrefixSum[row][col] =
        xCntPrefixSum[row - 1][col] +
        xCntPrefixSum[row][col - 1] -
        xCntPrefixSum[row - 1][col - 1] +
        (grid[row][col] === "X" ? 1 : 0);

      yCntPrefixSum[row][col] =
        yCntPrefixSum[row - 1][col] +
        yCntPrefixSum[row][col - 1] -
        yCntPrefixSum[row - 1][col - 1] +
        (grid[row][col] === "Y" ? 1 : 0);
    }
  }

  console.log(prefixSum);
  console.log(xCntPrefixSum, yCntPrefixSum);

  let zeroCnt = 0;
  for (let i = 0; i < prefixSum.length; i++) {
    for (let j = 0; j < prefixSum[i].length; j++) {
      if (prefixSum[i][j] === 0) {
        if (
          xCntPrefixSum[i][j] > 0 &&
          xCntPrefixSum[i][j] - yCntPrefixSum[i][j] === 0
        )
          zeroCnt++;
      }
    }
  }

  return zeroCnt;
};

console.log(
  numberOfSubmatrices([
    ["X", "Y", "."],
    ["Y", ".", "."],
  ])
);
