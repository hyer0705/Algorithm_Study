class neighborSum:

    def __init__(self, grid: List[List[int]]):
        self.grid = grid

    # [A] 상하좌우에 인접한 값의 합을 구하는 adjacentSum 함수를 정의한다.
    def adjacentSum(self, value: int) -> int:
        grid = self.grid
        i, j = 0, 0
        length = len(grid)
        for x in range(length):
            for y in range(length):
                if grid[x][y] == value:
                    i, j = x, y
        
        adjacentSum = 0
        if i - 1 >= 0:
            adjacentSum += grid[i-1][j]

        if j - 1 >= 0:
            adjacentSum += grid[i][j-1]

        if i + 1 < length:
            adjacentSum += grid[i+1][j]

        if j + 1 < length:
            adjacentSum += grid[i][j+1]

        return adjacentSum

    # [B] 대각선에 인접한 값의 합을 구하는 diagonalSum 함수를 정의한다.
    def diagonalSum(self, value: int) -> int:
        grid = self.grid
        i, j = 0, 0
        length = len(grid)
        for x in range(length):
            for y in range(length):
                if grid[x][y] == value:
                    i, j = x, y
        
        diagonalSum = 0
        if i - 1 >= 0 and j - 1 >= 0:
            diagonalSum += grid[i-1][j-1]

        if j - 1 >= 0 and i + 1 < length:
            diagonalSum += grid[i+1][j-1]

        if i + 1 < length and j + 1 < length:
            diagonalSum += grid[i+1][j+1]

        if j + 1 < length and i - 1 >= 0:
            diagonalSum += grid[i-1][j+1]

        return diagonalSum


# Your neighborSum object will be instantiated and called as such:
# obj = neighborSum(grid)
# param_1 = obj.adjacentSum(value)
# param_2 = obj.diagonalSum(value)