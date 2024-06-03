class Solution:
    def maximumEnergy(self, energy: List[int], k: int) -> int:
        
        # [1] Create a list of size k with -1000 as the default value
        dp = [-1000] * k
        for i in range(len(energy)):
            now = i % k
            
            # [2] If the value is negative, set it to the current energy value
            #     Otherwise, add the current energy value to the current value
            if dp[now] < 0:
                dp[now] = energy[i]
            else:
                dp[now] += energy[i]
        
        # [3] Return the maximum value in the list
        return max(dp)