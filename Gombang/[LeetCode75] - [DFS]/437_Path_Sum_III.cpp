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

    int pathCount = 0;

    void dfs(TreeNode* root, vector<long long> vec, int targetSum)
    {
        if (root == nullptr)
            return;

        for (long long& value : vec)
        {
            value += root->val;
        }

        vec.push_back(root->val);

        for (const long long& value : vec)
        {
            if (value == targetSum)
                pathCount++;
        }

        dfs(root->left, vec, targetSum);
        dfs(root->right, vec, targetSum);
    }

    int pathSum(TreeNode* root, int targetSum) {
        // 현재 노드까지의 합과 targetSum을 비교할 수 있는 알고리즘 짜기.

        vector<long long> vec;
        dfs(root, vec, targetSum);

        return pathCount;
    }
};