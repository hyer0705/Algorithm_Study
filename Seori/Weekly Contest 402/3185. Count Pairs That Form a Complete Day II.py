from collections import Counter
class Solution:
    def countCompleteDayPairs(self, hours: List[int]) -> int:
        counter = Counter(map(lambda x: x % 24, hours))
        answer = 0
        for i in range(0, 13):
            # [1] 24로 나눈 나머지가 0이나 12인 경우, 조합으로 경우의 수를 구한다. If the remainder of division by 24 is 0 or 12, calculate the number of cases by combination.
            if i == 0 or i == 12:
                answer += int((counter[i] * (counter[i] - 1)) / 2)
            # [2] 그 이외에는 24-i의 개수와 곱하여 경우의 수를 구한다. Otherwise, calculate the number of cases by multiplying the number of 24-i.
            else:
                answer += counter[i] * counter[24-i]
        return answer