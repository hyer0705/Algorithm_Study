class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        list1, list2 = [], []
        for letter in set(word1):
            list1.append(word1.count(letter))
            list2.append(word2.count(letter))
        
        return len(word1) == len(word2) and sorted(list1) == sorted(list2)