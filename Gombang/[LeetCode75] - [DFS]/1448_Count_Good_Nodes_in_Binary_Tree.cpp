class Solution {
public:

    int value = 0;

    void dfs(TreeNode* root, int maximum)
    {
        if (root == nullptr)
            return;

        if (root->val >= maximum)
        {
            value++;
            maximum = root->val;
        }

        dfs(root->left, maximum);
        dfs(root->right, maximum);
    }

    int goodNodes(TreeNode* root) {
        // 서브트리의 root노드까지 최대값을 계속 비교해준다.

        dfs(root, -10000);

        return value;
    }
};