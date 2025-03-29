class Solution:
    def nonSpecialCount(self, l: int, r: int) -> int:
        '''
        special number는 소수의 제곱수이다. 따라서 범위 내의 소수를 구하여 해결할 수 있다.
        A special number is a square of a prime number. Therefore, it can be solved by finding prime numbers within the range.
        '''
        # [1] 에라토스테네스의 체를 이용하여 루트 l과 루트 r 사이의 소수를 구한다. Use the Sieve of Eratosthenes to find prime numbers between the square root of l and the square root of r.
        square_root_r = int(r ** 0.5)
        prime_set = set(range(2, square_root_r + 1))
        for i in range(2, int(square_root_r ** 0.5) + 1):
            if i in prime_set:
                prime_set -= set(range(2 * i, square_root_r + 1, i))
        prime_set -= set(range(2, ceil(l ** 0.5)))
        
        # [2] l과 r 사이 범위에서 소수의 개수를 빼면 not special number의 개수를 구할 수 있다. Subtract the number of prime numbers in the range between l and r to find the number of not special numbers.
        return (r + 1) - l - len(prime_set)