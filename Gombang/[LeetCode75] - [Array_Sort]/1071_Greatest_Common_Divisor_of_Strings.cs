public class Solution
{
	public string GcdOfStrings(string str1, string str2)
	{
		int min = Math.Min(str1.Length, str2.Length);

		List<string> divisorList = new List<string>();

		string divisorStr = "";
		for (int i = 0; i < min; ++i)
		{
			if (str1[i] == str2[i])
				divisorStr += str1[i];
			else
				break;

			divisorList.Add(divisorStr);
		}

		// 역순으로 진행하여 길이가 긴 요소부터 체크.
		for (int i = divisorList.Count - 1; i >= 0; --i)
		{
			if (IsDivisible(str1, divisorList[i]) && IsDivisible(str2, divisorList[i]))
				return divisorList[i].ToString();
		}

		return "";
	}

	// str이 divisor에 의해 나눠지는지를 체크해주는 함수.
	private bool IsDivisible(string targetStr, string divisorStr)
	{
		// targetStr길이가 divisorStr길이에 의해 나누어 떨어지지 않으면 배수가 아니므로 false를 반환.
		if (targetStr.Length % divisorStr.Length != 0)
			return false;

		int repeatCount = targetStr.Length / divisorStr.Length;
		StringBuilder strBuilder = new StringBuilder();
		for (int i = 0; i < repeatCount; ++i)
		{
			strBuilder.Append(divisorStr);
		}

		return strBuilder.ToString() == targetStr;
	}
}