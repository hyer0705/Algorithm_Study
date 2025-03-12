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

function goodNodes(root: TreeNode | null): number {
  if (!root) return 0;

  const traverse = (node: TreeNode | null, currentMaxValue: number): void => {
    if (!node) return;

    if (node.val >= currentMaxValue) {
      answer++;
    }

    const newMaxValue = Math.max(currentMaxValue, node.val);

    traverse(node.left, newMaxValue);
    traverse(node.right, newMaxValue);
  };

  let answer = 0;
  traverse(root, root.val);

  return answer;
}
