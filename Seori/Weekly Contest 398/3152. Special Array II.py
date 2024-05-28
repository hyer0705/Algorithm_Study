import bisect
class Solution:
    def isArraySpecial(self, nums: List[int], queries: List[List[int]]) -> List[bool]:
        # [1] Create a list of indices where the sum of the current and next element is even(Not special)
        length = len(nums)
        not_special = []
        for i in range(length-1):
            if not (nums[i] + nums[i+1]) % 2:
                not_special.append(i)

        # [2] For each query, find the left and right index of the range
        answer = []
        for l, r in queries:
            left = bisect.bisect_left(not_special, l)
            right = bisect.bisect_left(not_special, r)

            answer.append(left == right)
        return answer