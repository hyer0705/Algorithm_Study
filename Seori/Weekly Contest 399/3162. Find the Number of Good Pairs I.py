class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], k: int) -> int:
        
        # [1] Count the number of good pairs, nums1[i] % (nums2[j] * k) == 0
        n, m = len(nums1), len(nums2)
        answer = 0
        for i in range(n):
            for j in range(m):
                if not nums1[i] % (nums2[j] * k):
                    answer += 1
        return answer