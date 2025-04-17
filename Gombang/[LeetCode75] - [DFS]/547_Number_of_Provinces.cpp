class Solution {
public:

    unordered_map<int, vector<int>> graph;

    void dfs(int currCity, vector<bool>& visited)
    {
        if (visited[currCity])
            return;

        visited[currCity] = true;
        for (int adjCity : graph[currCity])
        {
            if (visited[adjCity])
                continue;

            dfs(adjCity, visited);
        }
    }

    int findCircleNum(vector<vector<int>>& isConnected) {

        // 어떤 도시와 어떤 도시가 연결되어 있는지 그래프로 표현.
        for (int i = 0; i < isConnected.size(); i++)
        {
            for (int j = 0; j < isConnected[i].size(); j++)
            {
                if (isConnected[i][j] == 1 && i != j)
                {
                    graph[i].push_back(j);
                    graph[j].push_back(i);
                }
            }
        }

        int cityCount = isConnected.size();
        vector<bool> visited(cityCount, false);

        int groupCount = 0;
        for (int i = 0; i < cityCount; i++)
        {
            if (visited[i])
                continue;

            groupCount++;
            dfs(i, visited);
        }

        return groupCount;
    }
};