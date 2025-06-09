from typing import List


class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        row_len, col_len = len(grid), len(grid[0])
        directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]
        fresh_count = 0

        from collections import deque
        rotten_oranges = deque()

        for r in range(row_len):
            for c in range(col_len):
                if grid[r][c] == 2:
                    rotten_oranges.append((r, c))
                elif grid[r][c] == 1:
                    fresh_count += 1

        minutes = 0
        while rotten_oranges and fresh_count > 0:
            for _ in range(len(rotten_oranges)):
                r, c = rotten_oranges.popleft()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < row_len and 0 <= nc < col_len and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh_count -= 1
                        rotten_oranges.append((nr, nc))
            minutes += 1

        return minutes if fresh_count == 0 else -1