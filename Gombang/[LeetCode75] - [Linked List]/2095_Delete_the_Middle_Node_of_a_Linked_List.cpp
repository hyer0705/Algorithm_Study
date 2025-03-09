// 모범 답안 풀이.
class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {
        if (head->next == nullptr) {
            return nullptr;
        }
        ListNode* slow = head;
        ListNode* fast = head->next;
        while (fast->next != nullptr && fast->next->next != nullptr) {
            fast = fast->next->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return head;
    }
};

// 첫 번째 풀이.
class Solution {
public:
    ListNode* deleteMiddle(ListNode* head) {

        // 사이즈가 1일때,
        if (head->next == nullptr)
            return nullptr;

        // 1. 전체 사이즈 구하기.
        int size = 0;
        ListNode* temp = head;
        while (temp != nullptr)
        {
            size++;
            temp = temp->next;
        }

        // 2. 중간 노드의 전 노드를 구하는 과정.
        temp = head;
        for (int i = 0; i < size / 2 - 1; i++)
        {
            temp = temp->next;
        }

        // 중간 노드를 건너뛰도록 연결.
        temp->next = temp->next->next;

        return head;
    }
};