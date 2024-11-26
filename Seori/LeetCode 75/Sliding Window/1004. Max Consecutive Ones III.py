class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        # [1] k는 sliding window 안에 존재할 수 있는 0의 개수를 의미한다.
        left, right = 0, 0
        for right in range(len(nums)):
            # [1-1] 0이 window에 들어올 때마다 k를 감소시킨다.
            if nums[right] == 0:
                k -= 1
            
            # [1-2] 0이 k보다 많이 들어왔다면 window의 길이가 늘어나지 않도록 left가 움직인다.
            if k < 0:
                if nums[left] == 0:
                    k += 1
                left += 1
        
        return right - left + 1