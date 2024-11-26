class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        # Prefix Sum 방식으로 실제 height를 구해서 최대값을 찾는다.
        height = [0] * (len(gain) + 1)
        for i in range(len(gain)):
            height[i+1] = height[i] + gain[i]
        
        return max(height)