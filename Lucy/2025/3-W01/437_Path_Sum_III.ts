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

// 모범 답안
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;

  const prefixSumMap = new Map<number, number>();
  prefixSumMap.set(0, 1);

  const dfs = (node: TreeNode | null, currentSum: number): number => {
    if (!node) return 0;

    currentSum += node.val;
    let count = prefixSumMap.get(currentSum - targetSum) || 0;

    prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);

    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);

    prefixSumMap.set(currentSum, prefixSumMap.get(currentSum)! - 1);

    return count;
  };

  return dfs(root, 0);
}

// 첫번째 풀이, 71 / 129 testcases passed
// 누적합을 루트부터 현재 노드까지만 비교해서 틀린 답을 유추함!
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;

  const dfs = (node: TreeNode | null, currentSum: number): void => {
    if (!node) return;

    let newSum = currentSum + node.val;
    if (newSum === targetSum) {
      count++;
      newSum = 0;
    } else if (newSum > targetSum) {
      newSum = 0;
    }

    dfs(node.left, newSum);
    dfs(node.right, newSum);
  };

  let count = 0;
  dfs(root, 0);
  console.log(count);

  return count;
}
