public class Solution
{
	public string MergeAlternately(string word1, string word2)
	{
		int strIndex = 0;
		StringBuilder str = new StringBuilder();

		while (strIndex < word1.Length && strIndex < word2.Length)
		{
			str.Append(word1[strIndex]);
			str.Append(word2[strIndex]);

			strIndex++;
		}

		if (strIndex < word1.Length)
		{
			str.Append(word1.Substring(strIndex, word1.Length - strIndex));
		}
		else if (strIndex < word2.Length)
		{
			str.Append(word2.Substring(strIndex, word2.Length - strIndex));
		}

		return str.ToString();
	}
}