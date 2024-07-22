using System.Collections.Generic;
using System.Linq;

public class Solution
{
    // 가로로 한 번 자르게 되면 두 덩이가 생기게 되는데 이는 세로로 자르기 위해서는 두 번의 자르는 행위를 해야한다.
    // 즉, 자르는 축을 기준으로 다른 축은 잘라야 하는 횟수가 계속해서 하나씩 증가한다는 것을 알 수 있다.

    // 문제는 최소 비용을 구하는 것이므로, 큰 비용에 대해서 잘라야 하는 횟수가 적어야 한다.
    // 즉, 내림차순 정렬을 통하여 먼저 큰 비용에 해당하는 값으로 자르는 행위를 진행한다.
    public long MinimumCost(int m, int n, int[] horizontalCut, int[] verticalCut)
    {
        long minimumCost = 0;

        // 내림 차순 정렬.
        List<int> horizontalCutList = horizontalCut.OrderByDescending(num => num).ToList();
        List<int> verticalCutList = verticalCut.OrderByDescending(num => num).ToList();

        int horizontalLine = 1;
        int verticalLine = 1;

        int hArrayLength = horizontalCut.Length;
        int vArrayLength = verticalCut.Length;
        int hIndex = 0;
        int vIndex = 0;

        while (hIndex < horizontalCutList.Count || vIndex < verticalCutList.Count)
        {
            // 문제 조건에서 배열의 최소값은 1이므로, 0은 나올수 없는 값.
            int hMax = hIndex < horizontalCutList.Count ? horizontalCutList[hIndex] : 0;
            int vMax = vIndex < verticalCutList.Count ? verticalCutList[vIndex] : 0;

            if (hMax >= vMax)
            {
                // 가로로 자르면 세로라인을 하나 증가시킴.
                minimumCost += hMax * horizontalLine;
                verticalLine++;
                hIndex++;
            }
            else
            {
                // 세로로 자르면 가로라인을 하나 증가시킴.
                minimumCost += vMax * verticalLine;
                horizontalLine++;
                vIndex++;
            }
        }

        return minimumCost;
    }
}