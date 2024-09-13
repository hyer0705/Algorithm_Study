class Solution:
    def checkTwoChessboards(self, coordinate1: str, coordinate2: str) -> bool:
        # 좌표의 앞뒤 합이 짝수이면 검정, 홀수이면 흰색이다. 따라서 두 좌표의 합이 짝수이면 같은 색이다.
        # If the sum of the coordinates is even, it is black, and if it is odd, it is white. Therefore, if the sum of two coordinates is even, they are the same color.
        return not (ord(coordinate1[0]) + int(coordinate1[1]) + ord(coordinate2[0]) + int(coordinate2[1])) % 2