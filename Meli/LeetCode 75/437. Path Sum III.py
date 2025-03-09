from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        from collections import defaultdict

        prefix = defaultdict(int)
        prefix[0] = 1
        
        def dfs(node, current_sum):
            if not node:
                return 0
            
            current_sum += node.val
            count = prefix[current_sum - targetSum]
            
            prefix[current_sum] += 1
            
            count += dfs(node.left, current_sum)
            count += dfs(node.right, current_sum)
            
            prefix[current_sum] -= 1
            
            return count
        
        return dfs(root, 0)
        