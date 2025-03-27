# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        answer = 1
        max_sum = root.val
        depth, now_sum = 1, root.val
        
        # BFS 탐색을 각 depth마다 할 수 있도록 하여 최대 합계를 구함
        queue = [root]
        while queue:
            len_depth = len(queue)
            for _ in range(len_depth):
                node = queue.pop(0)
                now_sum += node.val
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)

            if max_sum < now_sum:
                max_sum = now_sum
                answer = depth
            depth += 1
            now_sum = 0
        
        return answer