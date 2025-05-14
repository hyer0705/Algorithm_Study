class Solution:
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        from collections import deque
        rows, cols = len(maze), len(maze[0])
        queue = deque()
        queue.append((entrance[0], entrance[1], 0))  # (row, col, steps)
        
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right

        while queue:
            r, c, steps = queue.popleft()
            
            # Skip if it's not an empty cell
            if maze[r][c] != '.':
                continue

            # Mark the cell as visited
            maze[r][c] = '+'

            # Check if it's an exit (on the border and not the entrance)
            if (r != entrance[0] or c != entrance[1]) and (r == 0 or c == 0 or r == rows - 1 or c == cols - 1):
                return steps

            # Explore neighbors
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] == '.':
                    queue.append((nr, nc, steps + 1))

        return -1