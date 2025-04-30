import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function totalCost(costs: number[], k: number, candidates: number): number {
  const n = costs.length;

  const frontMinHeap = MinPriorityQueue.fromArray<number>(costs.slice(0, candidates));
  const backMinHeap = MinPriorityQueue.fromArray<number>(costs.slice(Math.max(n - candidates, candidates)));

  let totalCost = 0;

  let left = candidates;
  let right = n - candidates - 1;

  // k번 채용
  for (let hireCount = 0; hireCount < k; hireCount++) {
    // 앞 후보가 없으면(=모두 채용됨/out됨), 뒤 후보에서만 뽑아야 함
    if (frontMinHeap.isEmpty()) {
      totalCost += backMinHeap.dequeue()!;
      continue;
    }

    // 뒤 후보가 없으면(=모두 채용됨/out됨), 앞 후보에서만 뽑아야 함
    if (backMinHeap.isEmpty()) {
      totalCost += frontMinHeap.dequeue()!;
      continue;
    }

    // 앞/뒤 둘 다 후보가 남은 경우: 더 싼 급여를 가진 쪽/동점시 앞쪽을 선택!
    if (frontMinHeap.front()! <= backMinHeap.front()!) {
      totalCost += frontMinHeap.dequeue()!;

      // 아직 앞/뒤 후보 구간이 겹치지 않았으면, 새 후보(즉, 이전에 후보군에 없던 다음 인덱스 노동자)를 heap에 추가(보충)
      if (left <= right) frontMinHeap.enqueue(costs[left++]);
    } else {
      totalCost += backMinHeap.dequeue()!;

      // 아직 앞/뒤 후보 구간이 겹치지 않았으면, 새 후보(즉, 이전에 후보군에 없던 다음 인덱스 노동자)를 heap에 추가(보충)
      if (left <= right) backMinHeap.enqueue(costs[right--]);
    }
  }

  return totalCost;
}
