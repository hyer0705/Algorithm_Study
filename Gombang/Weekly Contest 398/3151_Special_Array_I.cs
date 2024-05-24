// 인접한 인덱스에 대해서 나머지 연산을 하여 서로 같은 경우가 발생한다면 return false가 진행되도록 하였습니다.
// 특별한 어려움은 없었습니다.

public class Solution
{
    public bool IsArraySpecial(int[] nums)
    {
        if (nums.Length < 2)
            return true;

        for (int i = 0; i < nums.Length - 1; i++)
        {
            if (nums[i] % 2 == nums[i + 1] % 2)
                return false;
        }

        return true;
    }
}