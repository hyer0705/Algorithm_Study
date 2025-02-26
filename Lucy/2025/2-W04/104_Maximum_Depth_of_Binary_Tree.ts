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

function maxDepth(root: TreeNode | null): number {
  let answer = 0;

  const traverse = (node, depth) => {
    if (node == null) {
      answer = Math.max(answer, depth);
      return;
    }

    traverse(node.left, depth + 1);
    traverse(node.right, depth + 1);
  };

  traverse(root, answer);

  return answer;
}
