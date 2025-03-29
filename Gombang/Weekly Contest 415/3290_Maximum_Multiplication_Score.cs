// 4개의 dp배열을 이용하여 차례대로
//
// 0번 dp는 -> 1번 dp에
// 1번 dp는 -> 2번 dp에
// 2번 dp는 -> 3번 dp에
// 
// 최대 값에 대한 정보를 제공해주는 방식으로 진행하였습니다.

public class Solution
{
	public long MaxScore(int[] a, int[] b)
	{
		int n = b.Length;

		long[] dp0 = new long[n];
		long[] dp1 = new long[n];
		long[] dp2 = new long[n];
		long[] dp3 = new long[n];

		dp0[0] = a[0] * b[0];
		for (int i = 1; i < n; i++)
		{
			dp0[i] = Math.Max(dp0[i - 1], (long)a[0] * b[i]);
		}

		dp1[1] = dp0[0] + (long)a[1] * b[1];
		for (int i = 2; i < n; i++)
		{
			dp1[i] = Math.Max(dp1[i - 1], dp0[i - 1] + (long)a[1] * b[i]);
		}

		dp2[2] = dp1[1] + (long)a[2] * b[2];
		for (int i = 3; i < n; i++)
		{
			dp2[i] = Math.Max(dp2[i - 1], dp1[i - 1] + (long)a[2] * b[i]);
		}

		dp3[3] = dp2[2] + (long)a[3] * b[3];
		long maxScore = dp3[3];
		for (int i = 4; i < n; i++)
		{
			dp3[i] = Math.Max(dp3[i - 1], dp2[i - 1] + (long)a[3] * b[i]);
			maxScore = Math.Max(maxScore, dp3[i]);
		}

		return maxScore;
	}
}