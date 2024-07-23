
public class Solution
{
    public ListNode ModifiedList(int[] nums, ListNode head)
    {
        // value는 0이고 head를 nextNode로 하는 newHead노드 생성.
        ListNode newHead = new ListNode(0, head);
        ListNode prev = newHead;
        ListNode curr = head;

        //HashSet은 List와 동일한 구조를 가지고 있지만, 차이점은 중복 값을 허용하지 않는 컬렉션이다.
        HashSet<int> hash = new HashSet<int>(nums);

        while (curr != null)
        {
            if (hash.Contains(curr.val))
                prev.next = curr.next;
            else
                prev = curr;

            curr = curr.next;
        }

        return newHead.next;
    }
}

// 첫 번째 풀이 : Time Limit Exceeded ( 577 / 582 testcases passed )
// nums배열에 동일한 값이 많이 있을 경우에 대해서 문제가 발생.
//public class Solution
//{
//    // Time Limit Exceeded
//    public ListNode ModifiedList(int[] nums, ListNode head)
//    {
//        // value는 0이고 head를 nextNode로 하는 newHead노드 생성.
//        ListNode newHead = new ListNode(0, head);
//        ListNode prev = newHead;
//        ListNode curr = head;

//        while (curr != null)
//        {
//            bool found = false;
//            foreach (int num in nums)
//            {
//                if (num == curr.val)
//                {
//                    prev.next = curr.next;
//                    curr = prev.next;
//                    found = true;
//                    break;
//                }
//            }

//            if (found == false)
//            {
//                prev = curr;
//                curr = curr.next;
//            }
//        }

//        return newHead.next;
//    }
//}