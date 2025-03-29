from typing import List
import timeit

# Time Limit Exceeded
class Solution:
    @staticmethod
    def getFinalState(nums: List[int], k: int, multiplier: int) -> List[int]:
        import heapq
        import math
        divisor = 10**9+7
        
        if len(nums) == 1:
            nums[0] = nums[0]*multiplier**k # 이게 O(n^2) 이라서 k 가 커지면 연산량 많아지는듯?
            nums[0] = nums[0]%divisor
            return nums

        nums_priority_queue = []
        max_num = 0
        for i, num in enumerate(nums):
            if num > max_num:
                max_num = num
            heapq.heappush(nums_priority_queue, (num, i))
        
        it = 1
        while it <= k:
            min_val, _ = nums_priority_queue[0]
            multiplied_value = min_val*multiplier
            if multiplied_value > max_num and it+len(nums_priority_queue)<=k:
                num_len = len(nums_priority_queue)
                for num_id in range(num_len):
                    val, i = nums_priority_queue[num_id]
                    nums_priority_queue[num_id] = (val*multiplier, i)
                it += num_len
                max_num = max_num * multiplier
            else:
                min_val, i = heapq.heappop(nums_priority_queue)
                multiplied_value = min_val*multiplier
                heapq.heappush(nums_priority_queue, (multiplied_value, i))
                it += 1

        answer = [0]*len(nums)
        for e in nums_priority_queue:
            val, i = e
            answer[i] = val - math.floor(val/divisor)*divisor
        
        return answer


start = timeit.default_timer()
print(Solution.getFinalState([2,1,3,5,6], 5, 2))
stop = timeit.default_timer()
print(f"Time: {stop-start}")

start = timeit.default_timer()
print(Solution.getFinalState([161209470], 56851412, 39846))
stop = timeit.default_timer()
print(f"Time: {stop-start}")