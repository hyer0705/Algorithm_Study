/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:

    const int LEFT = -1;
    const int RIGHT = 1;

    int answer = 0;

    void dfs(TreeNode* root, int count, int direction)
    {
        if (root == nullptr)
            return;

        // 지금까지 저장된 가장 큰 answer값과 새로 들어온 count값의 크기 비교.
        answer = max(answer, count + 1);

        // 현재 노드로 들어오는 탐색 방향이 LEFT였다면,
        if (direction == LEFT)
        {
            dfs(root->right, count + 1, RIGHT);
            dfs(root->left, 0, LEFT); // 현재 노드에서부터 dfs를 다시 시작.
        }
        else
        {
            dfs(root->left, count + 1, LEFT);
            dfs(root->right, 0, RIGHT); // 현재 노드에서부터 dfs를 다시 시작.
        }
    }

    int longestZigZag(TreeNode* root) {

        dfs(root->left, 0, LEFT);
        dfs(root->right, 0, RIGHT);

        return answer;
    }
};