class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = 'aeiouAEIOU'
        index_vowels = []
        list_s = list(s)

        # [1] 모음의 인덱스를 찾아서 index_vowels에 저장한다. Save the index of vowels in index_vowels.
        for i in range(len(s)):
            if list_s[i] in vowels:
                index_vowels.append(i)
        
        # [2] 저장한 인덱스를 이용해 모음의 위치를 뒤집는다. Reverse the position of vowels using the saved index.
        len_index_vowels = len(index_vowels)
        for i in range(len_index_vowels // 2):
            front, back = index_vowels[i], index_vowels[len_index_vowels - 1 - i]
            list_s[front], list_s[back] = list_s[back], list_s[front]
        
        return "".join(list_s)