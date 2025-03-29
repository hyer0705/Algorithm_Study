class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        # [1] s가 비어있는 경우
        if len(s) == 0:
            return True
        
        # [2] s의 문자열을 하나씩 순서대로 찾고, 전부 찾았을 경우 True를 반환한다.
        left, right = 0, len(s)
        for letter in t:
            if s[left] == letter:
                left += 1
                if left == right:
                    return True
        
        return False
