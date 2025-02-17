from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# O(n) + O(n/2)
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        length = 1
        cur = head
        while cur.next:
            cur = cur.next
            length += 1
        it_cnt = length//2
        cur = head
        while it_cnt > 1:
            cur = cur.next
            it_cnt -= 1
        if cur.next:
            cur.next = cur.next.next
        else:
            head = cur.next
        return head

