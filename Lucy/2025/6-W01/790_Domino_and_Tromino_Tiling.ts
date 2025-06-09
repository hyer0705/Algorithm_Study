function numTilings(n: number): number {
  const MOD = 10 ** 9 + 7;

  const dp = new Array(n + 1).fill(0);
  // dp[i]: 2 x i 보드를 완전히 채우는 방법의 수
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
  }

  return dp[n];
}
