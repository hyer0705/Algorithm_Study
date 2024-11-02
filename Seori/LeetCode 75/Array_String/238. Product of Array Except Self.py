class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # [1] 왼쪽에서 오른쪽으로 곱한 값을 저장한다. Save the product from left to right.
        length = len(nums)
        answer = [nums[0]] + [0] * (length - 1)
        for i in range(1, length):
            answer[i] = answer[i-1] * nums[i]
        
        # [2] 오른쪽에서 왼쪽으로 곱한 값을 변수 right_product에 저장하면서 answer를 완성한다.
        #     Complete the answer while saving the product from right to left in the variable right_product.
        right_product = 1
        for i in range(length-1, -1, -1):
            # [2-1] 처음과 끝 인덱스 처리
            if i == length-1:
                answer[i] = answer[i-1]
            elif i == 0:
                answer[i] = right_product
            # [2-2] 나머지 인덱스 처리
            else:
                answer[i] = answer[i-1] * right_product
            right_product *= nums[i]
        return answer
        

        
