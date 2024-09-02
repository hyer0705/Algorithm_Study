from typing import List

class Solution:
    def compare(self, num1, num2): # compare if num1 and num2 are almost equal
        if len(num1) <= len(num2):
            num1 = '0'*(len(num2)-len(num1)) + num1
        elif len(num1) > len(num2):
            num2 = '0'*(len(num1)-len(num2)) + num2
        
        diff_cnt = 0
        swapped = None
        almost_equal = False
        for c1, c2 in zip(num1, num2): # compare each digit of num1 and num2
            if c1 != c2: # if the digits are not same
                diff_cnt += 1
                if swapped: # if the swapped variable is already assigned compare
                    if c1 == swapped[1] and c2 == swapped[0]: # the second value of swapped set should be equal to the digit of num1
                        almost_equal = True 
                    else:
                        return False
                else: # assign different digit to swapped variable
                    swapped = (c1, c2)
                if diff_cnt > 2: # if more than two position digits are different return False
                    return False
        if almost_equal:
            return True
        else:
            return False

    def countPairs(self, nums: List[int]) -> int:
        answer = 0
        for i in range(len(nums)-1): # iterate all the numbers
            num1 = str(nums[i])
            for j in range(i+1, len(nums)): # compare with all the items beginning from the next index of the first num
                num2 = str(nums[j])
                if num1 == num2:
                    answer += 1
                    continue
                if self.compare(num1, num2):
                    answer += 1
        return answer