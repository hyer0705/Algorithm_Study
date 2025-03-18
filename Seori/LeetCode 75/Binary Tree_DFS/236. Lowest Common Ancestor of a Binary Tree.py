# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # 재귀 종료조건
        if root is None:
            return root
        
        # 재귀 종료조건 : p나 q를 발견한 경우
        if root == p or root == q:
            return root
        
        # p, q를 발견할 때까지 재귀 탐색
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        # p, q를 모두 발견한 경우, 현재 노드가 LCA
        if left != None and right != None:
            return root
        # p, q 중 하나만 발견한 경우, 해당 노드가 LCA
        elif left != None:
            return left
        elif right != None:
            return right