public class Solution
{
    public long MaximumTotalCost(int[] nums)
    {
        if (nums.Length == 1)
            return nums[0];

        int length = nums.Length;

        // dp배열을 만들고 가장 작은 값으로 초기화.
        long[] dp = new long[length];
        for (int i = 0; i < length; i++)
            dp[i] = long.MinValue;

        // 0번째 인덱스와 1번째 인덱스는 수동으로 값 저장.
        dp[0] = nums[0];

        if (nums[1] < 0)
            dp[1] = dp[0] + -1 * nums[1];
        else
            dp[1] = dp[0] + nums[1];

        // 2번째 인덱스부터 dp계산 활용.
        for (int i = 2; i < length; i++)
        {
            if (nums[i] < 0)
                dp[i] = dp[i - 2] + nums[i - 1] + nums[i] * -1;

            dp[i] = Math.Max(dp[i], dp[i - 1] + nums[i]);
        }

        return dp[length - 1];
    }
}