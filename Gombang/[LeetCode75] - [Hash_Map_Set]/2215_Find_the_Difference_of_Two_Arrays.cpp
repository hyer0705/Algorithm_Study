class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {

        unordered_map<int, int> num1Map;
        unordered_map<int, int> num2Map;

        for (const int& num : nums1)
        {
            num1Map[num]++;
        }

        for (const int& num : nums2)
        {
            num2Map[num]++;
        }

        vector<vector<int>> result;
        vector<int> map1Vec;
        vector<int> map2Vec;

        for (auto iter = num1Map.begin(); iter != num1Map.end(); ++iter)
        {
            if (num2Map.find(iter->first) == num2Map.end())
                map1Vec.push_back(iter->first);
        }

        for (auto iter = num2Map.begin(); iter != num2Map.end(); ++iter)
        {
            if (num1Map.find(iter->first) == num1Map.end())
                map2Vec.push_back(iter->first);
        }

        result.push_back(map1Vec);
        result.push_back(map2Vec);

        return result;
    }
};