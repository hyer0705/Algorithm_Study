// 모범 답안.

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == nullptr || root == p || root == q)
            return root;

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        // left와 right둘다 nullptr가 아니라면 root가 조상 노드.
        if (left != nullptr && right != nullptr)
            return root;

        return left != nullptr ? left : right;
    }
};



// 첫번째 풀이 실패. testcase 29/32 Memory Limit Excceeded.

class Solution {
public:

    void dfs(TreeNode* root, TreeNode* p, TreeNode* q, unordered_map<TreeNode*, vector<TreeNode*>>& map)
    {
        if (root == nullptr)
            return;

        // p와 q에 대해서 다 찾았다면,
        if (map[p].size() > 0 && map[q].size() > 0)
            return;

        if (root->left != nullptr)
        {
            // 현재 노드의 조상노드가 담겨있는 벡터를 가져와서 left에 해당하는 노드를 추가한 후 업데이트.
            vector<TreeNode*> currVec = map[root];
            currVec.push_back(root->left);
            map[root->left] = currVec;
            dfs(root->left, p, q, map);
        }

        if (root->right != nullptr)
        {
            vector<TreeNode*> currVec = map[root];
            currVec.push_back(root->right);
            map[root->right] = currVec;
            dfs(root->right, p, q, map);
        }
    }

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {

        // map을 이용하여 각 노드마다 조상노드들을 구하도록 처리.
        unordered_map<TreeNode*, vector<TreeNode*>> map;
        map[root].push_back(root);

        dfs(root, p, q, map);

        vector<TreeNode*> ancestorPVec = map[p];
        vector<TreeNode*> ancestorQVec = map[q];

        for (int i = ancestorPVec.size() - 1; i >= 0; i--)
        {
            for (int j = ancestorQVec.size() - 1; j >= 0; j--)
            {
                if (ancestorPVec[i] == ancestorQVec[j])
                    return ancestorPVec[i];
            }
        }

        return nullptr;
    }
};