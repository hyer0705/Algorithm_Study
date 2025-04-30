import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class NumsPair {
  constructor(private nums2El: number, private nums1El: number, private index: number) {}

  getNums1El(): number {
    return this.nums1El;
  }

  getNums2El(): number {
    return this.nums2El;
  }

  getIndex(): number {
    return this.index;
  }
}

function maxScore(nums1: number[], nums2: number[], k: number): number {
  const n = nums1.length;
  const numsPairs: NumsPair[] = [];

  for (let i = 0; i < n; i++) {
    numsPairs.push(new NumsPair(nums2[i], nums1[i], i));
  }
  numsPairs.sort((a: NumsPair, b: NumsPair) => b.getNums2El() - a.getNums2El());

  let sum = 0;
  let maximumScore = -Infinity;

  const minHeap = new MinPriorityQueue<number>();

  for (const currentNumsPair of numsPairs) {
    minHeap.enqueue(currentNumsPair.getNums1El());
    sum += currentNumsPair.getNums1El();

    if (minHeap.size() > k) {
      const popped = minHeap.dequeue();
      if (popped) {
        sum -= popped;
      }
    }

    if (minHeap.size() === k) {
      const currentScore = sum * currentNumsPair.getNums2El();
      if (currentScore > maximumScore) {
        maximumScore = currentScore;
      }
    }
  }

  return maximumScore;
}
