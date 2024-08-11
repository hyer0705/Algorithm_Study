public class NeighborSum
{

	int[][] grid;

	public NeighborSum(int[][] grid)
	{
		int rows = grid.Length;
		int cols = grid[0].Length;

		this.grid = new int[rows][];
		for (int i = 0; i < rows; i++)
		{
			this.grid[i] = new int[cols];
		}

		for (int i = 0; i < grid.Length; i++)
		{
			for (int j = 0; j < grid[0].Length; j++)
			{
				this.grid[i][j] = grid[i][j];
			}
		}
	}

	public int AdjacentSum(int value)
	{

		int sum = 0;

		for (int i = 0; i < grid.Length; i++)
		{
			for (int j = 0; j < grid[0].Length; j++)
			{
				if (value == grid[i][j])
				{
					sum += i - 1 >= 0 ? grid[i - 1][j] : 0;
					sum += i + 1 < grid.Length ? grid[i + 1][j] : 0;
					sum += j - 1 >= 0 ? grid[i][j - 1] : 0;
					sum += j + 1 < grid[0].Length ? grid[i][j + 1] : 0;
					return sum;
				}
			}
		}

		return 0;
	}

	public int DiagonalSum(int value)
	{

		int sum = 0;

		for (int i = 0; i < grid.Length; i++)
		{
			for (int j = 0; j < grid[0].Length; j++)
			{
				if (value == grid[i][j])
				{
					sum += (i - 1 >= 0 && j - 1 >= 0) ? grid[i - 1][j - 1] : 0;
					sum += (i - 1 >= 0 && j + 1 < grid[0].Length) ? grid[i - 1][j + 1] : 0;
					sum += (i + 1 < grid.Length && j + 1 < grid[0].Length) ? grid[i + 1][j + 1] : 0;
					sum += (i + 1 < grid.Length && j - 1 >= 0) ? grid[i + 1][j - 1] : 0;
					return sum;
				}
			}
		}

		return 0;
	}
}