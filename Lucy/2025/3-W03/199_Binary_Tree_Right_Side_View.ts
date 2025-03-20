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

// 세 번째 풀이: BFS + 배열 + 포인터
function rightSideView(root: TreeNode | null): number[] {
  const queue: [TreeNode | null, number][] = [];
  queue.push([root, 0]);

  let front = 0;

  const answer: number[] = [];

  while (front < queue.length) {
    const [node, depth] = queue[front++];

    if (!node) continue;

    if (answer.length <= depth) answer.push(node.val);

    answer[depth] = node.val;

    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  return answer;
}

// 두 번째 풀이: DFS
function rightSideView(root: TreeNode | null): number[] {
  const answer: number[] = [];
  const dfs = (node: TreeNode, depth: number, answer: number[]) => {
    if (!node) return;

    if (answer.length <= depth) answer.push(node.val);

    answer[depth] = node.val;

    dfs(node.left, depth + 1, answer);
    dfs(node.right, depth + 1, answer);
  };

  dfs(root, 0, answer);

  return answer;
}

// 첫 번째 풀이: BFS + 배열
function rightSideView(root: TreeNode | null): number[] {
  const sideNodes: (TreeNode | null)[] = new Array(100).fill(null);

  const queue: [TreeNode | null, number][] = [];
  queue.push([root, 0]); // [node, depth]

  while (queue.length > 0) {
    const [node, depth] = queue.shift();

    if (!node) continue;

    sideNodes[depth] = node;

    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  const answer: number[] = sideNodes.filter((node) => node).map((node) => node.val);

  return answer;
}
