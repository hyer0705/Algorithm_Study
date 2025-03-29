from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        reordered_head = head
        if not head or not head.next:
            return reordered_head

        even_head = head.next
        odd_cur = reordered_head
        even_cur = even_head
        cur = even_head
        i = 2
        while cur.next:
            cur = cur.next
            i += 1
            if i % 2 == 1:
                odd_cur.next = cur
                odd_cur = odd_cur.next
            else:
                even_cur.next = cur
                even_cur = even_cur.next
        even_cur.next = None
        odd_cur.next = even_head
        return reordered_head