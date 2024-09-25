class Solution:
    def maxScore(self, a: List[int], b: List[int]) -> int:
        # i0, i1, i2, i3을 골랐을 때 각각 2차원 배열 dp의 [0], [1], [2], [3]에 저장하면서 최대값을 찾아낸다.
        INF = 10 ** 15
        dp = [[-INF] * len(b) for _ in range(4)]
        dp[0][0] = a[0] * b[0]
        for i in range(1, len(b)):
            dp[0][i] = max(dp[0][i-1], a[0] * b[i])
            dp[1][i] = max(dp[1][i-1], dp[0][i-1] + a[1] * b[i])
            dp[2][i] = max(dp[2][i-1], dp[1][i-1] + a[2] * b[i])
            dp[3][i] = max(dp[3][i-1], dp[2][i-1] + a[3] * b[i])
        return dp[3][-1]