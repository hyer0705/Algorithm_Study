class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        # Union-Find 알고리즘으로 풀이

        # [A] x의 부모 노드를 찾는 find 함수를 정의한다.
        #     Define a find function that finds the parent node of x.
        def find(x):
            if parents[x] != x:
                parents[x] = find(parents[x])
            return parents[x]

        # [B] a와 b를 연결하는 union 함수를 정의한다.
        #     Define a union function that connects a and b.
        def union(a, b):
            ua = find(a)
            ub = find(b)

            parents[b] = a
            size[a] += size[b]

        # [1] n개의 도시를 연결하는 부모 노드와, 각 union의 크기를 저장하는 리스트를 초기화한다.
        #     Initialize the list of parent nodes connecting n cities and the size of each union.
        parents = [i for i in range(n)]
        size = [1] * n
        result = []
        distance = n - 1

        # [2] 도시의 연결관계 (i, j)에 따라서 i부터 j-1까지는 union한다고 가정하고 최단 거리를 찾는다.
        #     Assuming that i to j-1 are unioned according to the connection relationship of the city (i, j), find the shortest distance
        for i, j in queries:
            a = find(i)

            # [2-1] i가 앞의 도시와 union되어 있다면 최단 거리는 변하지 않는다. 연결관계가 교차하지 않는다는 조건 때문이다.
            #       If i is unioned with the previous city, the shortest distance does not change. This is because the connection relationship does not cross.
            if a != i:
                result.append(distance)
                continue
            
            # [2-2] i부터 j-1까지 union하며 size를 늘려주고 최단 거리를 갱신한다.
            #       Increase the size by unioning from i to j-1 and update the shortest distance.
            s = size[a]
            while a + s < j:
                union(a, a + s)
                distance -= 1
                s = size[a]
            result.append(distance)

        return result