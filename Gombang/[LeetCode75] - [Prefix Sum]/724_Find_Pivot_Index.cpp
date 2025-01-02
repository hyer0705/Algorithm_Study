// 두 번째 풀이법. left와 right를 나눠서 서로 누적된 값을 비교하는 방법.
class Solution {
public:
    int pivotIndex(vector<int>& nums) {

        // accumulate의 세번째 매개변수는 변수의 초기값을 의미.
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum - nums[0] == 0)
            return 0;

        int rightSum = sum - nums[0];
        int leftSum = 0;

        for (int i = 1; i < nums.size(); i++)
        {
            rightSum -= nums[i];
            leftSum += nums[i - 1];

            if (rightSum == leftSum)
                return i;
        }

        return -1;
    }
};

// 첫 번째 풀이법. Prefix 방식 사용.
class Solution {
public:
    int pivotIndex(vector<int>& nums) {

        int sum = accumulate(nums.begin(), nums.end(), 0);
        
        int numSize = nums.size() - 1;
        vector<int> rightSumArray(numSize);
        vector<int> leftSumArray(numSize);

        // rightSumArray는 첫 번째 요소 셋팅.
        rightSumArray[0] = sum - nums[0];

        // leftSumArray는 마지막 요소 셋팅.
        
        leftSumArray[numSize - 1] = sum - nums[numSize - 1];

        for (int i = 1; i < numSize; i++)
        {
            rightSumArray[i] = rightSumArray[i - 1] - nums[i];
            leftSumArray[numSize - 1 - i] = leftSumArray[numSize - i] - nums[numSize - 1 - i];
        }

        for (int i = 0; i < numSize; i++)
        {
            if (rightSumArray[i] == leftSumArray[i])
                return i;
        }

        return -1;
    }
};