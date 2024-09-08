//우선순위 큐를 통해, 힙의 크기가 k개가 초과되면 Dequeue를 하여 가장 높은 우선순위(Peek)가 항상 k번째가 되도록 유지한다.
public class Solution
{
	public int[] ResultsArray(int[][] queries, int k)
	{
		List<int> results = new List<int>();
		PriorityQueue<int, int> heap = new PriorityQueue<int, int>();

		foreach (var q in queries)
		{
			int distance = Math.Abs(q[0]) + Math.Abs(q[1]);
			heap.Enqueue(distance, -distance); // 최대힙을 표현하기 위해 우선순위 요소에 -기호를 붙여넣는다.

			if (heap.Count < k)
			{
				results.Add(-1);
				continue;
			}
			else if (heap.Count > k)
			{
				heap.Dequeue();
			}

			results.Add(heap.Peek());
		}

		return results.ToArray();
	}
}