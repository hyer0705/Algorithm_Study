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

function findMinimumNode(node: TreeNode | null): TreeNode | null {
  if (!node.left) return node;

  return findMinimumNode(node.left);
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // 1. 탐색
  if (!root) return null;

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  }

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  }

  // 2. 삭제 연산
  //  2.1 삭제할 노드가 리프 노드인 경우
  if (!root.left && !root.right) {
    root = null;
    return root;
  }

  //  2.2 삭제할 노드의 왼쪽 자식 노드가 null인 경우
  if (!root.left) {
    root = root.right;
    return root;
  }

  //  2.3 삭제할 노드의 오른쪽 자식 노드가 null인 경우
  if (!root.right) {
    root = root.left;
    return root;
  }

  //  2.3 삭제할 노드가 양쪽 자식 노드를 모두 가진 경우
  const minNode = findMinimumNode(root.right);
  root.val = minNode.val;

  root.right = deleteNode(root.right, minNode.val);

  return root;
}
