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

// 두번째 풀이(모범답안 참고)
function pairSum(head: ListNode | null): number {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  let prev: ListNode | null = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  let maxTwinSum = -Infinity;
  let left: ListNode | null = head;
  let right: ListNode | null = prev;
  while (right) {
    maxTwinSum = Math.max(maxTwinSum, left.val + right.val);
    left = left.next;
    right = right.next;
  }

  return maxTwinSum;
}

// 첫 번째 풀이
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
