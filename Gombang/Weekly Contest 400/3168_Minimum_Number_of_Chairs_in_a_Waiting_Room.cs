public class Solution
{
    public int MinimumChairs(string s)
    {
        int currentChairs = 0;

        int result = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == 'E')
            {
                currentChairs++;
                if (result < currentChairs)
                    result = currentChairs;
            }
            else
                currentChairs--;
        }

        return result;
    }
}