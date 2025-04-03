class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  push(item) {
    this.items.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.items[0];
    this.items[0] = this.items[this.size() - 1];
    this.items.pop();
    this.bubbleDown();
    return min;
  }

  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.items[parentIndex][0] <= this.items[index][0]) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.size()) {
      let leftChild = index * 2 + 1;
      let rightChild = index * 2 + 2;
      let smallerChild = rightChild < this.size() && this.items[rightChild][0] < this.items[leftChild][0] ? rightChild : leftChild;

      if (this.items[index][0] <= this.items[smallerChild][0]) {
        break;
      }

      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}

function solution(alp, cop, problems) {
  let targetAlp = 0;
  let targetCop = 0;

  // 목표 알고력, 코딩력 설정
  for (let [alp_req, cop_req] of problems) {
    targetAlp = Math.max(targetAlp, alp_req);
    targetCop = Math.max(targetCop, cop_req);
  }

  // 시작점이 목표보다 크다면 조정
  alp = Math.min(alp, targetAlp);
  cop = Math.min(cop, targetCop);

  // 다익스트라를 위한 우선순위 큐와 방문 배열 (DP)
  let minHeap = new MinHeap();
  let dist = Array.from({ length: targetAlp + 1 }, () => Array(targetCop + 1).fill(Infinity));

  // 시작점 추가
  minHeap.push([0, alp, cop]); // [소요 시간, 현재 알고력, 현재 코딩력]
  dist[alp][cop] = 0;

  while (minHeap.size() > 0) {
    let [time, curAlp, curCop] = minHeap.pop();

    // 목표에 도달하면 종료
    if (curAlp >= targetAlp && curCop >= targetCop) return time;

    // 알고리즘 공부 (알고력 +1)
    if (curAlp + 1 <= targetAlp && dist[curAlp + 1][curCop] > time + 1) {
      dist[curAlp + 1][curCop] = time + 1;
      minHeap.push([time + 1, curAlp + 1, curCop]);
    }

    // 코딩 공부 (코딩력 +1)
    if (curCop + 1 <= targetCop && dist[curAlp][curCop + 1] > time + 1) {
      dist[curAlp][curCop + 1] = time + 1;
      minHeap.push([time + 1, curAlp, curCop + 1]);
    }

    // 문제 풀이
    for (let [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
      if (curAlp >= alp_req && curCop >= cop_req) {
        let newAlp = Math.min(curAlp + alp_rwd, targetAlp);
        let newCop = Math.min(curCop + cop_rwd, targetCop);

        if (dist[newAlp][newCop] > time + cost) {
          dist[newAlp][newCop] = time + cost;
          minHeap.push([time + cost, newAlp, newCop]);
        }
      }
    }
  }

  return -1; // 실패하는 경우는 없으므로 도달 불가능한 경우 없음
}

solution(10, 10, [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
]); // 15
