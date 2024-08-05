// 여기서 말한 스페셜한 숫자는 '소수의 제곱'으로 이루어진 숫자이다.
public class Solution
{
	public int NonSpecialCount(int l, int r)
	{
		// r의 제곱근까지의 소수를 미리 계산한다.
		int max = (int)Math.Sqrt(r);
		List<int> primes = GetPrimes(max);

		int specialCount = 0;

		int start = (int)Math.Ceiling(Math.Sqrt(l));
		int end = (int)Math.Floor(Math.Sqrt(r));

		for (int i = start; i <= end; i++)
		{
			if (primes.Contains(i))
			{
				specialCount++;
			}
		}

		return (r - l + 1) - specialCount;
	}

	// 에레스토테네스의 체를 사용하여 해당 값까지의 소수를 구한다.
	// 참고한 사이트 : https://loosie.tistory.com/267
	private List<int> GetPrimes(int num)
	{
		// num : 101
		// i > 1, 2, 3, 4, ,..., 97, 98, 99, 
		// i = 10;
		// 1 ~ 11로 나누어 떨어지는지를 계산 13 -> 169

		bool[] isPrime = new bool[num + 1];
		for (int i = 2; i <= num; i++)
			isPrime[i] = true;

		for (int i = 2; i * i <= num; i++)
		{
			if (isPrime[i])
			{
				for (int j = i * i; j <= num; j += i)
					isPrime[j] = false;
			}
		}

		List<int> primes = new List<int>();
		for (int i = 2; i <= num; i++)
		{
			if (isPrime[i])
				primes.Add(i);
		}

		return primes;
	}
}