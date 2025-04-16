class Solution {
public:

    unordered_map<int, vector<int>> twoWayRoadGraph;
    unordered_map<int, vector<int>> originalRoadGraph;

    void dfs(int currCity, vector<bool>& canMoveToCityZeroVec, int& changeCount)
    {
        vector<int> adjCities = originalRoadGraph[currCity];
        for (int i = 0; i < adjCities.size(); i++)
        {
            // 나와 인접한 도시를 통해서 0번 도시로 갈 수 있으면, 나의 도시도 0번 도시로 갈 수 있다.
            if (canMoveToCityZeroVec[adjCities[i]])
            {
                canMoveToCityZeroVec[currCity] = true;
                break;
            }
        }

        // 위 for루프를 돌렸음에도 나의 도시에서 0번 도시로 갈 수 없다면 true로 바꿔주고 카운트+1증가.
        if (canMoveToCityZeroVec[currCity] == false)
        {
            canMoveToCityZeroVec[currCity] = true;
            changeCount++;
        }

        vector<int> nextCityList = twoWayRoadGraph[currCity];
        for (int nextCity : nextCityList)
        {
            if (canMoveToCityZeroVec[nextCity] == false)
            {
                dfs(nextCity, canMoveToCityZeroVec, changeCount);
            }
        }
    }

    int minReorder(int n, vector<vector<int>>& connections) {

        // 양방향 그래프를 통해
        for (int i = 0; i < connections.size(); i++)
        {
            int startNode = connections[i][0];
            int endNode = connections[i][1];

            twoWayRoadGraph[startNode].push_back(endNode);
            twoWayRoadGraph[endNode].push_back(startNode);

            originalRoadGraph[startNode].push_back(endNode);
        }

        int changeCount = 0;
        vector<bool> canMoveToCityZeroVec(n, false);
        canMoveToCityZeroVec[0] = true;

        // 0번 도시를 시작으로 twoWayGraph를 참고하여 dfs순회를 하며 
        // currRoadGraph에 0으로 가는 것이 없다면 카운팅을 + 1한다.
        vector<int> cities = twoWayRoadGraph[0];
        for (int i = 0; i < cities.size(); i++)
        {
            dfs(cities[i], canMoveToCityZeroVec, changeCount);
        }

        return changeCount;
    }
};