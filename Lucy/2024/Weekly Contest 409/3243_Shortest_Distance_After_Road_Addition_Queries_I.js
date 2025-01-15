/**
 * 3243. Shortest Distance After Road Addition Queries I
 * url: https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/
 *
 * topic:
 * difficulty: Medium
 * date: 2024.08.06(TUE)~
 */

/**
 * 다익스트라 알고리즘을 패스트 캠퍼스에서 결제한 알고리즘 강의에서 공부를 했습니다.
 *      강의 명: UPSKILL: JavaScript 코딩테스트 131개 예제 & CS 지식으로 끝내기
 * 하지만 오늘 한시간 정도 이론 및 코드에 대해서 강의를 들었지만 100% 이해가 가지 않았는지 문제를 풀 수 없었습니다...
 * 그래서 다른 사람이 푼 풀이에서 다익스트라 알고리즘으로 풀이한 코드를 보고 JS 코드로 변환하는 작업을 시도했습니다.
 *      참고한 풀이: https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/discuss/5583538/Dijkstra-BFS
 *      이 풀이에서 Python 코드가 제일 익숙하여서 해당 코드를 보고 JS 코드로 변환했습니다.
 *
 * 다익스트라 알고리즘은 힙 자료구조를 사용하여 구현하는데, LeetCode에서 제공하는 PriorityQueue를 사용하여 구현했습니다.
 * queries에서 하나의 query를 실행 시켜 graph를 변경한 후, 0에서 n - 1 로 가는 최단 경로를 구하는 방식으로 풀이를 진행했습니다.
 *
 * 새롭게 알게된 점
 *  다익스트라 알고리즘은 최단 경로를 구할 때, 사용되는 알고리즘이다
 *  다익스트라 알고리즘을 구현하기 위해서 PriorityQueue 자료구조를 사용하는데 최소 힙 동작을 사용한다
 *
 */

const dijkstra = (n, graph) => {
  // 각 노드까지의 최단 거리를 Infinity 값으로 초기화한 배열 dist 생성(길이: n)
  const dist = new Array(n).fill(Infinity);

  // 시작 노드인 0번 노드는 최단 거리를 0으로 설정 (자기 자신까지의 거리는 0)
  dist[0] = 0;

  // 우선순위 큐(PriorityQueue) 객체 생성 (최소 힙으로 동작)
  // compare: 우선순위 큐에 저장되는 값들 중 첫 번째 요소(distance)를 기준으로 오름차순 정렬
  const pq = new PriorityQueue({ compare: (a, b) => a[0] - b[0] });
  // 출발 노드 0의 초기 상태를 우선순위 큐에 삽입 ([0까지의 거리, 노드 번호])
  pq.enqueue([0, 0]); // [distance, node]

  // 우선순위 큐가 비어있지 않는 동안 계속 반복
  while (pq.size() > 0) {
    // 큐에서 현재 최단 거리를 가진 노드를 꺼냄
    const [currDist, node] = pq.dequeue();

    // 만약 마지막 노드(n - 1)에 도달했다면, 그때의 최단 거리를 반환
    if (node === n - 1) {
      return dist[n - 1];
    }

    // 이미 더 짧은 경로가 dist 배열에 저장된 경우, 현재 경로는 무시하고 다음으로 넘어감
    if (currDist > dist[node]) {
      continue;
    }

    // 현재 노드와 연결된 이웃 노드를 순회
    // nbr: 현재 노드와 연결된 이웃 노드, wt: 현재 노드에서 이웃 노드까지 이동할 때의 비용
    for (const [nbr, wt] of graph[node]) {
      // 현재 경로를 통해 이웃 노드로 가는 것이 더 짧은지 확인
      if (currDist + wt < dist[nbr]) {
        // 더 짧은 경로가 발견되면 dist 배열을 갱신
        dist[nbr] = currDist + wt;
        // 갱신된 경로 정보를 우선순위 큐에 추가
        pq.enqueue([currDist + wt, nbr]);
      }
    }
  }

  // 반복문이 끝난 후에도 마지막 노드에 도달하지 못한 경우, 해당 노드까지의 최단 거리를 반환
  return dist[n - 1];
};

/**
 * @param {number} n - 그래프의 노드 개수
 * @param {number[][]} queries - 쿼리로 주어진 간선 정보(출발 노드, 도착 노드)
 * @return {number[]} - 각 쿼리 후의 최단 경로 결과를 담은 배열
 */
var shortestDistanceAfterQueries = function (n, queries) {
  // 노드 개수 n에 맞게 빈 인접 리스트(graph) 초기화 (각 노드는 빈 배열을 가짐)
  const graph = Array.from({ length: n }, (_) => []);

  // 초기 그래프 설정: 각 노드는 다음 노드로 가는 비용 1의 간선을 가짐
  for (let i = 0; i < n - 1; i++) {
    graph[i].push([i + 1, 1]); // 현재 노드에서 다음 노드로 가는 간선 추가 (비용 1)
  }

  // 쿼리 결과를 저장할 배열 res 초기화
  const res = [];

  // 주어진 각 쿼리에 대해 반복
  for (const query of queries) {
    // 그래프에 쿼리로 주어진 간선 추가 (출발 노드, 도착 노드, 비용 1)
    graph[query[0]].push([query[1], 1]);

    // 다익스트라 알고리즘을 사용해 현재 그래프 상태에서 0번 노드부터 n - 1번 노드까지의 최단 거리를 계산하고 결과를 res에 저장
    res.push(dijkstra(n, graph));
  }

  // 모든 쿼리를 처리한 후의 최단 거리 결과를 반환
  return res;
};
