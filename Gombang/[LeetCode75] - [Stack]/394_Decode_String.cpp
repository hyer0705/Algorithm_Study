class Solution {
public:
    string decodeString(string s) {

        stack<string> stringStack;
        stack<int> numStack;
        string repeatStr = "";
        int repeatCount = 0;

        for (char c : s)
        {
            if (isdigit(c))
            {
                int num = c - '0';
                repeatCount = repeatCount * 10 + num;
            }
            else if (c == '[')
            {
                stringStack.push(repeatStr);
                numStack.push(repeatCount);

                repeatStr = "";
                repeatCount = 0;
            }
            else if (c == ']')
            {
                string savedStr = stringStack.top();
                stringStack.pop();
                int count = numStack.top();
                numStack.pop();

                string temp = "";
                for (int i = 0; i < count; i++)
                {
                    temp += repeatStr;
                }

                repeatStr = savedStr + temp;
            }
            else
            {
                repeatStr += c;
            }
        }

        return repeatStr;
    }
};