# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def dfs(root: Optional[TreeNode], leaf_value_sequence: List) -> None:
            # 재귀 종료 조건 : 리프에 도착했을 때
            if root == None: 
                return
            
            # 문제 조건 : 자식이 없는 리프노드의 경우
            if root.left == None and root.right == None:
                leaf_value_sequence.append(root.val)

            # 트리 전위순회
            left = dfs(root.left, leaf_value_sequence)
            right = dfs(root.right, leaf_value_sequence)
            return leaf_value_sequence
            
        return dfs(root1, []) == dfs(root2, [])
