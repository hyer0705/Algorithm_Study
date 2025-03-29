class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    this._heapifyUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];

    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return root;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;

      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]]; // swap

      index = parentIndex;
    }
  }

  _heapifyDown() {
    let index = 0;
    // 2 * index + 1 = 왼쪽 자식 노드의 index
    while (2 * index + 1 < this.heap.length) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;

      let smallerChild = left; // 왼쪽 자식 노드가 기본적으로 더 작은 값이라고 가정

      // 오른쪽 자식 노드가 heap에 존재 && 오른쪽 자식 노드의 intensity가 왼쪽 자식 노드의 intensity 보다 작은 경우
      if (right < this.heap.length && this.heap[right][0] < this.heap[left][0]) {
        smallerChild = right;
      }

      if (this.heap[index][0] <= this.heap[smallerChild][0]) break;

      [this.heap[index], this.heap[smallerChild]] = [this.heap[smallerChild], this.heap[index]]; // swap

      index = smallerChild;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(n, paths, gates, summits) {
  // 1. 그래프 구성
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  // 2. 출입구와 산봉우리 구분
  //    Set을 이용하는 이유는 더 빠르게 탐색하기 위함
  //    Array.prototype.includes() 메서드의 시간 복잡도: O(n), (배열을 처음부터 끝까지 확인해야 함)
  //    Set.prototype.has() 메서드의 시간 복잡도: O(1), (해시 테이블 구조로 저장되므로 즉시 찾을 수 있음)
  const summitSet = new Set(summits);
  const gateSet = new Set(gates);

  // 3. 다익스트라 알고리즘을 위한 초기화
  const intensity = Array(n + 1).fill(Infinity);
  const pq = new MinHeap();

  // 4. 모든 출입구에서 시작
  for (const gate of gates) {
    pq.push([0, gate]); // (현재까지의 intensity, 노드)
    intensity[gate] = 0;
  }

  // 5. 다익스트라 탐색 시작
  while (!pq.isEmpty()) {
    const [currentIntensity, node] = pq.pop();

    if (currentIntensity > intensity[node]) continue; // 이미 더 작은 intensity로 방문했다면 스킵
    if (summitSet.has(node)) continue; // 산봉우리에 도착하면 탐색 종료

    for (const [neighbor, weight] of graph[node]) {
      if (gateSet.has(neighbor)) continue; // 출입구로 돌아가는 경로는 필요 없음

      const newIntensity = Math.max(currentIntensity, weight);
      if (newIntensity < intensity[neighbor]) {
        intensity[neighbor] = newIntensity;
        pq.push([newIntensity, neighbor]);
      }
    }
  }

  // 6. 최소 intensity를 가지는 산봉우리 찾기
  let bestSummit = -1;
  let minIntensity = Infinity;

  for (const summit of summits) {
    // 최소 intensity 업데이트
    if (intensity[summit] < minIntensity) {
      minIntensity = intensity[summit];
      bestSummit = summit;
    }
    // intensity가 최소가 되는 등산코스가 중복되는 경우, 그중 산봉우리의 번호가 가장 낮은 걸 선택
    else if (intensity[summit] === minIntensity) {
      bestSummit = Math.min(bestSummit, summit);
    }
  }

  return [bestSummit, minIntensity];
}

// solution(
//   6,
//   [
//     [1, 2, 3],
//     [2, 3, 5],
//     [2, 4, 2],
//     [2, 5, 4],
//     [3, 4, 4],
//     [4, 5, 3],
//     [4, 6, 1],
//     [5, 6, 1],
//   ],
//   [1, 3],
//   [5]
// ); // [5, 3]

solution(
  7,
  [
    [1, 4, 4],
    [1, 6, 1],
    [1, 7, 3],
    [2, 5, 2],
    [3, 7, 4],
    [5, 6, 6],
  ],
  [1],
  [2, 3, 4]
); // [3, 4]

solution(
  7,
  [
    [1, 2, 5],
    [1, 4, 1],
    [2, 3, 1],
    [2, 6, 7],
    [4, 5, 1],
    [5, 6, 1],
    [6, 7, 1],
  ],
  [3, 7],
  [1, 5]
); // [5, 1]

solution(
  5,
  [
    [1, 3, 10],
    [1, 4, 20],
    [2, 3, 4],
    [2, 4, 6],
    [3, 5, 20],
    [4, 5, 6],
  ],
  [1, 2],
  [5]
); // [5, 6]
