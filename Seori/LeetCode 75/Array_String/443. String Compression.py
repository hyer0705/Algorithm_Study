class Solution:
    # 오답. return 값을 이해못하겠음.
    def compress(self, chars: List[str]) -> int:
        count = 1
        character = chars[0]
        answer = 0
        length = len(chars)
        for i in range(1, length + 1):
            if i < length and chars[i - 1] == chars[i]:
                count += 1
            else:
                answer += 1
                if count > 1:
                    while count:
                        count //= 10
                        answer += 1
                count = 1
        
        return answer