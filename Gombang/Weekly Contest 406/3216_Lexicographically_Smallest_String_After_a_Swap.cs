public class Solution
{
    public string GetSmallestString(string s)
    {
        char[] charArray = s.ToCharArray();

        for (int i = 1; i < charArray.Length; i++)
        {
            int num1 = int.Parse(charArray[i - 1].ToString());
            int num2 = int.Parse(charArray[i].ToString());

            if (num1 > num2 && (num1 + num2) % 2 == 0)
            {
                char temp = charArray[i];
                charArray[i] = charArray[i - 1];
                charArray[i - 1] = temp;
                break;
            }
        }

        return new string(charArray);
    }
}