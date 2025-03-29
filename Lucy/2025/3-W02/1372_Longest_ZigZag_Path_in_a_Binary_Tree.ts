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

function longestZigZag(root: TreeNode | null): number {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 0;

  const dfs = (node: TreeNode | null, currentPathLength: number, currentDirection: "l" | "r"): number => {
    if (node === null) return currentPathLength;

    if (currentDirection === "l") {
      return Math.max(dfs(node.left, 0, "l"), dfs(node.right, currentPathLength + 1, "r"));
    }

    return Math.max(dfs(node.left, currentPathLength + 1, "l"), dfs(node.right, 0, "r"));
  };

  return Math.max(dfs(root.left, 0, "l"), dfs(root.right, 0, "r"));
}
