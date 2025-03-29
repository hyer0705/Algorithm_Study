# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        
        def dfs(root: TreeNode, value: int) -> int:
            # 재귀 종료조건
            if root == None:
                return 0

            # 최대값 value를 체크하면서 count를 갱신하고
            count = 0
            if root.val >= value:
                value = root.val
                count += 1
            
            # 이진트리 전위순회
            count += dfs(root.left, value)
            count += dfs(root.right, value)
        
            return count
            
        return dfs(root, root.val)