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

function pairSum(head: ListNode | null): number {
  if (head === null) return 0;

  const values = [];

  let current: ListNode = head;
  while (current) {
    if (current) values.push(current.val);

    current = current.next;
  }

  let n = values.length;
  let maxTwinSum = -Infinity;
  for (let i = 0; i < n; i++) {
    const twinSum = values[i] + values[n - 1 - i];
    maxTwinSum = Math.max(twinSum, maxTwinSum);
  }

  return maxTwinSum;
}
