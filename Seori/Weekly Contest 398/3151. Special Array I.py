class Solution:
    def isArraySpecial(self, nums: List[int]) -> bool:
        length = len(nums)

        for i in range(length - 1):
            if not (nums[i] + nums[i+1]) % 2:
                return False
        
        return True