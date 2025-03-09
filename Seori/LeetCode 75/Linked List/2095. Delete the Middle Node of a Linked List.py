# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        
        # [A] Linked List의 총 길이 n을 찾아주는 함수
        def find_last_node(head: Optional[ListNode]) -> int:
            cnt = 1
            while head.next:
                head = head.next
                cnt += 1
            
            return cnt

        # [B] n번째 노드를 삭제해주는 함수
        def deleteNode(head: Optional[ListNode], n: int) -> None:
            for i in range(n-1):
                head = head.next
            head.next = head.next.next

        # 위 두 함수를 순서대로 실행해서, n//2번째 노드를 삭제한다.
        n = find_last_node(head)
        if n == 1: return
        deleteNode(head, n//2)

        return head