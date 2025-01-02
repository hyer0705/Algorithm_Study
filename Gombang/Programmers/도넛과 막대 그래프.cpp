#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

unordered_map<int, vector<int>> graph;

enum Shape
{
    Donut = 1,
    Bar = 2,
    Eight = 3,
};

// 시작점으로부터 dfs방식으로 순회.
Shape findShape(int startNumber)
{
    queue<int> q;
    q.push(startNumber);

    while (q.size() > 0)
    {
        int currNumber = q.front();
        q.pop();

        // currNumber와 연결되어 있는 간선이 존재하는 경우.
        if (graph.find(currNumber) != graph.end())
        {
            vector<int> connectedNumbers = graph[currNumber];
            if (connectedNumbers.size() >= 2) // 순회를 하고 있는 도중에 연결된 간선이 2개인 것이 존재.
                return Shape::Eight;

            for (int nextNumber : connectedNumbers)
            {
                if (nextNumber == startNumber)
                    return Shape::Donut;

                q.push(nextNumber);
            }
        }
    }

    return Shape::Bar;
}

vector<int> solution(vector<vector<int>> edges) {
    vector<int> answer(4, 0); // answer초기화 => [ 0, 0, 0, 0 ]
    unordered_map<int, int> inEdgeCountMap; // 생성한 정점을 알아내기 위한 map.

    for (const auto& vec : edges)
    {
        graph[vec[0]].push_back(vec[1]);
        inEdgeCountMap[vec[1]]++;
    }

    // 생성한 정점 추론하기.
    int startNode = 0;
    // 생성한 정점은 out이 2개 이상이며, in이 되는 간선이 없어야 한다.
    for (const auto& edgeMap : graph)
    {
        if (edgeMap.second.size() >= 2 &&
            inEdgeCountMap.find(edgeMap.first) == inEdgeCountMap.end())
        {
            startNode = edgeMap.first;
            break;
        }
    }

    // 그래프 모양 추론하기.
    // 생성한 정점과 연결되어 있는 정점들부터 루프돌리기.
    vector<int> startVertexNumbers = graph[startNode];
    for (int vertexNumber : startVertexNumbers)
    {
        answer[findShape(vertexNumber)]++;
    }

    answer[0] = startNode;
    return answer;
}