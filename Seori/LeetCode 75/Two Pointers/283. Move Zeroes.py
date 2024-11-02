class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # 왼쪽부터 0을 찾아 오른쪽으로 이동시킨다.
        left, right = 0, len(nums) - 1
        while left < right:
            if nums[left] == 0:
                nums.pop(left)
                nums.append(0)
                right -= 1 # 0을 찾았으므로 오른쪽 인덱스를 하나 줄인다.
            else: left += 1