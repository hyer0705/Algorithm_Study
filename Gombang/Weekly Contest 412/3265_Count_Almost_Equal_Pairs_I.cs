public class Solution
{
	public int CountPairs(int[] nums)
	{
		Array.Sort(nums);

		int count = 0;
		for (int i = 0; i < nums.Length; i++)
		{
			for (int j = i + 1; j < nums.Length; j++)
			{
				string numStr1 = nums[i].ToString();
				string numStr2 = nums[j].ToString();

				// numStr1과 numStr2 reverse 진행.
				// reverse를 진행하는 이유는 numStr1의 길이가 numStr2보다 작을 경우 0으로 채워넣기 위해서 진행한다.
				char[] s1Array = numStr1.ToCharArray();
				Array.Reverse(s1Array);
				numStr1 = new string(s1Array);

				char[] s2Array = numStr2.ToCharArray();
				Array.Reverse(s2Array);
				numStr2 = new string(s2Array);

				while (numStr1.Length < numStr2.Length)
				{
					numStr1 += '0';
				}

				var diffIndexList = new List<int>();
				for (int k = 0; k < numStr1.Length; k++)
				{
					if (numStr1[k] != numStr2[k])
					{
						diffIndexList.Add(k);
					}
				}

				if (diffIndexList.Count == 0)
				{
					count++;
					continue;
				}

				if (diffIndexList.Count != 2) continue;

				// 다른 두 인덱스에 해당하는 문자를 swap.
				char[] s1CharArray = numStr1.ToCharArray();
				char temp = s1CharArray[diffIndexList[0]];
				s1CharArray[diffIndexList[0]] = s1CharArray[diffIndexList[1]];
				s1CharArray[diffIndexList[1]] = temp;

				numStr1 = new string(s1CharArray);

				if (numStr1 == numStr2)
					count++;
			}
		}

		return count;
	}
}