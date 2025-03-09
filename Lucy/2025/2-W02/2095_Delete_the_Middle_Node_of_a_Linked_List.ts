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

function deleteMiddle(head: ListNode | null): ListNode | null {
  let current: ListNode | null = head;
  let n = 1;
  while (current.next) {
    n++;
    current = current.next;
  }

  const middleNodeIndex: number = Math.floor(n / 2) - 1;
  if (middleNodeIndex === -1) return null;

  current = head;
  n = 0;
  while (current.next) {
    if (n === middleNodeIndex) {
      current.next = current.next.next;
      break;
    }

    current = current.next;
    n++;
  }

  return head;
}
