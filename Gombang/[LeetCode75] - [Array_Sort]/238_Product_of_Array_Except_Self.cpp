class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums)
    {
        // nums의 길이만큼 vector를 만들어주고 모두 1로 초기화를 해준다.
        vector<int> result(nums.size(), 1);

        // 좌측 곱 계산.
        int multiply = 1;
        for (int i = 0; i < nums.size(); i++)
        {
            result[i] *= multiply;
            multiply *= nums[i];
        }

        // 우측 곱 계산.
        multiply = 1;
        for (int i = nums.size() - 1; i >= 0; i--)
        {
            result[i] *= multiply;
            multiply *= nums[i];
        }

        return result;
    }
};