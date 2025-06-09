import bisect
from typing import List

class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        potions.sort()
        n = len(potions)
        answer = []
        for i in spells:
            answer.append(n-bisect.bisect_left(potions,success/i))
        return answer