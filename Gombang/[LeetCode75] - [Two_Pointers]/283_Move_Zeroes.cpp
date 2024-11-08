
// 투 포인터를 활용하여 푼 방법.
// 
// right의 값을 증가시키면서 0이 아닌 값을 만나면 left의 값과 swap을 한다.
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int left = 0;
        int right = 0;

        while (right < nums.size())
        {
            if (nums[right] != 0)
            {
                swap(nums[left], nums[right]);
                left++;
            }

            right++;
        }
    }
};

// 직접 벡터를 만들어서 푼 방법.
// 
// 미리 nums의 길이만큼 0으로 채워진 벡터를 만들어놓고
// nums를 돌려가면서 0이 아닌 값을 만날 때마다 새로운 벡터에 차례대로 넣어준다.
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        vector<int> resultVec;
        resultVec.resize(nums.size()); // resultVec에 0으로 nums.size만큼 생성.

        int currIndex = 0;
        for (int num : nums)
        {
            if (num != 0)
            {
                resultVec[currIndex++] = num;
            }
        }

        nums = resultVec;
    }
};