class Solution:
    def largestPalindrome(self, n: int, k: int) -> str:
        sys.set_int_max_str_digits(100000)
        result = ''

        # [1] k가 1, 3, 9인 경우, 9로만 이루어진 수를 반환한다.
        #     if k is 1, 3, 9, return a number consisting of 9 only.
        if k in (1, 3, 9):
            result += '9' * n

        # [2] k가 2인 경우, 일의 자리수가 8이면 된다.
        #     if k is 2, the unit digit should be 8.
        elif k == 2:
            for i in range(n):
                if i in (0, n-1):
                    result += '8'
                else:
                    result += '9'
        
        # [3] k가 4인 경우, 끝 두자리수가 4의 배수여야 한다. -> 88
        #     if k is 4, the last two digits should be a multiple of 4. -> 88
        elif k == 4:
            for i in range(n):
                if i in (0, 1, n-2, n-1):
                    result += '8'
                else:
                    result += '9'
        
        # [4] k가 5인 경우, 일의 자리수가 5이면 된다.
        #    if k is 5, the unit digit should be 5.
        elif k == 5:
            for i in range(n):
                if i in (0, n-1):
                    result += '5'
                else:
                    result += '9'
        
        # [5] k가 7인 경우, 9를 기반으로 가운데 자리수를 조절한다.
        #     if k is 7, adjust the middle digit based on 9.
        elif k == 7:
            # [5-1] n이 3 미만일 때는 규칙이 적용되지 않는다.
            if n == 1:
                result += '7'
            elif n == 2:
                result += '77'
            
            # [5-2] n이 3 이상일 때, 9를 기반으로 가운데 자리수를 조절한다. -> 9999i9999 / 999ii999
            else:
                if n % 2: # n이 홀수일 때
                    count_9 = int(n / 2)
                    count_i = 1
                else: # n이 짝수일 때
                    count_9 = int(n / 2) - 1
                    count_i = 2

                # [5-3] 반복문으로 7의 배수인지 확인한다.
                for i in range(9, -1, -1):
                    result = '9' * count_9
                    result += str(i) * count_i
                    result += '9' * count_9
                    if not int(result) % 7:
                        break

        # [6] k가 6일 때도 7과 비슷하게 가운데 자리수를 조절한다. 그리고 일의자리는 8이어야 한다.
        #     when k is 6, adjust the middle digit similarly to case 7. and the unit digit should be 8.
        elif k == 6:
            # [6-1] n이 3 미만일 때는 규칙이 적용되지 않는다.
            if n == 1:
                result += '6'
            elif n == 2:
                result += '66'

            # [6-2] n이 3 이상일 때, 9를 기반으로 가운데 자리수를 조절한다. -> 8999i9998 / 899ii998
            else:
                if n % 2: # n이 홀수일 때
                    count_9 = int(n / 2) - 1
                    count_i = 1
                else: # n이 짝수일 때
                    count_9 = int(n / 2) - 2
                    count_i = 2

                # [6-3] 반복문으로 6의 배수인지 확인한다.
                for i in range(9, -1, -1):
                    result = '8' + '9' * count_9
                    result += str(i) * count_i
                    result += '9' * count_9 + '8'
                    if not int(result) % 6:
                        break
        
        # [7] k가 8인 경우, 끝 세자리수가 8의 배수여야 한다. -> 888
        #     if k is 8, the last three digits should be a multiple of 8. -> 888
        elif k == 8:
            for i in range(n):
                if i in (0, 1, 2, n-3, n-2, n-1):
                    result += '8'
                else:
                    result += '9'
                    
        return result