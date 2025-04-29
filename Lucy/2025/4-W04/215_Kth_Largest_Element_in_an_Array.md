# 215. Kth Largest Element in an Array

## 1. 문제 요약

- 정수 배열 nums와 정수 k가 주어진다.
- nums를 내림차순 정렬했을 때, k번째로 큰 수를 반환하라.
- 단, "서로 다른 원소 중"이 아니라 중복 포함 전체 순위에서 k번째를 구해야 한다.
- 배열을 단순 정렬하지 않고 풀 수 있는지를 고려해야 한다.

## 2. 접근 방법

- 최대 힙(Max Heap) 활용
  - 배열을 최대 힙에 모두 삽입하면, 항상 현재 힙의 루트가 가장 큰 값이 된다.
  - k번 루트(최댓값)를 제거(dequeue)하면, 그 k번째가 바로 정답.
- 💡 이유: 내장 정렬(시간복잡도 O(nlogn)) 대신 힙 자료구조는 O(n)으로 만들고, dequeue O(log n) × k만큼만 반복하면 되므로 훨씬 효율적!

## 3. 풀이 코드 (TypeScript)

```typescript
import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function findKthLargest(nums: number[], k: number): number {
  const heap = MaxPriorityQueue.fromArray<number>(nums);

  let kthNum: number | null = -1;
  for (let i = 0; i < k; i++) {
    kthNum = heap.dequeue();
  }

  // 주의: dequeue 결과가 undefined 등일 경우 대비
  if (kthNum !== null && kthNum !== undefined) return kthNum;
  return -1;
}
```

- 사용 라이브러리: [@datastructures-js/priority-queue](https://www.npmjs.com/package/@datastructures-js/priority-queue)

## 4. 동작 예시 & 복잡도

### 예시 1

- 입력: nums = [3,2,1,5,6,4], k = 2
- 1번째 최대값: 6, 2번째 최대값: 5 → 출력 5

### 예시 2

- 입력: nums = [3,2,3,1,2,4,5,5,6], k = 4
- 1번째: 6, 2번째: 5, 3번째: 5, 4번째: 4 → 출력 4

### 시간/공간 복잡도

- 시간복잡도:
  - 힙 생성 O(n)
  - k번 dequeue: O(k log n)
  - 전체 O(n + k log n)
- 공간복잡도: O(n) (최대 힙 크기)

## 5. 회고

### 어려웠던 점

- dequeue() 반환값이 undefined일 수 있어 타입 체크를 신경 써야 했음.

### 다음에 보완할 점

- Heap 직접 구현 연습
- JS에서 자료구조 직접 구현 경험 늘리기

## 참고 링크

[LeetCode 215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/?envType=study-plan-v2&envId=leetcode-75) [@datastructures-js/priority-queue 문서](https://www.npmjs.com/package/@datastructures-js/priority-queue)
