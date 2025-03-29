class Solution:
    def countKConstraintSubstrings(self, s: str, k: int) -> int:
        
        # [1] s의 전체 substring 개수를 구한다.
        #     find the total number of substrings of s.
        result = 0
        for i in range(len(s) + 1):
            result += i

        # [2] 가장 큰 substring부터 k-constraint를 위반하는 substring을 제거한다.
        #     remove substrings that violate k-constraint from the largest substring.
        count_0, count_1 = 0, 0
        for length in range(len(s), 0, -1):
            continue_flag = 0
            window = s[0:length]
            count_0, count_1 = window.count('0'), window.count('1')
            if count_0 > k and count_1 > k:
                result -= 1
                continue_flag = 1

            # [2-1] 슬라이딩 윈도우를 이용하여 k-constraint를 위반하는 substring을 찾는다.
            #       find substrings that violate k-constraint using sliding window
            head, tail = -1, length - 1
            for n in range(len(s) - length):
                head += 1
                tail += 1
                if s[head] != s[tail]:
                    if s[head] == '0':
                        count_0 -= 1
                        count_1 += 1
                    else:
                        count_0 += 1
                        count_1 -= 1
                
                if count_0 > k and count_1 > k:
                    result -= 1
                    continue_flag = 1
            
            # [2-2] k-constraint를 위반하는 substring이 없으면, 그보다 짧은 substring도 위반하지 않을 것이므로 종료한다.
            #       if there is no substring that violates k-constraint, shorter substrings will not violate it either.
            if not continue_flag:
                break

        return result