# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        
        # Edge case 처리
        if not head or not head.next: return head
        
        # [1] odd와 even 인덱스의 첫 부분을 변수에 저장하고, 마지막에 사용하기 위해 even_head 또한 저장해둔다.
        odd = head
        even = head.next
        even_head = head.next

        # [2] odd는 odd끼리, even은 even끼리 연결하면 되므로 next.next로 이어준다.
        while even and even.next:
            odd.next, even.next = odd.next.next, even.next.next
            odd, even = odd.next, even.next
        
        # [3] 마지막으로 odd의 마지막 위치에 even의 첫 부분을 이어준다.
        odd.next = even_head
        return head