class Solution:
    def numberOfChild(self, n: int, k: int) -> int:
        # 왕복하는데 걸리는 시간 2*(n-1)이므로 k를 마지막 사이클만 남김
        net_k = k % (2 * (n-1))

        # 마지막 사이클에서 quotient가 0이면 정방향, 1이면 역방향
        quotient = net_k // (n-1)
        remainder = net_k % (n-1)

        return remainder if not quotient else n - 1 - remainder