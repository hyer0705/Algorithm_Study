using System;

public class Solution
{
	public long MaxEnergyBoost(int[] energyDrinkA, int[] energyDrinkB)
	{
		// dpA와 dpB라는 배열을 사용하여 현재 index까지 누적되는 최대값을 저장.
		int n = energyDrinkA.Length;
		long[] dpA = new long[n];
		long[] dpB = new long[n];

		dpA[0] = energyDrinkA[0];
		dpB[0] = energyDrinkB[0];
		dpA[1] = energyDrinkA[0] + energyDrinkA[1];
		dpB[1] = energyDrinkB[0] + energyDrinkB[1];

		for (int i = 2; i < n; i++)
		{
			// dpA[i-1]와 dpB[i-2]중 더 큰 값을 기준으로 energyDrinkA[i]를 더해서 dpA의 현재 인덱스에 저장.
			dpA[i] = Math.Max(dpA[i - 1] , dpB[i - 2]) + energyDrinkA[i];
			dpB[i] = Math.Max(dpB[i - 1] , dpA[i - 2]) + energyDrinkB[i];
		}

		return Math.Max(dpA[n - 1], dpB[n - 1]);
	}
}