from typing import List

class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        answer = 0
        left_sum = 0
        right_sum = sum(nums) - nums[0]
        if left_sum == right_sum:
            return answer
        while left_sum != right_sum:
            answer += 1
            if answer >= len(nums):
                answer = -1
                break
            left_sum += nums[answer-1]
            right_sum -= nums[answer]
        return answer