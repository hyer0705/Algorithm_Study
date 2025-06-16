// 1ms 소요
function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = 1;

  // dp 배열의 1행 요소 채우기
  for (let col = 1; col < n; col++) {
    dp[0][col] += dp[0][col - 1];
  }

  // dp 배열의 1열 요소 채우기
  for (let row = 1; row < m; row++) {
    dp[row][0] += dp[row - 1][0];
  }

  // dp 배열의 나머지 요소 채우기
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[row][col] += dp[row][col - 1] + dp[row - 1][col];
    }
  }

  return dp[m - 1][n - 1];
}

// 0ms 소요
function uniquePaths(m: number, n: number): number {
  const dp = new Array(n).fill(1);

  // dp[i] = dp[i] + dp[i - 1]; (i >= 1)
  //    dp[i] = dp[row - 1][col]
  //    dp[i - 1] = dp[row][col - 1]
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dp[col] += dp[col - 1];
    }
  }

  return dp[n - 1];
}
