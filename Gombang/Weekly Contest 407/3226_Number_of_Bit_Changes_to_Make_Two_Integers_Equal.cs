// 두 번째 문제 풀이.
// 솔루션을 확인해보니 비트 연산들을 이용하여 풀면 간단하게 풀이되는 것을 확인하여 해당 방식으로 다시 풀이.
// xor연산을 하면 서로 다른 비트에 대해서만 1이라는 값을 갖게 되므로, 해당 1의 개수를 구하면 이 문제의 답이 된다.
public class Solution
{
    public int MinChanges(int n, int k)
    {
        // n & k 를 했을 때 k가 나와야 한다. 그렇지 않으면 n의 값을 change하더라도 k값이 나올 수가 없음.
        if ((n & k) != k) return -1;

        int xor = n ^ k;
        int count = 0;

        // 1의 개수 확인하기
        while (xor > 0)
        {
            count += xor & 1;
            xor >>= 1;
        }

        return count;
    }
}


// 첫 번째 문제 풀이.
// 1. 직접 n과 k에 대해 이진수를 구한다.
// 2. 두 이진수 중, 길이가 작은 이진수에 대해서 부족한 길이만큼 0으로 채우는 작업 진행.
// 3. n에 대한 이진수를 기준으로, 0번째 인덱스부터 비교해가며 서로 다른 문자일 경우,
//          1) 해당 문자가 1이면 +1
//          2) 해당 문자가 0이면 문제에 의해 수정할 수 없으므로 -1 반환.

public class Solution
{
    public int MinChanges(int n, int k)
    {
        int result = 0;

        string nBinaryStr = GetBinaryNum(n).ToString();
        string kBinaryStr = GetBinaryNum(k).ToString();

        if (nBinaryStr.Length > kBinaryStr.Length)
            kBinaryStr = kBinaryStr.PadLeft(nBinaryStr.Length, '0');
        else
            nBinaryStr = nBinaryStr.PadLeft(kBinaryStr.Length, '0');

        for (int i = 0; i < nBinaryStr.Length; i++)
        {
            if (nBinaryStr[i] == kBinaryStr[i])
                continue;

            if (nBinaryStr[i] == '1')
                result++;

            if (nBinaryStr[i] == '0')
                return -1;
        }

        return result;
    }

    public ulong GetBinaryNum(int num)
    {
        ulong binaryNum = 0;
        ulong place = 1;
        while (num > 0)
        {
            ulong remainder = (ulong)(num % 2);
            binaryNum += remainder * place;
            num /= 2;
            place *= 10;
        }

        return binaryNum;
    }
}