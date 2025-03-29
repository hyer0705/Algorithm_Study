/**
 * 3212. Count Submatrices With Equal Frequency of X and Y
 *
 * url: https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/
 * difficulty: Medium
 * topic: Array, Matrix, Prefix Sum
 * date: 2024.07.15(MON)~
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function (grid) {
  // "X", "Y", "." 문자를 숫자로 치환하는 상수 GRID
  const GRID = Object.freeze({
    X: 1,
    Y: -1,
    ".": 0,
  });

  // submatrix에 최소 하나의 "X"가 있는지 판단하는 함수
  const isAtLeastOneX = (xCnt) => xCnt > 0;
  // submatrix에 "X"와 "Y"의 빈도수가 동일한지 판단하는 함수
  const isEqualFrequencyXAndY = (xCnt, yCnt) => xCnt - yCnt === 0;

  // 주어진 그리드에 대한 prefixSum 배열을 계산하는 함수
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
  // 특정 문자의 누적 합(prefix sum) 배열을 계산하는 함수
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

  // "X"와 "Y"를 각각 1, -1로 치환하여 누적 합 배열(prefix sum)을 계산하기 위한 배열
  const prefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );

  // "X"의 갯수를 계산하기 위한 누적 합 배열
  const xCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );
  // "Y"의 갯수를 계산하기 위한 누적 합 배열
  const yCntPrefixSum = Array.from({ length: grid.length }, (_) =>
    new Array(grid[0].length).fill(0)
  );

  calcPrefixSum(prefixSum, grid);
  calcSpecificCharPrefixSum(xCntPrefixSum, grid, "X");
  calcSpecificCharPrefixSum(yCntPrefixSum, grid, "Y");

  // prefixSum 배열의 요소 중 값이 0인 요소 중에 문제에 나온 submatrix 조건을 만족하는 경우 zeroCnt 변수 count
  // submatrix 조건
  // 1. grid[0][0] 포함
  // 2. an equal frequency of 'X' and 'Y'
  // 3. at least one 'X'

  // 조건을 만족하는 submatrix의 수를 세기 위한 변수
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
