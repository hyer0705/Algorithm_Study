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

  const isAtLeastOneX = (xCnt) => xCnt > 0;
  const isEqualFrequencyXAndY = (xCnt, yCnt) => xCnt - yCnt === 0;

  const calcPrefixSum = (prefixSum, grid) => {
    prefixSum[0][0] = GRID[grid[0][0]];

    for (let col = 1; col < prefixSum[0].length; col++) {
      prefixSum[0][col] = GRID[grid[0][col]] + prefixSum[0][col - 1];
    }

    for (let row = 1; row < prefixSum.length; row++) {
      prefixSum[row][0] = GRID[grid[row][0]] + prefixSum[row - 1][0];
    }

    for (let row = 1; row < prefixSum.length; row++) {
      for (let col = 1; col < prefixSum[row].length; col++) {
        prefixSum[row][col] =
          prefixSum[row - 1][col] +
          prefixSum[row][col - 1] -
          prefixSum[row - 1][col - 1] +
          GRID[grid[row][col]];
      }
    }
  };
  const calcSpecificCharPrefixSum = (prefixSum, grid, target) => {
    prefixSum[0][0] = grid[0][0] === target ? 1 : 0;

    for (let col = 1; col < prefixSum[0].length; col++) {
      prefixSum[0][col] =
        grid[0][col] === target
          ? prefixSum[0][col - 1] + 1
          : prefixSum[0][col - 1];
    }

    for (let row = 1; row < prefixSum.length; row++) {
      prefixSum[row][0] =
        grid[row][0] === target
          ? prefixSum[row - 1][0] + 1
          : prefixSum[row - 1][0];
    }

    for (let row = 1; row < prefixSum.length; row++) {
      for (let col = 1; col < prefixSum[row].length; col++) {
        prefixSum[row][col] =
          prefixSum[row - 1][col] +
          prefixSum[row][col - 1] -
          prefixSum[row - 1][col - 1] +
          (grid[row][col] === target ? 1 : 0);
      }
    }
  };

  const prefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );
  const xCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );
  const yCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );

  calcPrefixSum(prefixSum, grid);
  calcSpecificCharPrefixSum(xCntPrefixSum, grid, "X");
  calcSpecificCharPrefixSum(yCntPrefixSum, grid, "Y");

  let zeroCnt = 0;
  for (let i = 0; i < prefixSum.length; i++) {
    for (let j = 0; j < prefixSum[i].length; j++) {
      if (prefixSum[i][j] === 0) {
        if (
          isAtLeastOneX(xCntPrefixSum[i][j]) &&
          isEqualFrequencyXAndY(xCntPrefixSum[i][j], yCntPrefixSum[i][j])
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
