/**
 * 3148. Maximum Difference Score in a Grid
 * URL: https://leetcode.com/contest/weekly-contest-397/problems/maximum-difference-score-in-a-grid/
 * Difficulty: Medium
 * Topic: Dynamic Programming
 * Date: 2024.05.12(SUN)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  let answer = -Infinity;
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let toRight = -Infinity,
        toRightOnce = -Infinity,
        toBottom = -Infinity,
        toBottomOnce = -Infinity;

      if (i + 1 < m) {
        toBottom = grid[i + 1][j] - grid[i][j] + dp[i + 1][j];
        toBottomOnce = grid[i + 1][j] - grid[i][j];
      }
      if (j + 1 < n) {
        toRight = grid[i][j + 1] - grid[i][j] + dp[i][j + 1];
        toRightOnce = grid[i][j + 1] - grid[i][j];
      }

      dp[i][j] = Math.max(toRight, toRightOnce, toBottom, toBottomOnce);
      answer = Math.max(answer, dp[i][j]);
    }
  }

  return answer;
};

const ans = maxScore([
  [4, 3, 2],
  [3, 2, 1],
]);

console.log(ans);
