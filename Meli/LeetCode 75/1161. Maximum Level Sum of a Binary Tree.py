# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        level = 1
        answer = 1
        max_sum = -10**6

        from collections import deque

        bfs = deque([root])
        while bfs:
            bfs_len = len(bfs)
            level_sum = 0

            for _ in range(bfs_len):
                node = bfs.popleft()
                if node:
                    level_sum += node.val
                if node.left:
                    bfs.append(node.left)
                if node.right:
                    bfs.append(node.right)
            if level_sum > max_sum:
                answer = level
                max_sum = level_sum
            level += 1
        
        return answer