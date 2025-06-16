// 100ms
function maxProfit(prices: number[], fee: number): number {
  const endDay = prices.length;

  const dp = Array.from({ length: endDay }, () => new Array(2).fill(0));
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  // dp[i][0] = 전날 '안 가지고 있었다' or (전날 가지고 있다가 오늘 판다)
  // dp[i][1] = 전날 '가지고 있었다' or (전날 안 가지고 있다가 오늘 산다)
  for (let i = 1; i < endDay; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[endDay - 1][0];
}

// 8ms
function maxProfit(prices: number[], fee: number): number {
  const n = prices.length;

  let hold = -prices[0];
  let sell = 0;

  // hold: 전날 '가지고 있었다' or (전날 안 가지고 있다가 오늘 산다)
  // sell: 전날 '안 가지고 있었다' or (전날 가지고 있다가 오늘 판다)
  for (let i = 1; i < n; i++) {
    [hold, sell] = [Math.max(hold, sell - prices[i]), Math.max(sell, hold + prices[i] - fee)];
  }

  return sell;
}
