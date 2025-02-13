# 2095. Delete the Middle Node of a Linked List

## 문제 정보

- URL: https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/?envType=study-plan-v2&envId=leetcode-75
- LEVEL: Medium
- TOPICS: Linked List, Two Pointers

## 문제 접근

이 문제는 주어진 연결 리스트에서 중간 노드를 삭제하는 문제였다.

먼저, current라는 변수를 사용해 매개변수로 받은 head를 가리키도록 설정하고, while 문을 이용해 연결 리스트의 길이를 계산한다. 리스트의 길이를 알면, 중간 노드가 리스트에서 몇 번째 위치에 있는지를 쉽게 알 수 있다. 그 후, current를 이용해 중간 노드를 가리키는 노드를 찾고, 그 노드를 삭제하기 위해 중간 노드를 가리키는 포인터를 중간 노드의 다음 노드를 가리키도록 변경한다. 이를 통해 중간 노드를 삭제할 수 있다.

### 코드 흐름

1. head부터 시작하여 리스트의 길이를 구한다.

```typescript
let current: ListNode | null = head;
let n = 1;
while (current.next) {
  n++;
  current = current.next;
}
```

2. 중간 노드의 인덱스를 계산한다.

이 때, 연결 리스트 길이가 1인 경우 바로 null 값을 return 한다.

```typescript
const middleNodeIndex: number = Math.floor(n / 2) - 1;
if (middleNodeIndex === -1) return null;
```

3. current를 다시 head로 초기화한 후, while문을 통해 연결 리스트를 순회하면서 current가 중간 노드를 가리킬 때, 그 노드의 next를 중간 노드의 다음 노드로 연결하여 중간 노드를 삭제한다.

```typescript
current = head;
n = 0;
while (current.next) {
  if (n === middleNodeIndex) {
    current.next = current.next.next;
    break;
  }

  current = current.next;
  n++;
}

return head;
```

## 문제 회고

최근에 그로킹 알고리즘 책에서 링크드 리스트를 공부한 덕분인지, 문제를 이해하는 데 큰 어려움은 없었다. 문제의 핵심은 연결 리스트의 길이를 측정한 후, 중간 노드를 찾아 제거하는 것이었다.

다만, 중간 노드를 가리키는 포인터를 설정하는 과정에서 살짝 혼란스러웠다. 연결 리스트에서 노드를 삭제하려면, 삭제할 노드를 가리키는 포인터를 그 다음 노드를 가리키도록 변경해야 한다. 이 과정이 머릿속에서는 이해됐지만, 실제로 코드로 구현할 때는 연결 리스트의 동작을 완전히 숙지하지 않았다면 헷갈릴 법했다.

확실히, 연결 리스트 문제를 접할 때마다 포인터 개념이 가장 어려운 부분이라는 걸 다시금 느꼈다. 앞으로도 더 다양한 문제를 풀어보면서, 포인터를 다루는 감각을 익히는 게 중요할 것 같다.

## 참고 자료

- [그로킹 알고리즘](https://product.kyobobook.co.kr/detail/S000215063380)
- [Math.floor() - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
