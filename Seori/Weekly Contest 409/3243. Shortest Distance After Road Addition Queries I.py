class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        
        # [A] 0부터 n-1까지의 도시를 연결하는 최단 거리를 찾는 bfs 함수를 정의한다.
        #     Define a bfs function to find the shortest distance connecting cities from 0 to n-1.
        def find(start: int) -> int:
            visited = [0] * (n-1)
            queue = deque([(start, 0)])
            visited[start] = 1
            while queue:
                now, distance = queue.popleft()
                for next in cities[now]:

                    # [A-1] 목적지에 도달했다면 거리를 반환한다.
                    #       If you have reached your destination, return the distance.
                    if next == n - 1:
                        return distance + 1
                    
                    # [A-2] 목적지에 도달할 때까지 다음 도시로 이동한다.
                    #       Move to the next city until you reach your destination.
                    if not visited[next]:
                        queue.append((next, distance + 1))
                        visited[next] = 1

        # [1] 2차원 배열 cities에 각 도시의 연결 정보를 저장한다.
        #     Save the connection information of each city in the 2D array cities.
        cities = []
        for i in range(n-1):
            cities.append([i+1])

        # [2] 각 쿼리마다 도시의 연결 정보를 업데이트하고 최단 거리를 찾는다.
        result = []
        for i, j in queries:
            cities[i].append(j)
            result.append(find(0))

        return result