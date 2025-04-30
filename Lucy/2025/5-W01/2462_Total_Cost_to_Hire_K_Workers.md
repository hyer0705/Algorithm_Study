# 2462. Total Cost to Hire K Workers

## 문제 요약

정수 배열 costs가 주어진다. 이 배열에서 정확히 k명의 노동자를 고용하려 한다.

고용은 한 번에 한 명씩, 총 k번의 세션에 걸쳐 진행된다.

각 세션에서는 다음 규칙에 따라 한 명을 뽑는다:

- "앞쪽 후보군": 배열의 앞에서부터 candidates명, costs[0, candidates]
- "뒤쪽 후보군": 배열의 뒤에서부터 candidates명 (앞/뒤 후보군이 겹치면, 중복 없이 한 번만 후보에 포함), [n - candidates, n - 1] 혹은 [candidates, n - 1]
- 두 후보군 중에서 cost가 가장 낮은 사람을 고용한다.
- 만약 최솟값이 여러 명이면 인덱스가 더 작은 사람을 우선한다.

- 이미 고용된 사람은 다시 뽑을 수 없다.

이 과정을 반복해 k명을 고용했을 때 `총 비용`을 구하라.

## 접근 방법

- "앞 candidates명"/"뒤 candidates명" 후보군에서 항상 최소값을 실시간으로 찾고, 고용 후에는 해당 위치에서 다음 노동자를 후보군에 보충해야 한다.
- Min heap(우선순위 큐) 두 개(front/back)로 앞/뒤 후보를 각각 관리하며, candidate 영역이 겹치지 않도록 관리할 필요가 있다.
- left, right 포인터로 아직 후보에 추가되지 않은 인덱스를 추적하고, 겹치지 않는 경우에만 힙을 보충한다.

## 풀이 코드

```typescript
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function totalCost(costs: number[], k: number, candidates: number): number {
  const n = costs.length;

  const frontMinHeap = MinPriorityQueue.fromArray<number>(costs.slice(0, candidates));
  const backMinHeap = MinPriorityQueue.fromArray<number>(costs.slice(Math.max(n - candidates, candidates));

  let totalCost = 0;
  let left = candidates;
  let right = n - candidates - 1;

  for (let hireCount = 0; hireCount < k; hireCount++) {
    if (frontMinHeap.isEmpty()) {
      totalCost += backMinHeap.dequeue()!;
      continue;
    }

    if (backMinHeap.isEmpty()) {
      totalCost += frontMinHeap.dequeue()!;
      continue;
    }

    if (frontMinHeap.front()! <= backMinHeap.front()!) {
      totalCost += frontMinHeap.dequeue()!;
      if (left <= right) frontMinHeap.enqueue(costs[left++]);
    } else {
      totalCost += backMinHeap.dequeue()!;
      if (left <= right) backMinHeap.enqueue(costs[right--]);
    }
  }

  return totalCost;
}
```

## 회고

문제를 이해하기는 했으나 최소 힙 2개를 사용하여 후보자 목록을 관리하여 고용하는 것까지는 생각을 했으나 그 후에 문제에서 요구하는 사항들을 코드로 옮기는 것에 어려움을 느꼈다.

ChatGPT와 대화를 통해 구현 전략(Heap, Two Pointer, 보충 시점/조건 등)을 이해하고, 라이브러리 MinPriorityQueue.fromArray<number>()의 활용법과 Two Pointer를 이용하여 풀이하는 법을 배웠다.

## 참고 링크

- [2462. Total Cost to Hire K Workers](https://leetcode.com/problems/total-cost-to-hire-k-workers/?envType=study-plan-v2&envId=leetcode-75)
- [@datastructures-js/priority-queue 문서](https://www.npmjs.com/package/@datastructures-js/priority-queue#constructor)
