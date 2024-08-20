using System.Collections.Generic;

public class Solution
{
	private List<List<int>> adjacencyList = new List<List<int>>();
	private int[] subtreeSizes;

	public int CountGoodNodes(int[][] edges)
	{
		int nodeCount = edges.Length + 1;
		subtreeSizes = new int[nodeCount];

		// adjacencyList 메모리 할당.
		for (int i = 0; i < nodeCount; i++)
		{
			adjacencyList.Add(new List<int>());
		}

		// 그래프 연결.
		foreach (int[] edge in edges)
		{
			adjacencyList[edge[0]].Add(edge[1]);

			// edge에 들어오는 노드의 첫 번째가 0으로 시작하지 않을 때를 대비하여
			// 노드를 양 방향으로 연결한다.
			// [testcase 145] edge : [[6,0],[1,0],[5,1],[2,5],[3,1],[4,3]]
			adjacencyList[edge[1]].Add(edge[0]);
		}

		CalculateSubtreeSize(0, -1);
		int goodNodeCount = 0;

		for (int i = 0; i < nodeCount; i++)
		{
			bool isGoodNode = true;
			int previousSubtreeSize = -1;
			foreach (int neighbor in adjacencyList[i])
			{
				// 현재 순회중인 이웃 노드가 'i' 노드의 자식일 때에만 코드 진행.
				if (subtreeSizes[neighbor] < subtreeSizes[i])
				{
					// 처음 발견한 자식 노드를 previousSubtreeSize에 저장.
					if (previousSubtreeSize == -1)
					{
						previousSubtreeSize = subtreeSizes[neighbor];
					}
					// 처음 발견한 자식 노드와 다른 자식 노드들과 개수 비교
					else if (previousSubtreeSize != subtreeSizes[neighbor])
					{
						isGoodNode = false;
						break;
					}
				}
			}

			if (isGoodNode)
				goodNodeCount++;
		}

		return goodNodeCount;
	}

	private int CalculateSubtreeSize(int currentNode, int parent)
	{
		int subtreeSize = 1;
		foreach (int neighbor in adjacencyList[currentNode])
		{
			if (neighbor != parent)
			{
				subtreeSize += CalculateSubtreeSize(neighbor, currentNode);
			}
		}
		subtreeSizes[currentNode] = subtreeSize;
		return subtreeSize;
	}
}
	}