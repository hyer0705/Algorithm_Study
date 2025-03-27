# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        answer = []
        
        if root is not None:
            # BFS 탐색하여 가장 오른쪽 노드만 남도록 갱신
            queue = [(root, 0)]
            level = -1
            while queue:
                node, depth = queue.pop(0)
                if depth > level:
                    answer.append(0)
                    level = depth
                answer[depth] = node.val
                
                if node.left is not None:
                    queue.append((node.left, depth + 1))
                if node.right is not None:
                    queue.append((node.right, depth + 1))
    
        
        return answer