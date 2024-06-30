class Solution:
    def valueAfterKSeconds(self, n: int, k: int) -> int:
        # dp[i][j] = dp[i-1][j] + dp[i][j-1]
        MOD = 10**9 + 7
        cur = [1]*n # dp[i]
        prev = [1]*n # dp[i-1]
        for _ in range(k):
            for j in range(1, n):
                cur[j] = (prev[j] + cur[j-1]) % MOD
            prev = cur
        return cur[n-1]