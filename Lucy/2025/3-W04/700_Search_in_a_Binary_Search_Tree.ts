/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// 3rd: 0ms
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  const search = (node: TreeNode | null): TreeNode | null => {
    if (!node || node.val === val) return node;

    if (node.val < val) return search(node.right);

    return search(node.left);
  };

  return search(root);
}

// 2nd: 0ms
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  while (root && root.val !== val) {
    if (root.val < val) {
      root = root.right;
    } else {
      root = root.left;
    }
  }

  return root;
}

// 1st: 1ms
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  const traverse = (node: TreeNode | null): TreeNode | null => {
    if (!node) return;

    if (node.val === val) return node;

    return traverse(node.left) || traverse(node.right);
  };

  const searched = traverse(root);
  if (searched) return searched;

  return null;
}
