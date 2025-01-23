class Solution:
    def decodeString(self, s: str) -> str:
        '''
        Decoding이 이뤄지는 형식에서 숫자 + 대괄호쌍[]이 주어지는 규칙이므로
        dfs라는 재귀함수를 활용해서 문제를 해결했다.
        dfs는 대괄호쌍 안의 문자열에 앞에 주어진 숫자를 곱해서 돌려준다.
        '''

        # [A] 주어지는 s에서 대괄호 안에 주어지는 문자열을 찾아서 number만큼 곱해주는 dfs 함수 정의
        def dfs(number: int, index: int) -> (int, str):
            length = 1
            num = ''
            decoding = ''
            while True:
                index += 1
                # [A-1] 재귀 종료 조건. 대괄호가 닫히면 문자열에 number를 곱해서 반환한다.
                if s[index] == ']':
                    length += 1
                    return length, number * decoding
                
                # [A-2] 다음 재귀 시작 조건. 새로운 숫자와 대괄호[가 나오면 변수를 설정해서 재귀함수를 호출한다.
                elif s[index].isdigit():
                    num += s[index]
                    length += 1
                elif s[index] == '[':
                    l, d = dfs(int(num), index)
                    length += l
                    index += l-1
                    decoding += d
                    num = ''

                # [A-3] 이외 문자열이 나오면 변수에 저장해둔다.
                else:
                    decoding += s[index]
                    length += 1
                
                
        # [1] 변수 설정                
        index = 0
        n = len(s)
        num = ''
        answer = ''
        while index < n:
            # [2] 재귀함수 호출. 숫자와 대괄호[가 나오면 변수를 설정해서 재귀함수를 호출한다.
            if s[index].isdigit():
                num += s[index]
                index += 1
            elif s[index] == '[':
                l, d = dfs(int(num), index)
                answer += d
                index += l
                num = ''
            
            # [3] 이외 문자열이 나오면 리턴할 변수에 저장한다.
            else:
                answer += s[index]
                index += 1

        return answer