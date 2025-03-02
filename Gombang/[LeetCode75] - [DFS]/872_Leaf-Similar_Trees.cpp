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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> root1Vec;
        vector<int> root2Vec;

        DFS(root1, root1Vec);
        DFS(root2, root2Vec);

        if (root1Vec.size() != root2Vec.size())
            return false;

        for (int i = 0; i < root1Vec.size(); i++)
        {
            if (root1Vec[i] != root2Vec[i])
                return false;
        }

        return true;
    }

    void DFS(TreeNode* node, vector<int>& vec)
    {
        if (node == nullptr)
            return;

        if (node->left == nullptr && node->right == nullptr)
        {
            vec.push_back(node->val);
            return;
        }

        DFS(node->left, vec);
        DFS(node->right, vec);
    }
};