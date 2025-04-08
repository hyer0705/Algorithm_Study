# 547. Number of Provinces

## 문제 정보

- URL: [547. Number of Provinces 풀어보기](https://leetcode.com/problems/number-of-provinces/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Depth-First Search, Breadth-First Search, Union Find, Graph

## 문제 회고

도시들 간의 연결 정보가 인접 행렬 형태로 주어지고, 직접 또는 간접적으로 연결된 도시들을 하나의 **province(도시 집단)**으로 본다고 했을 때, 총 몇 개의 독립된 집단이 존재하는지를 구하는 문제이다.

이 문제는 결국 연결 요소의 개수를 구하는 문제이고, 대표적인 그래프 탐색 방식인 DFS 또는 Union-Find(Disjoint Set) 알고리즘으로 해결할 수 있다.

문제를 보고 가장 먼저 떠오른 것은 Union-Find 알고리즘이었다. 서로 연결된 도시들을 하나의 집합으로 묶고, 마지막에 각 도시의 최상위 부모 노드(unique root) 수를 세면 province의 수가 된다고 생각했다.

처음에 parent 배열을 그대로 new Set(parent)로 넘겨서 unique한 값을 세는 방식으로 풀었는데, 모든 노드의 부모가 find()를 통해 갱신되지 않은 상태라 잘못된 결과가 나왔다.

`해결 방법`: parent.map(find)로 모든 노드의 최상위 부모를 찾아서 배열을 새로 만든 뒤, 그 배열을 Set에 넘겨 중복을 제거했습니다. 이걸 통해 올바르게 정답을 구할 수 있었다.

문제를 다 푼 후, 다른 사람들의 풀이를 보니 DFS 방식으로 풀이를 한 것을 볼 수 있었다. DFS 방식에서는 각 도시를 순회하면서 아직 방문하지 않은 도시가 있으면, 그 도시를 시작점으로 DFS 탐색을 수행하고, 새로운 province가 하나 생겼다고 판단해 카운트하여 답을 구했다.

Union-Find는 집합을 효율적으로 병합하고 관리할 수 있지만, 최상위 부모 노드를 업데이트하지 않으면 오답이 나올 수 있음을 알게 되었다. DFS 방식은 더 간단하게 연결 요소의 개수를 구할 수 있음을 배울 수 있었다.
