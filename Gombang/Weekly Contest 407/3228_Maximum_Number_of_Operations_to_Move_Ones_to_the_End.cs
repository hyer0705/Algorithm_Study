public class Solution
{
    public int MaxOperations(string s)
    {
        int oneNumberCount = 0;
        int answer = 0;

        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '0')
            {
                answer += oneNumberCount;
                while (i < s.Length && s[i] != '1')
                {
                    i++;
                }
            }
            oneNumberCount++;
        }
        return answer;
    }
}