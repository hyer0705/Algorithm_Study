from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        mapping = {
            "2": ["a", "b", "c"],
            "3": ["d", "e", "f"],
            "4": ["g", "h", "i"],
            "5": ["j", "k", "l"],
            "6": ["m", "n", "o"],
            "7": ["p", "q", "r", "s"],
            "8": ["t", "u", "v"],
            "9": ["w", "x", "y", "z"]
            }
        results = []
        def backtrack(digits_list, path, results):
            if len(digits_list) == 0:
                if len(path) > 0:
                    results.append("".join(path))
                return
            digit = digits_list[0]
            for char in mapping[digit]:
                path.append(char)
                if len(digits_list) > 1:
                    backtrack(digits_list[1:], path, results)
                else:
                    backtrack([], path, results)
                path.pop()
        
        backtrack(list(digits), [], results)
        return results