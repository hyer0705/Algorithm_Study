function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length;
  const dp = new Array(n).fill(0);
  // dp[i] = i번째 계단까지 오를 때의 최소 비용
  dp[0] = cost[0];
  dp[1] = cost[1];

  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i];
  }

  return Math.min(dp[n - 1], dp[n - 2]);
}

minCostClimbingStairs([10, 15, 20]); // 15
minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]); // 6
minCostClimbingStairs([0, 1, 2, 2]); // 2
