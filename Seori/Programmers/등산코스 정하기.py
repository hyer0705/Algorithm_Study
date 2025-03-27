import heapq
def solution(n, paths, gates, summits):
    INF = 10000001
    # [1] path 정보를 adjL에 저장
    adjL = [[] for _ in '_'*(n+1)]
    for i, j, w in paths:
        adjL[i].append((j, w))
        adjL[j].append((i, w))

    # [2] summit은 visited로 표시, gate는 distance를 0으로 초기화
    visited = [0] * (n + 1)
    for summit in summits:
        visited[summit] = 1
        
    distance = [INF] * (n + 1)
    queue = []
    for gate in gates:
        heapq.heappush(queue, (0, gate))
        distance[gate] = 0

    # [3] 다익스트라 알고리즘을 통해 최단거리의 max_intensity를 구함        
    while queue:
        now_intensity, now = heapq.heappop(queue)
        if distance[now] < now_intensity or visited[now]:
            continue
        
        for next, intensity in adjL[now]:
            max_intensity = max(now_intensity, intensity)
            if distance[next] > max_intensity:
                distance[next] = max_intensity
                heapq.heappush(queue, (max_intensity, next))
        
    # [4] summits 중에서 가장 작은 distance를 가지는 summit을 반환 *정렬 필수
    answer = [0, INF]
    for summit in sorted(summits):
        if distance[summit] < answer[1]:
            answer[0] = summit
            answer[1] = distance[summit]
    print(answer)
    return answer
            
solution(6, [[1 ,2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]], [1, 3], [5]) # Expected [5, 3]
solution(7, [[1, 4, 4], [1, 6, 1], [1, 7, 3], [2, 5, 2], [3, 7, 4], [5, 6, 6]], [1], [2, 3, 4]) # Expected [3, 4]
solution(7, [[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]], [3, 7], [1, 5]) # Expected [1, 5]
solution(5, [[1, 3, 10], [1, 4, 20], [2, 3, 4], [2, 4, 6], [3, 5, 20], [4, 5, 6]], [1, 2], [5]) # Expected [5, 6]