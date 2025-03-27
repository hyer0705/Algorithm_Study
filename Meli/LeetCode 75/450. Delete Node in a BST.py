from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return None
        
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # Case 1: Leaf node
            if not root.left and not root.right:
                return None
            # Case 2: Node with only one child
            elif not root.left:
                return root.right
            elif not root.right:
                return root.left
            # Case 3: Node with two children
            else:
                # Find the minimum value in right subtree
                min_node = self.findMin(root.right)
                root.val = min_node.val
                root.right = self.deleteNode(root.right, min_node.val)
        
        return root
    
    def findMin(self, node: TreeNode) -> TreeNode:
        current = node
        while current.left:
            current = current.left
        return current