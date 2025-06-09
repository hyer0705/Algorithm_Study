function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  const dp = new Array(n).fill(0);
  // dp[i]: i번째 집까지 털었을 때 (0~i), 얻을 수 있는 최대 금액
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[n - 1];
}

rob([1, 2, 3, 1]); // 4
rob([2, 7, 9, 3, 1]); // 12
