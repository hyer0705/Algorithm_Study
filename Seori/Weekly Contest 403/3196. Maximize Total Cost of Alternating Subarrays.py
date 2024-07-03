class Solution:
    def maximumTotalCost(self, nums: List[int]) -> int:
        '''
        문제에서 핵심은 연속해서 nums의 수를 뺄 수는 없다는 것이다. 따라서 dp[0]에는 더한 값을, dp[1]에는 뺀 값을 저장하여 구성하였다.
        The key point is that you cannot subtract the numbers in nums continuously. Therefore, I composed it by storing the added value in dp[0] and the subtracted value in dp[1].
        '''
        n = len(nums)
        dp = [[0] * n for _ in range(2)]
        dp[0][0], dp[1][0] = nums[0], nums[0]
        for i in range(1, n):
            dp[0][i] = max(dp[0][i-1], dp[1][i-1]) + nums[i] # dp[0]에는 i번째 수를 더한 값만을,
            dp[1][i] = dp[0][i-1] - nums[i]                  # dp[1]에는 i번째 수를 뺀 값만을 저장한다.
        return max(dp[0][n-1], dp[1][n-1])