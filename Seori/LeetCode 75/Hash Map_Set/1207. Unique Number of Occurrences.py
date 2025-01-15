class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        occurences = {}
        for num in arr:
            if occurences.get(num):
                occurences[num] += 1
            else:
                occurences[num] = 1

        occurences_values = occurences.values()
        return len(occurences_values) == len(set(occurences_values))