using System.Collections.Generic;
using System.Linq;

public class Solution
{
	int mod = 1000000007;

	public int[] GetFinalState(int[] nums, int k, int multiplier)
	{
		if (multiplier == 1)
			return nums;

		// C#에서 제공하는 우선순위 큐는 기본적으로 최소 힙 우선순위 큐이다.
		// 우선순위큐에서 0번째에 해당하는 값이 같을 경우 1번째에 해당하는 값으로 우선순위 처리.
		// 여기에서 0번째는 값(nums[index])이고 1번째는 인덱스로 표현되고 있다.
		// 즉, 동일한 값이 있다면 인덱스가 작은 데이터가 우선순위를 더 높게 설정.
		var queue = new PriorityQueue<int[], int[]>(Comparer<int[]>.Create((a, b) =>
			a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0])));

		// Add initial elements to the priority queue
		for (int i = 0; i < nums.Length; ++i)
		{
			queue.Enqueue(new int[] { nums[i], i }, new int[] { nums[i], i });
		}

		int max = nums.Max();
		int[] cur;
		long val;

		// 우선순위 큐에서 가장 작은 값을 multiplier로 곱해도 여전히 최대값 max의 multiplier 배 이상이 되는지를 확인하는 조건
		while (k > 0 && max / queue.Peek()[0] >= multiplier)
		{
			cur = queue.Dequeue();

			cur[0] *= multiplier;
			nums[cur[1]] = cur[0];
			queue.Enqueue(cur, cur);
			--k;
		}

		// 이 아래 과정부터는 사실 잘 이해가 가지 않네요..
		// PowerSum함수는 거듭제곱을 계산하는 과정을 효율적으로 수행하기 위해 만들어진 함수라고 하는데
		// 챗 지피티와 더 씨름을 해봐야 될 것 같습니다.
		int times = k / nums.Length;
		int rem = k % nums.Length;

		int[] result = new int[nums.Length];

		long first = PowerSum(multiplier, times, mod);
		long second = PowerSum(multiplier, times + 1, mod);

		while (queue.Count > 0)
		{
			cur = queue.Dequeue();

			val = rem-- > 0 ? second : first;
			val *= cur[0];
			val %= mod;

			result[cur[1]] = (int)val;
		}

		return result;
	}

	private long PowerSum(long a, long b, int mod)
	{
		var map = new Dictionary<long, long>();

		long current = 1;
		long val = a;
		long result = 1;

		while (current <= b)
		{
			map[current] = val;

			val = val * val % mod;
			current *= 2;
		}

		while (current > 1)
		{
			current /= 2;

			if (b >= current)
			{
				b -= current;
				result = result * map[current] % mod;
			}
		}

		return result;
	}
}