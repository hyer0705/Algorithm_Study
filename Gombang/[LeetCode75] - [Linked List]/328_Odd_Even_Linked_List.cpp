/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {

        if (head == nullptr || head->next == nullptr)
            return head;

        ListNode* oddNode = head;
        ListNode* evenNode = head->next;
        ListNode* evenHeadNode = evenNode;

        // 반복문의 조건을 evenNode를 기준으로 한 이유는 그룹화하는 과정에 있어서
        // 홀수번째와 짝수번째가 서로 쌍을 가지며 정리가 되어야 하기 때문에.
        while (evenNode != nullptr && evenNode->next != nullptr)
        {
            oddNode->next = evenNode->next;
            oddNode = oddNode->next;

            evenNode->next = oddNode->next;
            evenNode = evenNode->next;
        }

        oddNode->next = evenHeadNode;
        return head;
    }
};