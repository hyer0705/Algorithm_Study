class Solution {
public:
    string reverseWords(string s) {
        string word;
        vector<string> wordVec; // list와 같은 자료구조.

        for (int i = 0; i < s.size(); i++)
        {
            // 공백문자가 아니라면 word 문자열 변수에 누적.
            if (s[i] != ' ')
            {
                word += s[i];
            } // 공백 문자이고, word가 빈 값이 아니라면 wordVec에 추가.
            else if (word.empty() == false)
            {
                wordVec.push_back(word);
                word.clear();
            }
        }

        // word에 담긴 맨 마지막를 wordVec에 추가.
        if (word.empty() == false)
            wordVec.push_back(word);

        // wordVec에 대해서 스왑 진행.
        int n = wordVec.size();
        for (int i = 0; i < n / 2; i++)
        {
            string temp = wordVec[i];
            wordVec[i] = wordVec[n - 1 - i];
            wordVec[n - 1 - i] = temp;
        }

        // 공백문자를 이용하여 wordVec에 있는 문자열들 연결해주기.
        string result = wordVec[0];
        for (int i = 1; i < wordVec.size(); i++)
        {
            result += " " + wordVec[i];
        }

        return result;
    }
};