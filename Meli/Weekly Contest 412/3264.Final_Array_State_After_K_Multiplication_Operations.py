from typing import List
import heapq

class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        nums_priority_queue = []
        for i, num in enumerate(nums):
            heapq.heappush(nums_priority_queue, (num, i)) # priority queue
        
        for _ in range(k): # k iterations
            min_val, i = heapq.heappop(nums_priority_queue) # get the minimum value of priority queue
            heapq.heappush(nums_priority_queue, (min_val*multiplier, i)) # replace the selected minimum value with x*multiplier
        
        answer = [0]*len(nums)
        for e in nums_priority_queue:
            val, i = e
            answer[i] = val

        return answer