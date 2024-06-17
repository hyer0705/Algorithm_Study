class Solution:
    def clearStars(self, s: str) -> str:
        # While there is a '*' in the string, find the target letter and remove it
        english = 'abcdefghijklmnopqrstuvwxyz'
        while s.find('*') != -1:
            target = s[0:s.find('*')]
            for letter in english:
                if target.find(letter) != -1:
                    letter_index = target.rindex(letter)
                    s = s[:letter_index] + s[letter_index+1:]
                    s = s.replace('*', '', 1)
                    break
        return s