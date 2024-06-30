public class Solution
{
    public int MinimumArea(int[][] grid)
    {

        // 가로로 보았을 때, 1의 인덱스가 가장 작은 값과 가장 큰 값을 담을 변수
        int horizontalFirstOneIndex = int.MaxValue;
        int horizontalLastOneIndex = int.MinValue;

        // 세로로 보았을 때, 1의 인덱스가 가장 작은 값과 가장 큰 값을 담을 변수
        int verticalFirstOneIndex = int.MaxValue;
        int verticalLastOneIndex = int.MinValue;

        for (int i = 0; i < grid.Length; i++)
        {
            for (int j = 0; j < grid[0].Length; j++)
            {
                if (grid[i][j] == 1)
                {
                    if (horizontalFirstOneIndex > j) horizontalFirstOneIndex = j;
                    if (horizontalLastOneIndex < j) horizontalLastOneIndex = j;

                    if (verticalFirstOneIndex > i) verticalFirstOneIndex = i;
                    if (verticalLastOneIndex < i) verticalLastOneIndex = i;
                }
            }
        }

        int width = horizontalLastOneIndex - horizontalFirstOneIndex + 1;
        int height = verticalLastOneIndex - verticalFirstOneIndex + 1;

        return width * height;
    }
}