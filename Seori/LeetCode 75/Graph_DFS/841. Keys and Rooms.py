class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        
        def dfs(now: int, rooms: List[List[int]]) -> None:
            visited[now] = 1
            for next in rooms[now]:
                if next < n and not visited[next]:
                    dfs(next, rooms)
        
        # [1] DFS로 0번방부터 탐색
        n = len(rooms)
        visited = [0] * n
        dfs(0, rooms)

        # [2] 모든 방에 방문했다면 True
        return sum(visited) == n