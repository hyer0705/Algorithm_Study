from typing import List
class Solution:
    def resultsArray(self, queries: List[List[int]], k: int) -> List[int]:
        import heapq
        answer = [-1] * (len(queries))
        distances = [] # k-1 개의 거리를 최대 힙으로 저장
        kthdist = 10**10 # 최대 거리보다 큰 거리
        for i in range(len(queries)):
            x, y = queries[i]
            dist = abs(x) + abs(y)
            if i+1 < k:
                heapq.heappush(distances, -dist) # 최대 힙 우선순위 큐는 항상 k-1 개임. k-1 개가 될때까지 원소 삽입
            else:
                if dist >= kthdist:
                    answer[i] = kthdist # 거리가 kth distance 보다 크다면 kth distance 변동 없음
                else: # 거리가 kth distance 보다 작다면 kth distance 업데이트
                    heapq.heappush(distances, -dist)
                    d = heapq.heappop(distances) # 최대 거리를 pop 한다면 그것이 kth distance
                    answer[i] = -d
                    kthdist = answer[i]
        
        return answer