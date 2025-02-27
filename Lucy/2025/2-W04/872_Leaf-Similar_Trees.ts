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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  let answer = false;

  let nodes: number[] = [];

  const traverse = (node: TreeNode | null) => {
    if (!node) return 1;

    const left = traverse(node.left);
    const right = traverse(node.right);

    if (left === 1 && right === 1) nodes.push(node.val);
  };

  traverse(root1);
  const root1Nodes: string = nodes.join(",");

  nodes = [];
  traverse(root2);
  const root2Nodes: string = nodes.join(",");

  return root1Nodes === root2Nodes;
}
