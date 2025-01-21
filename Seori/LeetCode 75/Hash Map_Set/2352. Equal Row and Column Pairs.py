class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        # [1] grid를 반시계방향으로 회전한다.
        n = len(grid)
        grid_counterclockwise = []
        for i in range(n):
            column = []
            for j in range(n):
                column.append(grid[j][i])
            grid_counterclockwise.append(column)
        
        # [2] 두 그리드를 비교하여 같은 개수를 센다.
        answer = 0
        for row in grid:
            for column in grid_counterclockwise:
                if row == column:
                    answer += 1

        return answer