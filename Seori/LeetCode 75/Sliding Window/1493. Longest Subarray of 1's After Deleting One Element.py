class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        answer = 0
        left, right = -1, -1
        length = len(nums)

        # [1] for문을 이용하여 window의 left, right를 세팅한다.
        for i in range(length):
            if nums[i] == 0:
                # [1-1] 0이 처음 등장했을 때
                if left == -1:
                    left = i
                # [1-2] 0이 두 번째 등장했을 때
                elif right == -1:
                    answer = i - 1
                    right = i
                    left += 1
                # [1-3] 0이 세 번 이상 등장했을 때
                else:
                    answer = max(answer, i - left - 1)
                    left = right + 1
                    right = i

        # [2] 예외처리. 0이 2개 미만인 경우와 마지막 인덱스 계산
        if right == -1:
            answer = length - 1
        elif right != length:
            answer = max(answer, length - left - 1)
        
        return answer