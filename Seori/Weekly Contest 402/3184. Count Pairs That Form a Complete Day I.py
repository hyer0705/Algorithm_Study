class Solution:
    def countCompleteDayPairs(self, hours: List[int]) -> int:
        # [1] 만약 두 시간의 합이 24로 나누어 떨어진다면, 두 시간은 하루를 완성한다. If the sum of two hours is divisible by 24, the two hours complete a day.
        answer = 0
        for i in range(len(hours)):
            for j in range(i + 1, len(hours)):
                if not (hours[i] + hours[j]) % 24:
                    answer += 1
        return answer