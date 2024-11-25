class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int left = 0;
        bool isDeleted = false;
        int result = 0;

        for (int right = 0; right < nums.size(); right++)
        {
            if (nums[right] == 0)
            {
                if (isDeleted)
                {
                    // 이미 0을 삭제한 경우에는 슬라이딩 윈도우 크기 축소
                    while (nums[left] != 0)
                        left++;

                    left++; //최종적으로 0의 다음 인덱스를 가리키고 있음.
                }
                else
                {
                    isDeleted = true;
                }
            }

            result = max(result, right - left);
        }

        return result;
    }
};