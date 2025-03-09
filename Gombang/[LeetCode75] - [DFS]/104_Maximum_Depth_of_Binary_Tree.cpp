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

    int _maxDepth = 0;

    int maxDepth(TreeNode* root) {
        DFS(root, 1);

        return _maxDepth;
    }

    void DFS(TreeNode* node, int depth)
    {
        if (node == nullptr)
            return;

        _maxDepth = max(_maxDepth, depth);
        DFS(node->left, depth + 1);
        DFS(node->right, depth + 1);
    }
};