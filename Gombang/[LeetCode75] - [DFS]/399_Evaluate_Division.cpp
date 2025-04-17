class Solution {
public:
    unordered_map<string, unordered_map<string, double>> graph;

    double dfs(const string& start, const string& end, unordered_set<string>& visited) 
    {
        if (start == end)
            return 1.0;

        for (auto t : graph[start]) 
        {
            string middleNode = t.first;
            double val = t.second;

            if (visited.contains(middleNode))
                continue;
  
            visited.insert(start);

            double result = dfs(middleNode, end, visited);
            if (result != -1.0)
                return val * result;
        }

        return -1.0;
    }

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries)
    {
        vector<double> result;

        for (int i = 0; i < equations.size(); i++)
        {
            graph[equations[i][0]][equations[i][1]] = values[i];
            graph[equations[i][1]][equations[i][0]] = 1 / values[i];
        }

        for (auto& q : queries) 
        {
            if (graph.contains(q[0]) == false || 
                graph.contains(q[1]) == false) 
            {
                result.push_back(-1.0);
                continue;
            }

            unordered_set<string> visited;
            result.push_back(findPath(q[0], q[1], visited));
        }

        return result;
    }

};