using System.Collections.Generic;
using System;

public class Solution
{
    public long NumberOfPairs(int[] nums1, int[] nums2, int k)
    {
        long ans = 0;

        Dictionary<int, int> freq = new Dictionary<int, int>();

        // nums2의 각 요소에 대해 k를 곱한 값의 빈도수를 계산
        foreach (int n in nums2)
        {
            int key = n * k;
            if (freq.ContainsKey(key))
            {
                freq[key]++;
            }
            else
            {
                freq[key] = 1;
            }
        }

        // nums1의 각 요소에 대해 가능한 모든 약수를 검사한다.
        foreach (int n in nums1)
        {
            for (int i = 1; i <= (int)Math.Sqrt(n); i++)
            {
                if (n % i != 0) // 약수가 아니라면 패스.
                    continue;

                if (freq.ContainsKey(i)) // i가 기존에 들어가있던 약수라면,
                    ans += freq[i];

                int div = n / i;
                if (i != div && freq.ContainsKey(div))
                {
                    ans += freq[div];
                }
            }
        }


        return ans;
    }
}