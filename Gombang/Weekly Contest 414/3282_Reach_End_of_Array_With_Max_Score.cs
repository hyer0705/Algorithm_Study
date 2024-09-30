
// 현재 인덱스에 해당하는 값보다 더 큰 값이 나올 경우에
// 더 큰 값으로 점프를 진행하여 점수를 계산하는 방식으로 문제 풀이 진행하였습니다.

public class Solution
{
	public long FindMaximumScore(IList<int> nums)
	{
		long answer = 0;
		int currIndex = 0;

		for (int i = 1; i < nums.Count; i++)
		{
			if (nums[currIndex] < nums[i])
			{
				answer += (i - currIndex) * (long)nums[currIndex];
				currIndex = i;
			}
		}

		if (currIndex < nums.Count - 1)
		{
			answer += (nums.Count - 1 - currIndex) * (long)nums[currIndex];
		}

		return answer;
	}
}