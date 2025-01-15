class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        from collections import Counter
        word1_counter = Counter(word1)
        word2_counter = Counter(word2)
        if word1_counter.keys() == word2_counter.keys():
            return sorted(word1_counter.values()) == sorted(word2_counter.values())
        else:
            return False