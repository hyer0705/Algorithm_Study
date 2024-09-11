
// 해당 풀이 실패. 입력값이 많아지면 Time Limit Exceeded 발생( 513 / 545 testcases passed )

public class Solution
{
	private int maxScore;

	public int MaxScore(IList<IList<int>> grid)
	{
		maxScore = 0;

		// HashSet클래스는 List와 비슷하지만 동일하지 않은 값만 추가할 수 있는 특징을 가지고 있다.
		Backtrack(grid, 0, new HashSet<int>(), 0);
		return maxScore;
	}

	// 백트래킹 함수
	private void Backtrack(IList<IList<int>> grid, int row, HashSet<int> used, int currentScore)
	{
		maxScore = Math.Max(maxScore, currentScore);

		if (row == grid.Count)
			return;

		for (int i = 0; i < grid[row].Count; i++)
		{
			int value = grid[row][i];

			// 해당 값이 포함되어 있지 않으면 used에 추가하고 Backtrack함수를 재귀호출 시작.
			if (used.Contains(value) == false)
			{
				used.Add(value);
				Backtrack(grid, row + 1, used, currentScore + value);
				used.Remove(value); // 경로 탐색 후 되돌아가기.
			}
			else
			{
				Backtrack(grid, row + 1, used, currentScore);
			}
		}
	}
}