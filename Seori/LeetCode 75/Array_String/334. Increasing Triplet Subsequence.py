class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        MIN = -2 ** 31
        first_num, second_num = MIN, MIN

        # [1] 반복문을 통해 조건을 검사한다.
        for i in range(len(nums) - 1):

            # [2] 다음 숫자가 더 큰 경우, first_num과 second_num을 갱신한다.
            if nums[i] < nums[i + 1]:

                # [2-1] 이 때, second_num보다 큰 숫자가 나왔을 경우 True를 반환한다. 정답조건
                if MIN < second_num < nums[i + 1]:
                    return True
                first_num = nums[i]
                second_num = nums[i + 1]

            # [3] 다음 숫자가 크지 않은 경우, first_num과 second_num을 갱신한다.
            else:
                # [3-1] 가장 작은 숫자가 나왔을 경우 first_num을 갱신한다.
                if nums[i + 1] < first_num:
                    first_num = nums[i + 1]
                # [3-2] second_num보다 작은 두 번째 숫자가 나왔을 경우 second_num을 갱신한다.
                elif first_num < nums[i + 1] < second_num:
                    second_num = nums[i + 1]
                
        return False