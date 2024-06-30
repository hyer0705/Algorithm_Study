using System;

public class Solution
{
    public double MinimumAverage(int[] nums)
    {
        // 오름차순 정렬
        Array.Sort(nums);

        double result = double.MaxValue;
        int left = 0;
        int right = nums.Length - 1;

        while (left < right)
        {
            double average = (nums[left] + nums[right]) / 2.0;
            if (result > average)
                result = average;

            left++;
            right--;
        }

        return result;
    }
}