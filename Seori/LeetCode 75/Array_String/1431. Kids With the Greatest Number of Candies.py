class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        # candies 리스트의 원소들을 순회하면서, net_candies보다 크거나 같으면 문제 조건을 만족하므로 true, 그렇지 않으면 false를 반환한다.
        answer = []
        net_candies = max(candies) - extraCandies
        for candy in candies:
            if candy >= net_candies:
                answer.append(True)
            else:
                answer.append(False)
        
        return answer