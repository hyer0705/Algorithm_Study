class Solution {
public:
    bool increasingTriplet(vector<int>& nums)
    {
        int firstMinValue = INT_MAX;
        int secondMinValue = INT_MAX;

        // nums 벡터를 돌리면서 firstMinValue와 secondMinValue보다 큰 경우가 있다면 true를 반환한다.
        for (int num : nums)
        {
            if (num <= firstMinValue)
            {
                firstMinValue = num;
            }
            else if (num <= secondMinValue)
            {
                secondMinValue = num;
            }
            else
            {
                return true;
            }
        }

        return false;
    }
};