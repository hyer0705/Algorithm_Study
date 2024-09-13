class Solution:
    def checkTwoChessboards(self, coordinate1: str, coordinate2: str) -> bool:
        col1, col2 = ord(coordinate1[0]), ord(coordinate2[0]) # convert column alphabet to number
        row1, row2 = int(coordinate1[1]), int(coordinate2[1]) 
        if col1%2 == col2%2: # 홀수 열 혹은 짝수 열끼리 같은 규칙을 가지므로 동일 규칙 열인지 판별
            if row1%2 == row2%2: # 동일 규칙 열은 행 또한 홀수 혹은 짝수 열인지 판별
                return True
            else:
                return False
        else: # 다른 규칙 열일 경우
            if row1%2 == row2%2: # 홀수/짝수 행끼리는 흑, 백 색이 다름
                return False
            return True
