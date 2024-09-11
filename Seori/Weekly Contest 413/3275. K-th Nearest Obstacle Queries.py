class Solution:
    def resultsArray(self, queries: List[List[int]], k: int) -> List[int]:
        result = []
        distance_list = []

        # [1] heap 자료구조를 사용하여 장애물의 거리 정보를 저장한다. Use the heap data structure to store the distance information of obstacles.
        for i in range(len(queries)):
            distance = abs(queries[i][0]) + abs(queries[i][1])
            heapq.heappush(distance_list, -distance)

            # [2] 장애물이 k개 미만인 경우 -1을 반환한다. If there are less than k obstacles, return -1.
            if i < k - 1:
                result.append(-1)

            # [3] 장애물이 k개 이상일 때, 힙의 최대값을 유지하면서 결과를 반환한다. When there are more than k obstacles, return the result while maintaining the maximum value of the heap.
            else:
                if i > k - 1:
                    heapq.heappop(distance_list)
                result.append(-distance_list[0])
        return result
            