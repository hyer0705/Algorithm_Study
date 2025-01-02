class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        length = len(nums)
        left_sum, right_sum = 0, sum(nums)
        for i in range(length):
            left_sum += nums[i]        
            if left_sum == right_sum:
                return i
            right_sum -= nums[i]
        
        return -1