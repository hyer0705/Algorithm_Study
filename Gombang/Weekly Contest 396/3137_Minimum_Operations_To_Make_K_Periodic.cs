public class Solution
{
    public int MinimumOperationsToMakeKPeriodic(string word, int k)
    {
        Dictionary<string, int> splitDic = new Dictionary<string, int>();
        for (int i = 0; i < word.Length; i += k)
        {
            string splitWord = word.Substring(i, k);

            if (splitDic.ContainsKey(splitWord))
            {
                splitDic[splitWord]++;
            }
            else
            {
                splitDic[splitWord] = 1;
            }
        }

        int maxCount = 0;
        foreach (var keyValuePair in splitDic)
        {
            if (maxCount < keyValuePair.Value)
                maxCount = keyValuePair.Value;
        }

        return (word.Length / k) - maxCount;
    }
}