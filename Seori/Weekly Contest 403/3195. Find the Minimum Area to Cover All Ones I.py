class Solution:
    def minimumArea(self, grid: List[List[int]]) -> int:
        width, height = len(grid[0]), len(grid)
        
        # [1] 1이 있는 top, bottom 인덱스를 찾는다. Find the top and bottom indexes where 1 exists.
        top, bottom = 0, 0
        for i in range(height):
            if 1 in grid[i]:
                top = i
                break

        for i in range(height-1, -1, -1):
            if 1 in grid[i]:
                bottom = i
                break
        
        # [2] grid을 회전시켜서 1이 있는 left, right 인덱스를 찾는다. Rotate the grid to find the left and right indexes where 1 exists.
        left, right = 0, 0
        grid_rotate = list(map(list, zip(*reversed(grid))))
        for i in range(width):
            print(i)
            if 1 in grid_rotate[i]:
                left = i
                break

        for i in range(width-1, -1, -1):
            if 1 in grid_rotate[i]:
                right = i
                break
        
        # [3] 넓이를 계산하여 반환한다. Calculate the area and return.
        return (bottom - top + 1) * (right - left + 1)