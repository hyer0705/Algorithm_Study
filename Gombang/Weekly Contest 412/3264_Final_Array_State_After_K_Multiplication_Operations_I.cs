public class Solution
{
	public int[] GetFinalState(int[] nums, int k, int multiplier)
	{
		for (int i = 0; i < k; i++)
		{
			int minIndex = 0;

			// 가장 작은 값의 인덱스를 찾는 과정 진행
			for (int j = 1; j < nums.Length; j++)
			{
				if (nums[j] < nums[minIndex])
					minIndex = j;
			}

			nums[minIndex] *= multiplier;
		}

		return nums;
	}
}