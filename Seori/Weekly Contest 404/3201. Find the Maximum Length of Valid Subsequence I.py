class Solution:
    def maximumLength(self, nums: List[int]) -> int:

        # [1] nums의 각 원소를 2로 나눈 나머지를 리스트로 만든다. Make a list of the remainder of each element of nums divided by 2.
        nums = list(map(lambda x: x % 2, nums))

        # [2] 짝수, 홀수, alternate를 세는 리스트를 만든다. Make a list that counts even, odd, and alternating numbers.
        count = [0, 0, 1] # even, odd, alternate

        # [3] nums의 원소를 하나씩 확인하여 짝수/홀수 및 alternate인지를 확인한다. Check if the element of nums is even/odd and alternate one by one.
        now = nums[0]
        count[now % 2] += 1
        for i in range(1, len(nums)):
            next = nums[i]
            # count odd or even
            count[next % 2] += 1
            # count alternate
            if (now + next) % 2:
                count[2] += 1
            now = next
        
        # [4] 짝수, 홀수, alternate 중 가장 큰 값을 반환한다. Return the largest value among even, odd, and alternate.
        return max(count)