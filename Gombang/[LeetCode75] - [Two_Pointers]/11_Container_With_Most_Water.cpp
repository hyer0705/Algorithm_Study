class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;

        int maxAreaValue = 0;
        while (left < right)
        {
            int width = right - left;
            int minHeight = min(height[left], height[right]);
            int area = width * minHeight;

            maxAreaValue = max(maxAreaValue, area);

            if (height[left] <= height[right])
                left++;
            else
                right--;
        }

        return maxAreaValue;
    }
};