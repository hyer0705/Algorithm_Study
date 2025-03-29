/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// 두 번째 풀이(모범답안 참고)
function reverseList(head: ListNode | null): ListNode | null {
  let current = head;
  let prev = null;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// 첫 번째 풀이
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;

  const nodes = [];
  let currentNode = head;

  while (currentNode) {
    nodes.push(currentNode.val);
    currentNode = currentNode.next;
  }

  nodes.reverse();

  const reversed = new ListNode(nodes[0]);
  currentNode = reversed;

  for (let i = 1; i < nodes.length; i++) {
    currentNode.next = new ListNode(nodes[i]);
    currentNode = currentNode.next;
  }

  return reversed;
}
