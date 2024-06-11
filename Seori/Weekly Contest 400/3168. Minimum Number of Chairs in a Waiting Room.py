class Solution:
    def minimumChairs(self, s: str) -> int:
        answer = 0
        chairs = 0
        for letter in s:
            # [1] If the letter is 'E', increment the number of chairs
            if letter == 'E':
                chairs += 1
            # [2] If the letter is 'L', check maximum chairs and decrement the number of chairs
            elif letter == 'L':
                answer = max(answer, chairs)
                chairs -= 1

        answer = max(answer, chairs)
        return answer