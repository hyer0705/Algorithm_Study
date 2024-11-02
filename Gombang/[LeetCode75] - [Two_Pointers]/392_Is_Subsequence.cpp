class Solution {
public:
    bool isSubsequence(string s, string t) {
        int left = 0;

        for (int i = 0; i < t.size(); i++)
        {
            if (t[i] == s[left])
                left++;
        }

        return left == s.size();
    }
};