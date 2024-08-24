public class Solution
{
	public int CountKConstraintSubstrings(string s, int k)
	{
		int result = 0;
		int leftIndex = 0;

		while (leftIndex < s.Length)
		{
			int zeroCnt = 0;
			int oneCnt = 0;

			for (int i = leftIndex; i < s.Length; i++)
			{
				if (s[i] == '0')
					zeroCnt++;
				else
					oneCnt++;

				if (zeroCnt <= k || oneCnt <= k)
					result++;
				else
					break;
			}

			leftIndex++;
		}

		return result;
	}
}