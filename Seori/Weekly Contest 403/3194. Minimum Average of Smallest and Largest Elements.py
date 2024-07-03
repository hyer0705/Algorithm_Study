class Solution:
    def minimumAverage(self, nums: List[int]) -> float:
        # nums를 정렬하여 앞뒤로부터 인덱스를 이동하며 평균값을 구하고, 그 중 최소값을 반환한다. 
        # Sort nums and find the average values by moving the indexes from the front and back, and return the minimum value.
        nums.sort()
        averages = []
        n = len(nums)
        for i in range(n//2):
            averages.append((nums[i] + nums[n-1-i])/2)
        return min(averages)