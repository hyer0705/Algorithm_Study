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
    int pairSum(ListNode* head) {
        int maxSum = 0;
        vector<int> vec;

        while (head != nullptr)
        {
            vec.push_back(head->val);
            head = head->next;
        }

        for (int i = 0; i < vec.size() / 2; i++)
        {
            maxSum = max(maxSum, vec[i] + vec[vec.size() - i - 1]);
        }

        return maxSum;
    }
};