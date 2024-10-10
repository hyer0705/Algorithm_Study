class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        # word1부터 하나씩 꺼내서 merged_word를 만들면서, 각 word의 길이보다 작은 경우에만 추가한다.
        # From word1, take one by one and make merged_word, only if the length is less than each word
        merged_word = ''
        len1, len2 = len(word1), len(word2)
        length = max(len1, len2)
        for i in range(length):
            if i < len1:
                merged_word += word1[i]
            if i < len2:
                merged_word += word2[i]
        
        return merged_word