# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        
        def dfs(root: Optional[TreeNode], depth: int) -> int:
            # 재귀 종료 조건 : 리프에 도착했을 때
            if root == None: 
                return depth - 1

            # 트리 전위순회
            left = dfs(root.left, depth + 1)
            right = dfs(root.right, depth + 1)
            return max(left, right)

        return dfs(root, 1)
        