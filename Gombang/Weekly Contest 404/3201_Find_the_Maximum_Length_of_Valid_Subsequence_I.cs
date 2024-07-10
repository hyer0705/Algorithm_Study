public class Solution
{
    public int MaximumLength(int[] nums)
    {
        int even = 0, odd = 0;
        int toggleState = nums[0] % 2;
        int toggleCount = 0;

        // 반복문을 돌리면서 값이 짝수면 even값을 ++, 홀수이면 odd값을 ++.
        // 만약 짝수와 홀수가 번갈아 나오는 상황에 대해 체크하기 위해서 toggleState로 
        // 해당 상황을 체크하며, toggleCount값을 증가시킴.
        foreach (int num in nums)
        {
            if (num % 2 == 0)
                even++;
            else
                odd++;

            if (num % 2 == toggleState)
            {
                toggleCount++;
                toggleState = 1 - toggleState;
            }
        }

        return Math.Max(toggleCount, Math.Max(odd, even));
    }
}