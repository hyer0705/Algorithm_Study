# 2130. Maximum Twin Sum of a Linked List

## 문제 정보

- URL: https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/description/?envType=study-plan-v2&envId=leetcode-75
- LEVEL: Medium
- TOPICS: Linked List, Two Pointers, Stack

## 문제 접근

### Twin Sum이란?

- 주어진 짝수 개수의 링크드 리스트에서, i번째 노드와 (n-1-i)번째 노드를 **쌍(pair)**으로 묶는다.
- 두 노드의 합을 twin sum이라 한다.

#### 예시

```plaintext
Input: head = [5, 4, 2, 1]

Twin pairs: (5,1), (4,2)

Twin sums: 5+1=6, 4+2=6
```

### 첫 번째 풀이: 배열을 활용한 접근

링크드 리스트를 배열로 변환한 후, twin sum을 계산하는 방식

1. 예외 처리

- 주어진 링크드 리스트가 비어 있을 경우 twin sum은 자동으로 0이 되어 0을 반환한다.

```typescript
if (head === null) return 0;
```

2. 변수 생성 및 초기화

- values: 링크드 리스트를 구성하는 노드들의 val 값을 저장하는 배열
- current: 현재 노드를 가리키는 포인터

```typescript
const values = [];
let current: ListNode = head;
```

3. 배열로 변환

- 먼저 링크드 리스트를 순회하면서, 각 노드의 값을 배열(values[])에 저장한다.

```typescript
while (current) {
  if (current) values.push(current.val);

  current = current.next;
}
```

4. twin sum 계산

- n: values 배열의 길이
- maxTwinSum: twin sum 중 가장 큰 값을 저장하는 변수

```typescript
let n = values.length;
let maxTwinSum = -Infinity;

for (let i = 0; i < n; i++) {
  const twinSum = values[i] + values[n - 1 - i];
  maxTwinSum = Math.max(twinSum, maxTwinSum);
}
```

5. 최대 twin sum 값을 반환

```typescript
return maxTwinSum;
```

### 두 번째 풀이: 링크드 리스트의 특징을 활용한 접근

배열을 사용하지 않고, 링크드 리스트의 포인터를 조작하여 twin sum을 계산하는 방식

1. 링크드 리스트의 중간 찾기

- slow: 노드를 하나의 간격으로 가리키는 포인터
- fast: 노드를 두개의 간격으로 가리키는 포인터

- Fast & Slow 포인터 기법을 사용해 중간 지점을 찾는다. fast 포인터는 두 칸씩 이동하고, slow 포인터는 한 칸씩 이동하여, slow가 리스트의 중간에 도달하게 한다.

```typescript
let slow: ListNode | null = head;
let fast: ListNode | null = head;

while (fast && fast.next) {
  fast = fast.next.next;
  slow = slow.next;
}
```

2. 리스트의 후반부를 뒤집기

- slow 포인터 이후의 노드들을 뒤집어 순서를 변경한다. prev 포인터를 사용하여 뒤집어진 리스트의 새로운 시작점을 저장한다.

```typescript
let prev: ListNode | null = null;
while (slow) {
  const next = slow.next;
  slow.next = prev;
  prev = slow;
  slow = next;
}
```

3. twin sum 계산

- left 포인터는 처음부터, right 포인터는 뒤집힌 리스트의 시작점에서 출발한다.
- 각 노드를 비교하면서 twin sum을 계산하고, 최대 twin sum을 갱신한다.

```typescript
let maxTwinSum = -Infinity;
let left: ListNode | null = head;
let right: ListNode | null = prev;

while (right) {
  maxTwinSum = Math.max(maxTwinSum, left.val + right.val);
  left = left.next;
  right = right.next;
}
```

4. 최대 twin sum 반환

```typescript
return maxTwinSum;
```

## 문제 회고

처음에는 링크드 리스트의 특징을 활용하는 방법을 떠올리지 못하고, 가장 먼저 배열을 사용한 접근법이 떠올랐다.

1. 배열을 사용한 접근

- 주어진 링크드 리스트를 순회하며 각 노드의 값을 배열에 저장한다.
- 배열을 순회하면서 twin sum을 계산하고, Math.max()를 이용해 최대 twin sum 값을 구했다.

하지만 이 방식은 배열을 추가적으로 사용하기 때문에 공간 복잡도가 O(n) 이고, 연산 속도가 상대적으로 느렸다.

2. 링크드 리스트의 특징을 활용한 접근

- 다른 사람들의 풀이를 살펴보면서, 배열 없이 링크드 리스트 자체를 활용하는 방법이 있음을 알게 되었다.
- 두 가지 핵심 개념을 익힐 수 있었다.
  - 중간 위치를 찾는 방법: Fast & Slow 포인터 기법을 사용하여 링크드 리스트의 중간 지점을 효율적으로 찾는 방법을 배웠다.
  - 링크드 리스트 뒤집기: 리스트의 절반을 뒤집어 반대쪽과 비교하는 방식으로 twin sum을 계산할 수 있다는 점을 알게 되었다.

이번 문제를 통해 링크드 리스트의 중간을 찾는 법과 뒤집는 방법을 복습할 수 있었고, 배열을 사용하는 것이 아니라 링크드 리스트 자체를 활용하면 더 효율적인 풀이가 가능하다는 점을 깨달았다. 앞으로는 문제를 풀 때, 데이터 구조의 특성을 먼저 고려하는 습관을 들여야겠다.

## 참고 자료
