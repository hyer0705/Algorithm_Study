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

    TreeNode* findMaxNode(TreeNode* root)
    {
        if (root->right == nullptr)
            return root;

        return findMaxNode(root->right);
    }

    TreeNode* deleteNode(TreeNode* root, int key) {

        if (root == nullptr)
            return nullptr;

        if (root->val < key)
        {
            root->right = deleteNode(root->right, key);
        }
        else if (root->val > key)
        {
            root->left = deleteNode(root->left, key);
        }
        else
        {
            if (root->left == nullptr)
                return root->right;

            if (root->right == nullptr)
                return root->left;

            // 왼쪽 서브 트리에서 가장 큰 값을 찾는다.
            TreeNode* maxNode = findMaxNode(root->left);
            root->val = maxNode->val;
            root->left = deleteNode(root->left, maxNode->val);
        }

        return root;
    }
};