import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// 31 ms
class SmallestInfiniteSet {
  private minHeap: MinPriorityQueue<number>;
  private nextSmallest: number;

  private seen: Set<number>;

  constructor() {
    this.minHeap = new MinPriorityQueue<number>();
    this.nextSmallest = 1;
    this.seen = new Set<number>();
  }

  popSmallest(): number {
    if (!this.minHeap.isEmpty()) {
      const popped = this.minHeap.dequeue();
      if (popped) {
        this.seen.delete(popped);

        return popped;
      }
    }

    return this.nextSmallest++;
  }

  addBack(num: number): void {
    if (this.nextSmallest > num && !this.seen.has(num)) {
      this.minHeap.enqueue(num);
      this.seen.add(num);
    }
  }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */

// 모범 답안 25ms
class SmallestInfiniteSet2 {
  private heap: number[];
  private seen: Set<number>;
  private current: number;

  constructor() {
    this.heap = [];
    this.seen = new Set();
    this.current = 1;
  }

  heapifyUp(): void {
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (this.heap[parent] > this.heap[i]) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  heapifyDown(): void {
    const last = this.heap.pop();

    if (this.heap.length > 0 && last) {
      this.heap[0] = last;

      let i = 0;
      while (true) {
        const left = i * 2 + 1;
        const right = i * 2 + 2;

        let s = i;
        if (left < this.heap.length && this.heap[left] < this.heap[s]) s = left;
        if (right < this.heap.length && this.heap[right] < this.heap[s]) s = right;
        if (s === i) break;

        [this.heap[s], this.heap[i]] = [this.heap[i], this.heap[s]];

        i = s;
      }
    }
  }

  popSmallest(): number {
    if (this.heap.length > 0) {
      const smallest = this.heap[0];
      this.heapifyDown();

      this.seen.delete(smallest);
      return smallest;
    }
    return this.current++;
  }

  addBack(num: number): void {
    if (num < this.current && !this.seen.has(num)) {
      this.seen.add(num);

      this.heap.push(num);

      this.heapifyUp();
    }
  }
}
