# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        output = []
        
        if not root:
            return output

        bfs = deque([root])

        while bfs:
            level_length = len(bfs)
            rightside = None
            
            for i in range(level_length):
                node = bfs.popleft()
                if node:
                    rightside = node.val

                    if node.left:
                        bfs.append(node.left)
                    if node.right:
                        bfs.append(node.right)
            
            if rightside is not None:
                output.append(rightside)
        
        return output