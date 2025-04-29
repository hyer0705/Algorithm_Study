# 2336. Smallest Number in Infinite Set

## 문제 요약

- 1, 2, 3, ... 모든 자연수가 들어 있는 "무한 집합"을 관리하는 클래스(데이터 구조)를 구현하는 문제.
  - 지원하는 연산:
    1. popSmallest: 집합에서 가장 작은 수를 제거해서 반환
    2. addBack(num): 이미 제거됐던 num을 집합에 "다시 넣음" (이미 집합에 있으면 무시)
- 총 1000번 정도의 연산만 주어짐(크게 최적화 필요 없음)

## 접근 방법

- 실제 무한 배열/집합을 만들 수는 없으니, "다음으로 나올 수" 있는 가장 작은 값만 nextSmallest로 관리
- 한 번 빠진 수(popSmallest로 제거했다가 다시 addBack된 숫자)를 관리하기 위해서 **최소 힙(min-heap)**을 사용
- addBack 호출되면, 이미 집합에 없었던 숫자만 힙에 다시 넣는다 → Set을 활용해서 중복 추가 방지
- popSmallest는 힙에 숫자가 있으면(즉, "다시 들어온 작은 수") 그것부터 꺼내고, 없으면 "가장 왼쪽 자연수"(nextSmallest) 반환

## 풀이 코드

```typescript
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

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
      if (popped !== undefined && popped !== null) {
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
    // 이미 집합에 있는 수이거나, 아직 등장하지 않은(그 이후의 자연수)이면 무시
  }
}
```

## 동작 예시 & 복잡도

- Input: ["SmallestInfiniteSet", "addBack", "popSmallest", ... ]
  - addBack(2) → 2는 집합에 아직 있으므로 변화 없음
  - popSmallest() → 1
  - popSmallest() → 2
  - popSmallest() → 3
  - addBack(1) → 1은 1, 2, 3이 다 빠져나온 상태에서 집합에 없으니, 힙에 들어감
  - popSmallest() → 1 (힙에서 나옴)
  - popSmallest() → 4
  - popSmallest() → 5

### 시간/공간 복잡도

- 각각의 연산은 힙/셋 덕분에 O(log k) (실제 넣는 k값 제한이 1000)

## 회고

### 어려웠던 점

- 문제의 "집합이 무한"이라는 부분, 그리고 "이미 집합에 없는 수는 addBack 시 다시만 넣는다"는 식의 동작이 처음엔 직관적이지 않음
- 문제의 요구조건을 명확히 파악하는 것이 시간이 꽤 걸렸음

### 다음에 보완할 점

- Heap 직접 구현 연습

## 참고 링크

- [LeetCode 2336. Smallest Number in Infinite Set](https://leetcode.com/problems/smallest-number-in-infinite-set/description/?envType=study-plan-v2&envId=leetcode-75)
