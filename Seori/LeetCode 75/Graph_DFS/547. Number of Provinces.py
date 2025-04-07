class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        
        def dfs(now: int) -> None:
            for next in range(n):
                if isConnected[now][next] == 1 and not visited[next]:
                    visited[next] = 1
                    dfs(next)

        n = len(isConnected)
        visited = [0] * n
        
        # 1번 도시부터 DFS 탐색을 실시한다. 다른 도시와 연결되지 않은 경우에만 is_province가 증가한다.
        is_province = 0
        for i in range(n):
            if not visited[i]:
                visited[i] = 1
                dfs(i)
                is_province += 1

        return is_province