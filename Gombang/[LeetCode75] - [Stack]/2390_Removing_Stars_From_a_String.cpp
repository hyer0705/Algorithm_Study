class Solution {
public:
    string removeStars(string s) {
        stack<char> stack;

        for (char ch : s)
        {
            if (ch == '*')
                stack.pop();
            else
                stack.push(ch);
        }

        string str;
        while (stack.empty() == false)
        {
            str += stack.top();
            stack.pop();
        }

        reverse(str.begin(), str.end());

        return str;
    }
};