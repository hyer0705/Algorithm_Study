// word1과 word2에 대해서 직접 카운팅하여, Operation의 과정을 진행하더라도 불가능한 경우들은
// 어떤 경우들이 있을까?에 대한 특징들을 찾아내서 코드에 적용하는 방식으로 구현.

class Solution {
public:
    bool closeStrings(string word1, string word2) {

        if (word1.size() != word2.size())
            return false;

        unordered_map<char, int> freq1, freq2;
        for (char c : word1) freq1[c]++;
        for (char c : word2) freq2[c]++;

        // freq1에 있는 key값이 freq2에 존재하지 않는다면 Operation계산을 해도 나올 수 없다.
        for (auto pair : freq1)
        {
            if (freq2.find(pair.first) == freq2.end())
                return false;
        }

        for (auto pair : freq2)
        {
            if (freq1.find(pair.first) == freq1.end())
                return false;
        }

        // count에 대한 부분까지 빈도수를 처리한다.
        unordered_map<char, int> freq1CountMap, freq2CountMap;
        for (auto pair : freq1) freq1CountMap[pair.second]++;
        for (auto pair : freq2) freq2CountMap[pair.second]++;

        if (freq1CountMap != freq2CountMap)
            return false;

        return true;
    }
};