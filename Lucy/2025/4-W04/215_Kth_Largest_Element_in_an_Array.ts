import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function findKthLargest(nums: number[], k: number): number {
  const heap = MaxPriorityQueue.fromArray<number>(nums);

  let kthNum: number | null = -1;
  for (let i = 0; i < k; i++) {
    kthNum = heap.dequeue();
  }

  if (kthNum) return kthNum;

  return -1;
}
