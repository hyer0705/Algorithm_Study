class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        # [1] 보다 짧은 문자열을 찾는다.
        if len(str1) > len(str2):
            longer, shorter = str1, str2
        else:
            longer, shorter = str2, str1

        # [2] [1]에서 찾아낸 짧은 문자열을 앞에서부터 [0:i+1]만큼 잘라서 divisor라고 명명한다.
        answer = ''
        for i in range(len(shorter)):
            divisor = shorter[0:i+1]

            # [3] divisor가 짧은 문자열을 나눌 수 있고, 긴 문자열 또한 나눌 수 있다면 answer로 갱신한다.
            if divisor * (len(shorter) // len(divisor)) == shorter:
                if divisor * (len(longer) // len(divisor)) == longer:
                    answer = divisor
        
        return answer