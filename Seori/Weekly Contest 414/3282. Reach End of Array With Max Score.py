class Solution:
    def findMaximumScore(self, nums: List[int]) -> int:
        # for문을 이용하여 현재까지의 최대값을 찾고, 그 값을 더해준다. Use a for loop to find the maximum value so far and add it.
        result = 0
        now = 0
        for i in range(len(nums)-1):
            now = max(now, nums[i])
            result += now
        return result