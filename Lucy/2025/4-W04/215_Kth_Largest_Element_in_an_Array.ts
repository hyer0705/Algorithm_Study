function findKthLargest(nums: number[], k: number): number {
  const heap = MaxPriorityQueue.fromArray<number>(nums);

  let kthNum = -1;
  for (let i = 0; i < k; i++) {
    kthNum = heap.dequeue();
  }

  return kthNum;
}
