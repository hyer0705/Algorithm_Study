class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        
        # [1] multiplier가 1인 경우, nums를 그대로 반환한다. If multiplier is 1, return nums as it is.
        if multiplier == 1:
            return nums

        # [2] nums의 원소를 인덱스와 함께 heap_nums에 저장한다. Store the elements of nums in heap_nums with their index.
        MODULO = 10 ** 9 + 7
        heap_nums = []
        n = len(nums)
        for i, num in enumerate(nums):
            heapq.heappush(heap_nums, (num, i))
       
        ''' 
        k의 범위가 10^9 이하이므로, k번 반복하면 시간초과가 발생한다. 따라서 규칙을 찾아야 한다!
        Since the range of k is less than 10^9, it will cause a timeout error if repeated k times. Therefore, we need to find a rule!
        '''
        # [3] nums의 원소 중 최대값이 가장 작은 수가 될 때까지 multiply 연산을 수행한다. Perform multiply operations until the maximum value of nums becomes the smallest.
        largest = max(nums)
        while k:
            num, index = heapq.heappop(heap_nums)
            if num == largest:
                heapq.heappush(heap_nums, (num, index))
                break
            num *= multiplier
            nums[index] = num
            heapq.heappush(heap_nums, (num, index))
            k -= 1

        # [4] [3]에서 최대값에 도달했다면 이후의 연산은 반복성을 갖는다. 반복되는 순서대로 orders에 인덱스를 저장한다.
        #     If the maximum value is reached in [3], the subsequent operations are repetitive. Save the index in orders in the order of repetition.
        orders = []
        while len(heap_nums):
            orders.append(heapq.heappop(heap_nums)[1])
        
        # [5] cycles는 전체 연산이 반복될 횟수, leftovers는 남은 연산 횟수이다. 나머지 연산부터 처리한다.
        #     cycles is the number of times the entire operation is repeated, and leftovers is the remaining number of operations. Process the remaining operations first.
        cycles = k // len(orders)
        leftovers = k % len(orders)        
        for i in range(leftovers):
            nums[orders[i]] *= multiplier
        
        # [6] 마지막으로 반복되는 cycles만큼 nums 전체에 multiplier를 곱하고 MODULO로 나눈 나머지를 반환한다. 이 때 pow 연산에서도 수가 너무 커지면 TLE가 발생하므로 MODULO로 나눈다.
        #     Finally, multiply the entire nums by multiplier for the number of cycles repeated, and return the remainder divided by MODULO. If the number becomes too large in the pow operation, it will cause TLE, so divide it by MODULO.
        for i in range(n):
            nums[i] *= pow(multiplier, cycles, MODULO)
            nums[i] %= MODULO

        return nums