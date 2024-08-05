public class Solution
{
	public bool CanAliceWin(int[] nums)
	{

		int singleDigitSum = 0;
		int doubleDigitSum = 0;

		for (int i = 0; i < nums.Length; i++)
		{
			if (nums[i] < 10)
			{
				singleDigitSum += nums[i];
			}
			else
			{
				doubleDigitSum += nums[i];
			}
		}

		return singleDigitSum != doubleDigitSum;
	}
}