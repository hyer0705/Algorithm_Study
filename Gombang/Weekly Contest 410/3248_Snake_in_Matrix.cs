using System.Collections.Generic;

public class Solution
{
	public int FinalPositionOfSnake(int n, IList<string> commands)
	{
		Dictionary<string, int> commandDic = new Dictionary<string, int>() {
			{ "UP", -n },
			{ "DOWN", n },
			{ "LEFT", -1 },
			{ "RIGHT", 1}
		};

		int[] array = new int[n * n];
		int result = 0;

		foreach (string command in commands)
		{
			result += commandDic[command];
		}

		return result;
	}
}