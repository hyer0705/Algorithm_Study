# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        def dfs(root: Optional[TreeNode], level: int, listSum: List) -> int:
            # 재귀 종료조건
            if root == None:
                return 0
            
            # 매 노드를 탐색하는 시점에 구간 누적합을 체크
            count = 0
            value = root.val
            new_listSum = listSum[:]
            new_listSum.append(0)
            for i in range(level):
                new_listSum[i] += value
                if new_listSum[i] == targetSum:
                    count += 1
            
            # 전위순회
            count += dfs(root.left, level + 1, new_listSum)
            count += dfs(root.right, level + 1, new_listSum)

            return count

        return dfs(root, 1, [])