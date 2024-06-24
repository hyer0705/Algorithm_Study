public class Solution
{
    public long MaximumTotalDamage(int[] power)
    {
        // 빈도수 계산.
        Dictionary<int, long> damageFrequency = new Dictionary<int, long>();
        foreach (var damage in power)
        {
            if (damageFrequency.ContainsKey(damage))
            {
                damageFrequency[damage]++;
            }
            else
            {
                damageFrequency[damage] = 1;
            }
        }

        // damageFrequency의 key값들만 가진 리스트형 변수 생성.
        List<int> uniqueDamages = damageFrequency.Keys.ToList();
        uniqueDamages.Sort(); // uniqueDamages 오름차순 정렬.

        long[] maxDamageDP = new long[uniqueDamages.Count];

        maxDamageDP[0] = uniqueDamages[0] * damageFrequency[uniqueDamages[0]];

        // 1번 인덱스부터 dp계산 진행.
        for (int i = 1; i < uniqueDamages.Count; i++)
        {
            int currentDamageValue = uniqueDamages[i];
            long currentDamageTotal = currentDamageValue * damageFrequency[currentDamageValue];

            maxDamageDP[i] = maxDamageDP[i - 1];

            int previousIndex = i - 1;
            while (previousIndex >= 0 &&
                   (uniqueDamages[previousIndex] == currentDamageValue - 1 ||
                    uniqueDamages[previousIndex] == currentDamageValue - 2 ||
                    uniqueDamages[previousIndex] == currentDamageValue + 1 ||
                    uniqueDamages[previousIndex] == currentDamageValue + 2))
            {
                previousIndex--;
            }

            if (previousIndex >= 0)
            {
                maxDamageDP[i] = Math.Max(maxDamageDP[i], maxDamageDP[previousIndex] + currentDamageTotal);
            }
            else
            {
                maxDamageDP[i] = Math.Max(maxDamageDP[i], currentDamageTotal);
            }
        }

        return maxDamageDP[uniqueDamages.Count - 1];
    }
}