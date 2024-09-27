// 딕셔너리를 이용하여 기존에 있는 키 값이라면 result에 추가하는 방법으로 진행하였다.
public class Solution
{
	public int[] GetSneakyNumbers(int[] nums)
	{
		Dictionary<int, int> freqNumberDic = new Dictionary<int, int>();

		// HashSet 자료형은 List와 비슷하지만 동일한 값을 넣을 수 없는 자료형이다.
		HashSet<int> result = new HashSet<int>();

		foreach (int num in nums)
		{
			if (freqNumberDic.ContainsKey(num))
			{
				results.Add(num);
			}
			else
			{
				freqNumberDic[num] = 0;
			}
		}

		return result.ToArray();
	}
}