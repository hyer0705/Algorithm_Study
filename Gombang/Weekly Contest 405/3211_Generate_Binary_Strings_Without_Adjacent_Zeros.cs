public class Solution
{
    public IList<string> ValidStrings(int n)
    {
        IList<string> result = new List<string>();

        //0 과 1에 대해서 재귀 호출 시작.
        AppendNum(n, "0", result);
        AppendNum(n, "1", result);

        return result;
    }

    private void AppendNum(int n, string s, IList<string> result)
    {
        if (s.Length >= n)
        {
            result.Add(s);
            return;
        }

        // 마지막 요소가 0이라면 1만 붙을 수 있다.
        if ($"{s.Last()}" == "0")
            AppendNum(n, $"{s}1", result);
        else // 마지막 요소가 1이라면 0과 1이 뒤에 붙을 수 있다.
        {
            AppendNum(n, $"{s}0", result);
            AppendNum(n, $"{s}1", result);
        }
    }
}