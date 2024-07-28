using System.Collections.Generic;

public class Solution
{
    public bool DoesAliceWin(string s)
    {
        List<char> vowels = new List<char>()
        {
            'a', 'e', 'i', 'o', 'u'
        };

        int vowelCount = 0;

        for (int i = 0; i < s.Length; i++)
        {
            if (vowels.Contains(s[i]))
                vowelCount++;
        }

        return vowelCount > 0 ? true : false;
    }
}