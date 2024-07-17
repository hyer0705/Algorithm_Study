public class Solution
{
    public string GetEncryptedString(string s, int k)
    {
        string result = "";
        for (int i = 0; i < s.Length; i++)
        {
            int encryptedIndex = (i + k) % s.Length;
            result += s[encryptedIndex];
        }
        return result;
    }
}