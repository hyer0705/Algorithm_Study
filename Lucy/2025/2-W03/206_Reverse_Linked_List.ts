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
