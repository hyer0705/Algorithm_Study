class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        # [1] 연산을 k번 반복한다. Repeat the operation for k times.
        for _ in range(k):
            # [2] 최소값의 인덱스를 찾아 multiplier를 곱한다. Find the index of the minimum value and multiply it by the multiplier.
            index_minV = nums.index(min(nums))
            nums[index_minV] *= multiplier
        return nums