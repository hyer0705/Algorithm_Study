// zeroCount가 k를 넘어가는 순간 left변수를 땡겨오는 방식으로 진행하였습니다.
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int result = 0;

        for (int right = 0; right < nums.size(); right++)
        {
            if (nums[right] == 0)
                zeroCount++;

            while (zeroCount > k)
            {
                if (nums[left] == 0)
                    zeroCount--;

                left++;
            }

            result = max(result, right - left + 1);
        }

        return result;
    }
};