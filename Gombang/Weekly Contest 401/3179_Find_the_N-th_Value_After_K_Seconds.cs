using System;

public class Solution
{
    public int ValueAfterKSeconds(int n, int k)
    {
        // 10의 9승 + 7 표현.
        int modulo = (int)(Math.Pow(10, 9) + 7);

        int[] array = new int[n];
        for (int i = 0; i < n; i++)
        {
            array[i] = 1;
        }

        for (int second = 0; second < k; second++)
        {
            for (int i = 1; i < n; i++)
            {
                array[i] = (array[i - 1] + array[i]) % modulo;
            }
        }

        return array[n - 1];
    }
}