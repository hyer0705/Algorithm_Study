# 336ms, 18.6 MB
class Solution:
    def removeStars(self, s: str) -> str:
        answer = ''
        star_count = 0
        for letter in s[::-1]:
            if letter == '*':
                star_count += 1
            elif star_count:
                star_count -= 1
            else:
                answer = letter + answer
        
        return answer
    


# 87ms, 19.1 MB
class Solution:
    def removeStars(self, s: str) -> str:
        answer = []
        for letter in s:
            if letter == '*':
                answer.pop()
            else:
                answer.append(letter)
        
        return "".join(answer)