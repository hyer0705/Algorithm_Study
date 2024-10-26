class Solution {
public:
    int compress(vector<char>& chars) {

        const int DEFAULT_COUNT = 1;
        vector<char> result;
        int count = DEFAULT_COUNT;
        int currChar = chars[0];

        for (int i = 1; i < chars.size(); i++)
        {
            if (currChar == chars[i])
            {
                count++;
            }
            else
            {
                result.push_back(currChar);
                currChar = chars[i]; // currChar 변경.

                // count가 1보다 클 경우에만 vector에 푸쉬하기 위한 예외처리.
                if (count <= 1)
                    continue;

                string countToString = to_string(count);
                for (int j = 0; j < countToString.size(); j++)
                {
                    result.push_back(countToString[j]);
                }

                count = DEFAULT_COUNT;
            }
        }

        // 마지막 요소 삽입.
        result.push_back(currChar);
        if (count > 1)
        {
            string countToString = to_string(count);
            for (int i = 0; i < countToString.size(); i++)
            {
                result.push_back(countToString[i]);
            }
        }

        chars = result;
        return chars.size();
    }
};