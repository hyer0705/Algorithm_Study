# 2542. Maximum Subsequence Score

## 문제 요약

- 두 숫자 배열(nums1, nums2)과 정수 k가 주어진다.
- 길이 k의 인덱스 조합을 골라 (nums1의 선택값 합) \* (nums2의 선택값 중 최소)를 점수로 삼는다.
- 가능한 모든 조합 중 `최대 점수`를 찾아라.
- 1 <= k <= n(10^5) 이므로 완전 탐색으로 문제를 풀면 시간 초과가 예상된다.

## 접근 방법

이 문제의 핵심은 최대 점수를 만드는 인덱스 조합을 효과적으로 찾는 것입니다.

점수는 `(선택된 nums1 요소의 합) \* (선택된 nums2 요소 중 최소값)`이므로, 최대한 `nums2 쪽 최소값이 크고`, 동시에 `nums1의 합도 최대`가 되게 만들어야 합니다.

- nums2의 "큰 값"을 subsequence의 최소로 만들고 싶다.

  - nums2를 내림차순 정렬해서, 가장 큰 값부터 "최소값 후보"로 두고 탐색할 수 있습니다.

- nums1 k개 합을 "항상 최대"로 만들고 싶다.

  - 골라낸 후보들 중 합이 가장 클 수 있게 greedy하게 가져가는 것이 중요합니다.
  - 새로운 nums1 값을 추가할 때마다 k개가 넘으면, 가장 작은 값을 빼고 k개의 최대 합을 항상 유지해야 합니다.
  - 이 "가장 작은 값"을 빠르게 제거하는 데 **최소 힙(min-heap)**을 씁니다.

## 풀이 코드

- nums2 기준 내림차순 정렬
- 순회하면서:
  - nums1 값은 heap에 삽입
  - sum 변수에 nums1 값을 합산
  - k개가 넘으면 최소값을 힙에서 뽑아(sum에서 뺌)
  - k개 합이 완성되었을 때 점수 계산: `sum * currentNumsPair.getNums2El()`
    - 최대 점수 갱신
- 순회 완료 후 최대 점수 반환

```typescript
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
```

## 회고

### 어려웠던 점

- 문제 해석/접근법
  - 조합을 "일일이 만들어보지 않고" 최적으로 계산하는 방법이 직관적이지 않았다.
  - nums2의 큰 값을 "최소값 후보"로 삼는다는 발상이 쉽지 않았다.
- Heap 활용 이유
  - 왜 Heap을 써야 하는지 처음엔 와닿지 않았다.
  - "항상 k개의 nums1 중 합이 최대가 되게 하려면, 새 값 넣고 가장 작은 값 빼기" 를 하기 위해서 최소 힙이 빠르게 연산해준다는 것을 깨달았다.

### 배운 점

- 조합 최적화 문제에서 그리디+힙이 매우 유용하다는 배웠다.

## 참고 링크

- [2542. Maximum Subsequence Score 문제 풀어보기](https://leetcode.com/problems/maximum-subsequence-score/?envType=study-plan-v2&envId=leetcode-75)
