function tribonacci(n: number): number {
  const dp: number[] = Array.from({ length: n }, (_) => 0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;

  for (let i = 0; i + 3 <= n; i++) {
    dp[i + 3] = dp[i] + dp[i + 1] + dp[i + 2];
  }

  return dp[n];
}

tribonacci(4); // 4
tribonacci(25); // 1389537
