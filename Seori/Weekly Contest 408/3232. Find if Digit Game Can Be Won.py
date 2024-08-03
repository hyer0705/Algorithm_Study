class Solution:
    def canAliceWin(self, nums: List[int]) -> bool:
        # 1자리수와 2자리수로 나누어 합을 구하고 비교한다. Divide into single digits and double digits and compare them.
        sum_single_digit, sum_double_digit = 0, 0
        for num in nums:
            if num // 10:
                sum_double_digit += num
            else:
                sum_single_digit += num

        return True if sum_single_digit != sum_double_digit else False