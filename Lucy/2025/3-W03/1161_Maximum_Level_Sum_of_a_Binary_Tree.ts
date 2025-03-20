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

// 두 번째 풀이: BFS(모범답안) + level 한 번에 찾기

function maxLevelSum(root: TreeNode | null): number {
  let queue = [root];

  let maxSum = -Infinity;
  let minLevel = 0;
  let level = 0;

  while (queue.length) {
    const tempQueue: TreeNode[] = [];
    let sum = 0;

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];

      if (node.left) tempQueue.push(node.left);
      if (node.right) tempQueue.push(node.right);

      sum += node.val;
    }

    queue = tempQueue;
    level++;

    if (sum > maxSum) {
      maxSum = sum;
      minLevel = level;
    }
  }

  return minLevel;
}

// 첫 번째 풀이: BFS + 포인터 + level 분리해서 찾기
function maxLevelSum(root: TreeNode | null): number {
  const queue: [TreeNode | null, number][] = [];
  queue.push([root, 0]);

  let front = 0;

  const levelSums: number[] = [];
  while (front < queue.length) {
    const [node, level] = queue[front++];

    if (!node) continue;

    if (level <= levelSums.length && !levelSums[level]) levelSums.push(0);

    levelSums[level] += node.val;

    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
  }

  const maxSum = Math.max(...levelSums);
  for (let i = 0; i < levelSums.length; i++) {
    const currentSums = levelSums[i];
    if (maxSum === currentSums) return i + 1;
  }

  return -1;
}
