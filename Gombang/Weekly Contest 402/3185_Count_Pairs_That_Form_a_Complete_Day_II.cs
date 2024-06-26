public class Solution
{
    public long CountCompleteDayPairs(int[] hours)
    {
        long result = 0;
        int[] count = new int[24];

        for (int i = 0; i < hours.Length; i++)
        {
            // hours[i]를 기준으로 complete day가 되기 위해 필요한 시간을 구하는 코드.
            int complementTo24 = (24 - hours[i] % 24);

            // 배열에 담긴 complementTo24의 인덱스의 개수만큼을 결과값에 더해주는 코드.
            result += count[complementTo24 % 24];

            // hours[i]인덱스를 하나 증가시킴.
            count[hours[i] % 24]++;
        }

        return result;
    }
}