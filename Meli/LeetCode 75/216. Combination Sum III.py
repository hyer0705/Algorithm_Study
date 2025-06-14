from typing import List

class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        def backtrack(start, path, remaining, results):
            if len(path) == k and remaining == 0:
                results.append(path[:])
                return
            if len(path) >=k or remaining < 0:
                return
            for i in range(start, 10):
                path.append(i)
                backtrack(i+1, path, remaining-i, results)
                path.pop()
            
        results = []
        backtrack(1, [], n, results)
        return results