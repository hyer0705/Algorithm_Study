from typing import List

class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        answer = [[],[]]
        nums1, nums2 = set(nums1), set(nums2)
        answer[0].extend(list(nums1-nums2))
        answer[1].extend(list(nums2-nums1))
        return answer