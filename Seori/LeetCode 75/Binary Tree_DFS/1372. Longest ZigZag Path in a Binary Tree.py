# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        def dfs(root: Optional[TreeNode], direction: str, depth: int) -> int:
            # 재귀 종료조건
            if root is None:
                return depth

            # dfs 탐색을 하면서, 그 지점이 지그재그의 시작점일 수 있으므로 3가지 경우로 구성
            zigzag_path = 0
            if direction == 'L': # 1. 왼쪽으로 들어온 경우, 오른쪽 및 시작점 탐색
                zigzag_path = max(dfs(root.right, 'R', depth + 1), dfs(root.left, 'L', 0))
            elif direction == 'R': # 2. 오른쪽으로 들어온 경우, 왼쪽 및 시작점 탐색
                zigzag_path = max(dfs(root.left, 'L', depth + 1), dfs(root.right, 'R', 0))
            else: # 3. 시작점인 경우, 왼쪽 및 오른쪽 탐색
                zigzag_path = max(dfs(root.left, 'L', depth + 1), dfs(root.right, 'R', depth + 1))
            
            return zigzag_path
        
        return dfs(root, '', -1)

            