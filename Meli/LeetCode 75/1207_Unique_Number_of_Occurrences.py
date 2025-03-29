from typing import List

class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        from collections import Counter

        element_counter = Counter(arr)

        freq = []
        for _, v in element_counter.items():
            if v not in freq:
                freq.append(v)
            else:
                return False
        return True