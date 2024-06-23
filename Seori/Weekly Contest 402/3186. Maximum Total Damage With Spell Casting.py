from collections import Counter
class Solution:
    def maximumTotalDamage(self, power: List[int]) -> int:
        counter = Counter(power)
        damages = sorted(list(counter.keys()))
        N = len(damages)
        dp = [0] * N    # dp는 i번째까지의 최대 데미지를 저장한다. dp stores the maximum damage until i-th.

        dp[0] = damages[0] * counter[damages[0]]
        for i in range(1, N):
            damage = damages[i]

            # [1] 오름차순 damages 배열에서 이전 1, 2, 3번째의 최대 데미지값을 가져온다. Get the maximum damage values of the previous 1, 2, 3 from the ascending damages array.
            for j in range(1, 4):
                if i-j >= 0 and damage - damages[i-j] > 2:
                    dp[i] = max(dp[i], dp[i-j])

            # [2] i번째 데미지값을 더해준다. Add the i-th damage value.
            dp[i] += damage * counter[damage]

            # [3] 이전 최대 데미지값과 비교하여 최대값을 저장한다. Compare with the previous maximum damage value and store the maximum value.
            dp[i] = max(dp[i], dp[i-1])

        return dp[N-1]