class Solution:
    def compress(self, chars: List[str]) -> int:
        count = 1
        character = chars[0]
        answer = 0
        answer_chars = ''
        length = len(chars)
        for i in range(1, length + 1):
            # [1] 앞뒤 문자가 같은 경우 count만 증가시킨다.
            if i < length and character == chars[i]:
                count += 1
            # [2] 앞뒤 문자가 다른 경우 count와 character를 answer에 반영하고 초기화한다.
            else:
                answer_chars += character
                answer += 1
                if count > 1:
                    answer_chars += str(count)
                    while count:
                        count //= 10
                        answer += 1
                if i < length:
                    character = chars[i]
                count = 1
        
        # [3] answer에 저장된 값으로 chars를 갱신한다.
        for i in range(answer):
            chars[i] = answer_chars[i]
        return answer