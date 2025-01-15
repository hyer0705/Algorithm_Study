class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        unordered_map<int, int> map;
        for (int num : arr)
        {
            map[num]++;
        }

        vector<int> freqVec;
        for (auto it = map.begin(); it != map.end(); ++it)
        {
            freqVec.push_back(it->second);
        }

        unordered_set<int> uniqueSet(freqVec.begin(), freqVec.end());

        return freqVec.size() == uniqueSet.size();
    }
};