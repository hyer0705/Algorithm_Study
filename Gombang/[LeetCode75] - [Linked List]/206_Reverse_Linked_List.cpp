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
    ListNode* reverseList(ListNode* head) {

        if (head == nullptr || head->next == nullptr)
            return head;

        ListNode* temp = head;
        stack<ListNode*> nodeStack; 
        // 스택에 하나씩 담는다.
        while (temp != nullptr)
        {
            nodeStack.push(temp);
            temp = temp->next;
        }

        ListNode* newHead = nodeStack.top();
        nodeStack.pop();

        temp = newHead;
        // 반대로 스택에서 꺼내면서 링크를 연결해준다.
        while (nodeStack.empty() == false)
        {
            temp->next = nodeStack.top();
            nodeStack.pop();
            temp = temp->next;
        }

        temp->next = nullptr;

        return newHead;
    }
};