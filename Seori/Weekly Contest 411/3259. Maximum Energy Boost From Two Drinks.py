class Solution:
    def maxEnergyBoost(self, energyDrinkA: List[int], energyDrinkB: List[int]) -> int:

        # [1] 변수 설정. set variables
        n = len(energyDrinkA)
        case_A = [0] * n # case_A[i]: i번째 energyDrinkA까지 마셨을 때 얻을 수 있는 최대 에너지
        case_B = [0] * n # case_B[i]: i번째 energyDrinkB까지 마셨을 때 얻을 수 있는 최대 에너지

        # [2] 1, 2번째 energyDrink를 마신 경우를 초기화한다.
        #     initialize the case of drinking the first and second energyDrink.
        case_A[0] = energyDrinkA[0]
        case_B[0] = energyDrinkB[0]
        case_A[1] = case_A[0] + energyDrinkA[1]
        case_B[1] = case_B[0] + energyDrinkB[1]

        # [3] 3번째 energyDrink부터 경우의 수를 dp 계산한다. 그대로 마시는 경우 vs 바꿔 마시는 경우
        #     calculate the number of cases from the third energyDrink. drink as it is vs change
        for i in range(2, n):
            case_A[i] = max(case_A[i-1], case_B[i-2]) + energyDrinkA[i]
            case_B[i] = max(case_B[i-1], case_A[i-2]) + energyDrinkB[i]

        return max(case_A[n-1], case_B[n-1])
        