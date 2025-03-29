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

function oddEvenList(head: ListNode | null): ListNode | null {
  let index = 0;

  const odd = new ListNode(-1);
  let oddNode = odd;

  const even = new ListNode(-1);
  let evenNode = even;

  let node: ListNode | null = head;
  while (node) {
    if (index % 2 === 0) {
      evenNode.next = new ListNode(node.val);
      evenNode = evenNode.next;
    } else {
      oddNode.next = new ListNode(node.val);
      oddNode = oddNode.next;
    }

    index++;
    node = node.next;
  }

  evenNode.next = odd.next;

  return even.next;
}
