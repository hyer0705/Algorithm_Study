function longestCommonSubsequence(text1: string, text2: string): number {
  const row = text1.length;
  const col = text2.length;

  const dp = Array.from({ length: row }, () => new Array(col).fill(0));

  dp[0][0] = text1[0] === text2[0] ? 1 : 0;

  // 첫 번째 행 채우기
  for (let j = 1; j < col; j++) {
    dp[0][j] = dp[0][j - 1] || (text1[0] === text2[j] ? 1 : 0);
  }

  // 첫 번째 열 채우기
  for (let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] || (text1[i] === text2[0] ? 1 : 0);
  }

  // 나머지 채우기
  //  dp[i][j]: text1.substring(0, i + 1) 과 text2.substring(0, j + 1)의 LCS 길이
  //  text1[i] === text2[j]: dp[i - 1][j - 1] + 1
  //  text1[i] !== text2[j]: Math.max(dp[i - 1][j], d[i][j - 1])
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (text1[i] !== text2[j]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      } else {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }

  return dp[row - 1][col - 1];
}
