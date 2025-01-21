class Solution {
public:
    int equalPairs(vector<vector<int>>& grid) {
        unordered_map<string, int> map;
        for (int i = 0; i < grid.size(); i++)
        {
            string rowStr;
            for (int j = 0; j < grid[0].size(); j++)
            {
                rowStr += to_string(grid[i][j]) + "-";
            }

            map[rowStr]++;
        }

        int result = 0;
        for (int i = 0; i < grid.size(); i++)
        {
            string colStr;
            for (int j = 0; j < grid[0].size(); j++)
            {
                colStr += to_string(grid[j][i]) + "-";
            }

            if (map.find(colStr) != map.end())
            {
                result += map[colStr];
            }

        }

        return result;
    }
};