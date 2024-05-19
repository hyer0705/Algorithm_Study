public class Solution
{
    // 단순하게 이중 포문을 이용하여 인덱스의 차이 값을 계산하여 풀이하였습니다.
    public int FindPermutationDifference(string s, string t)
    {
        int sum = 0;

        for (int i = 0; i < s.Length; i++)
        {
            for (int j = 0; j < t.Length; j++)
            {
                if (s[i] == t[j])
                {
                    sum += Math.Abs(i - j);
                    break;
                }
            }
        }

        return sum;
    }   
}