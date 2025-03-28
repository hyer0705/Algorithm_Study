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

// 두번째 풀이
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;

  return left || right;
}

// 첫 번째 풀이
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null, target: TreeNode | null, ancestors: TreeNode[]): boolean => {
    if (node === null) return false;

    ancestors.push(node);

    if (node.val === target.val) return true;

    if (dfs(node.left, target, ancestors) || dfs(node.right, target, ancestors)) return true;

    ancestors.pop();

    return false;
  };

  const pAncestors: TreeNode[] = [];
  const qAncestors: TreeNode[] = [];

  dfs(root, p, pAncestors);
  dfs(root, q, qAncestors);

  const commonAncestor: TreeNode | null = pAncestors.filter((ancestor) => qAncestors.includes(ancestor)).at(-1);

  return commonAncestor;
}
