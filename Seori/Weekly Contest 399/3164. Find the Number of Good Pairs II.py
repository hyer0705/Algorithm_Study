import collections
class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], k: int) -> int:
        MAX = max(nums1) + 1
        good = [0 for _ in range(MAX)]
        
        # for num in nums2:
        #     num_k = num * k
            # for i in range(num_k, MAX, num_k):
            #     good[i] += 1

        # [1] Set freqs to get rid of duplicates
        freqs = collections.Counter(num * k for num in nums2)

        # [2] Save the possible good pairs in good
        for num_k, count in freqs.items():
            for i in range(num_k, MAX, num_k):
                good[i] += count
        
        # [3] Check the number of good pairs matching nums1
        answer = 0
        for num in nums1:
            answer += good[num]
            
        return answer