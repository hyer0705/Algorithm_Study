class Solution:
    def compressedString(self, word: str) -> str:
        comp = ''
        prev = word[0]
        cnt = 0
        for letter in word:

            # [1] If letter is the same as prev, increment cnt
            if letter == prev:
                cnt += 1
            
            # [2] If letter is different from prev, append comp and reset cnt
            else:
                if cnt:
                    comp += str(cnt) + prev
                prev = letter
                cnt = 1
            
            # [3] If cnt reaches 9, append comp and reset cnt
            if cnt == 9:
                comp += '9' + prev
                cnt = 0
        
        if cnt:
            comp += str(cnt) + prev

        return comp