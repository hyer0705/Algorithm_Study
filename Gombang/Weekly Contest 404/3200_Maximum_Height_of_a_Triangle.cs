public class Solution
{
    public int MaxHeightOfTriangle(int red, int blue)
    {
        // red를 먼저 쌓았을 때의 높이와 blue를 먼저 쌓았을 때의 높이 중에 더 큰 높이를 반환.
        return Math.Max(GetHeight(red, blue), GetHeight(blue, red));
    }

    private int GetHeight(int ball1, int ball2)
    {
        int height = 0;

        int i = 1;
        while (true)
        {
            // 홀수 층 쌓을때 필요한 공의 개수 1, 3, 5, 7, ...
            ball1 -= (2 * i) - 1;
            if (ball1 < 0)
                break;

            height++;

            // 짝수 층 쌓을때 필요한 공의 개수 2, 4, 6, 8, ...
            ball2 -= (2 * i);
            if (ball2 < 0)
                break;

            height++;
            i++;
        }

        return height;
    }
}