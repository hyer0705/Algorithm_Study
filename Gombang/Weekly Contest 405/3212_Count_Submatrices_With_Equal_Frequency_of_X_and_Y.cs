public class Solution
{
    // Prefix Sum 알고리즘을 활용하여 진행.
    public int NumberOfSubmatrices(char[][] grid)
    {
        int result = 0;

        int n = grid.Length;
        int m = grid[0].Length;

        // x 및 y가 나오는 빈도수를 저장할 2차원 배열 두 개 생성.
        int[,] x = new int[n + 1, m + 1];
        int[,] y = new int[n + 1, m + 1];

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                x[i + 1, j + 1] = x[i, j + 1] + x[i + 1, j] - x[i, j] + (grid[i][j] == 'X' ? 1 : 0);
                y[i + 1, j + 1] = y[i, j + 1] + y[i + 1, j] - y[i, j] + (grid[i][j] == 'Y' ? 1 : 0);

                // (i + 1, j + 1)에 해당하는 x의 빈도수 y빈도수가 동일하면 result값을 하나 증가.
                if (x[i + 1, j + 1] == y[i + 1, j + 1] && x[i + 1, j + 1] > 0)
                    result++;
            }
        }

        return result;
    }
}