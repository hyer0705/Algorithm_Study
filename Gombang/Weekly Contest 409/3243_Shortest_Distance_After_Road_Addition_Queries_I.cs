using System.Collections.Generic;

public class Solution
{
	public int[] ShortestDistanceAfterQueries(int n, int[][] queries)
	{
		int[] result = new int[queries.Length];

		// queries에 대한 다리를 제외하고 n까지 이루어진 노드를 연결.
		List<List<int>> bridge = new List<List<int>>();
		for (int i = 0; i < n - 1; i++)
		{
			bridge.Add(new List<int>());
			bridge[i].Add(i + 1);
		}

		for (int i = 0; i < queries.Length; i++)
		{
			int newBridgeStartIndex = queries[i][0];
			int newBridgeEndIndex = queries[i][1];

			bridge[newBridgeStartIndex].Add(newBridgeEndIndex);

			// 새로 연결한 다리를 기준으로 BFS를 진행.
			result[i] = BFS(bridge, n);
		}

		return result;
	}

	private int BFS(List<List<int>> graph, int n)
	{
		Queue<(int node, int distance)> queue = new Queue<(int node, int distance)>();
		bool[] visited = new bool[n];

		// 0번 도시에서 시작
		queue.Enqueue((0, 0));
		visited[0] = true;

		while (queue.Count > 0)
		{
			var (node, distance) = queue.Dequeue();

			// n-1번 도시에 도착한 경우
			if (node == n - 1)
				return distance;

			// 인접 노드 탐색
			foreach (int neighbor in graph[node])
			{
				if (!visited[neighbor])
				{
					visited[neighbor] = true;
					queue.Enqueue((neighbor, distance + 1));
				}
			}
		}

		// n-1에 도달할 수 없는 경우
		return -1;
	}
}