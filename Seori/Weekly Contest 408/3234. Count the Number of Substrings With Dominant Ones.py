class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        n = len(s)
        dominants = 0
        prefix_one = [0] * (n + 1)

        # [1] 0과 1의 개수를 누적하여 저장한다. Accumulate the number of 0s and 1s and store them.
        for i in range(n):
            prefix_one[i + 1] = prefix_one[i] + int(s[i])

        # [2] s의 left부터 right까지의 문자열을 길이를 늘려가며 탐색한다. Search for the string from left to right of s by increasing the length.
        for left in range(n):
            right = left
            while right < n:
                count_1 = prefix_one[right + 1] - prefix_one[left]
                count_0 = (right + 1 - left) - count_1
                if count_1 >= count_0 ** 2:
                    dominants += 1

                    # [2-1] 1의 개수가 0의 개수의 제곱보다 크다면 다음 탐색 위치도 dominant일 수 있으므로 diff를 계산하여 dominants에 더한다. 
                    #       If the number of 1s is greater than the square of the number of 0s, the next search position may also be dominant, so calculate diff and add it to dominants.
                    if count_1 > count_0 ** 2:
                        diff = int(count_1 ** 0.5) - count_0
                        # 인덱스 범위를 넘어가지 않도록 주의한다. Be careful not to exceed the index range.
                        if right + diff < n:
                            dominants += diff
                        else:
                            dominants += n - right - 1
                        right += diff + 1

                    # [2-2] 1의 개수가 0의 개수의 제곱과 같다면 dominants에 1을 더하고 탐색을 계속한다. 
                    #       If the number of 1s is equal to the square of the number of 0s, add 1 to dominants and continue the search.
                    else:
                        right += 1
                else:
                    # [2-3] 1의 개수가 0의 개수의 제곱보다 작다면 다음 dominant 후보까지 이동한다.
                    #       If the number of 1s is less than the square of the number of 0s, move to the next dominant candidate.
                    right += count_0 ** 2 - count_1

        return dominants