class Solution:
    def findPermutationDifference(self, s: str, t: str) -> int:
        dict_index = {}

        # [1] Create a dictionary with the key as the character and the value as a list of indices
        for i in range(len(s)):
            dict_index[s[i]] = [i]
        
        # [2] Append the index of the character to the list
        for i in range(len(t)):
            dict_index[t[i]].append(i)
        
        # [3] Return the sum of the absolute difference between the indices
        answer = 0
        for a, b in dict_index.values():
            answer += abs(a-b)

        return answer