class Solution:
    def sumDigitDifferences(self, nums: List[int]) -> int:
        # [1] Create a dictionary of dictionaries to store the count of each digit at each position
        counter = {}
        length = len(str(nums[0]))
        for i in range(length):
            content = {}
            for j in '0123456789' :
                content[j] = 0
            counter[i] = content

        # [2] For each number, increment the total by the difference between the current index and the count of the digit at that index
        total = 0
        for n, num in enumerate(nums):
            for i, k in enumerate(str(num)):
                total += n - counter[i][k]
                counter[i][k] += 1
        return total