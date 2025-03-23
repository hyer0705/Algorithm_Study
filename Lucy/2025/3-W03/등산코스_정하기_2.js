class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    // value: [node, intensity]
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];

    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();
    this.bubbleDown();

    return min;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  bubbleUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[parentIndex][1] <= this.heap[currentIndex][1]) {
        break;
      }

      this.swap(currentIndex, parentIndex);

      currentIndex = parentIndex;
    }
  }

  bubbleDown() {
    let currentIndex = 0;

    while (currentIndex * 2 + 1 < this.size()) {
      let leftChild = currentIndex * 2 + 1;
      let rightChild = currentIndex * 2 + 2;

      let smallerChild = rightChild < this.size() && this.heap[rightChild][1] < this.heap[leftChild][1] ? rightChild : leftChild;

      if (this.heap[currentIndex][1] <= this.heap[smallerChild][1]) {
        break;
      }

      this.swap(currentIndex, smallerChild);

      currentIndex = smallerChild;
    }
  }
}

function solution(n, paths, gates, summits) {
  const gateSet = new Set(gates);
  const summitSet = new Set(summits);

  const pq = new MinHeap();
  const intensity = Array.from({ length: n + 1 }, (_) => Infinity);

  // 양방향 그래프
  const graph = Array.from({ length: n + 1 }, (_) => []);
  for (const [i, j, w] of paths) {
    graph[i].push([j, w]);
    graph[j].push([i, w]);
  }

  for (const gate of gates) {
    intensity[gate] = 0;
    pq.push([gate, 0]);
  }

  while (!pq.isEmpty()) {
    const [fromNode, currentIntensity] = pq.pop();

    if (currentIntensity > intensity[fromNode]) continue;
    if (summitSet.has(fromNode)) continue;

    for (const [toNode, weight] of graph[fromNode]) {
      if (gateSet.has(toNode)) continue;

      const newIntensity = Math.max(weight, currentIntensity);

      if (intensity[toNode] > newIntensity) {
        intensity[toNode] = newIntensity;
        pq.push([toNode, newIntensity]);
      }
    }
  }

  let minIntensity = Infinity;
  let minSummit = -1;

  for (const summit of summits) {
    if (minIntensity > intensity[summit]) {
      minIntensity = intensity[summit];
      minSummit = summit;
    } else if (minIntensity === intensity[summit] && minSummit > summit) {
      minSummit = summit;
    }
  }

  return [minSummit, minIntensity];
}

solution(
  6,
  [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
  ],
  [1, 3],
  [5]
); // [5, 3]
