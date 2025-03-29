# 328. Odd Even Linked List

## 문제 정보

- URL: https://leetcode.com/problems/odd-even-linked-list/description/?envType=study-plan-v2&envId=leetcode-75
- LEVEL: Medium
- TOPICS: Linked List

## 문제 접근

이 문제는 연결 리스트에서 홀수 인덱스와 짝수 인덱스 노드를 각각 그룹화하여 정렬한 후 반환하는 문제였다.

먼저, 홀수 인덱스 노드와 짝수 인덱스 노드를 각각 가리킬 두 개의 연결 리스트(odd, even)를 만들었다. oddNode와 evenNode는 각각 odd와 even 연결 리스트의 마지막 노드를 가리키는 변수로 사용했다. index는 현재 노드가 홀수 인덱스인지 짝수 인덱스인지를 판별했다.

```typescript
let index = 0;

const odd = new ListNode(-1);
let oddNode = odd;

const even = new ListNode(-1);
let evenNode = even;
```

while문을 통해 연결 리스트를 순차적으로 순회하면서,

- index가 짝수일 경우, evenNode.next에 현재 노드의 값을 담아 새로운 노드를 생성하고 evenNode를 새로 생성한 노드로 갱신했다.
- index가 홀수일 경우, oddNode.next에 현재 노드의 값을 담아 새로운 노드를 생성하고 oddNode를 새로 생성한 노드로 갱신했다.

```typescript
let node: ListNode | null = head;
while (node) {
  if (index % 2 === 0) {
    evenNode.next = new ListNode(node.val);
    evenNode = evenNode.next;
  } else {
    oddNode.next = new ListNode(node.val);
    oddNode = oddNode.next;
  }

  index++;
  node = node.next;
}
```

순회가 끝난 후, evenNode.next(even 연결 리스트의 마지막 노드의 next 포인터)에 odd 리스트의 첫 번째 노드를 연결해주고, even 리스트를 반환하여 문제를 해결했다.

```typescript
evenNode.next = odd.next;

return even.next;
```

## 문제 회고

이번 문제는 연결 리스트에서 홀수 인덱스를 가진 노드들과 짝수 인덱스를 가진 노드들을 각각 그룹화하여 정렬하는 문제였다. 문제의 개념은 이해했지만, 가장 큰 고민은 홀수 인덱스 노드와 짝수 인덱스 노드를 각각 어디에 저장할지였다.

연결 리스트를 순회하면서, 하나의 연결 리스트 변수만을 사용하는 방법을 응용하여 해결했다. 홀수 인덱스 노드들을 저장할 연결 리스트와 짝수 인덱스 노드들을 저장할 또 다른 연결 리스트를 각각 만들었다. 그 후, 두 리스트를 합쳐서 문제를 풀었다.

이 문제를 풀면서 포인터 개념에 대한 이해가 점차 깊어지는 것을 느꼈다. 문제 자체는 그렇게 어렵지 않았지만, 연결 리스트 유형의 문제를 풀어가며 점점 더 재미를 느꼈다.

## 참고 자료

```

```
