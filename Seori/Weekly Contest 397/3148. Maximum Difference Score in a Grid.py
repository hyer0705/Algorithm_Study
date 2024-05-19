class Solution:
    def maxScore(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        INF = 10 ** 5

        # [1] dp[i][j] = max value starting from (m, n)
        dp = [[0] * n for _ in range(m)]
        answer = -INF
        for j in range(n-1, -1, -1):
            for i in range(m-1, -1, -1):
                now = -INF
                if i < m-1:
                    now = max(now, dp[i+1][j])
                if j < n-1:
                    now = max(now, dp[i][j+1])
                dp[i][j] = max(now, grid[i][j])

                # [2] now - grid[i][j] = available max score starting from (i, j)
                answer = max(answer, now - grid[i][j])

        return answer