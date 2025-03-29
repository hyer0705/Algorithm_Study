# 206. Reverse Linked List

## 문제 정보

- URL: https://leetcode.com/problems/reverse-linked-list/description/?envType=study-plan-v2&envId=leetcode-75
- LEVEL: Easy
- TOPICS: Linked List, Recursion

## 문제 접근

### 첫 번째 풀이: 배열을 이용한 접근

링크드 리스트를 순회하며 값을 배열에 저장한 후, 배열을 뒤집고 새로운 링크드 리스트를 생성하는 방식이다.

0. 예외 처리

- 입력으로 주어진 head가 null이면, 빈 리스트이므로 null을 반환한다.

```typescript
if (!head) return null;
```

1. 변수 생성 및 초기화

- nodes: 노드 값을 저장할 배열
- currentNode: 링크드 리스트를 순회할 때, 현재 노드를 가리키는 포인터

```typescript
const nodes = [];
let currentNode = head;
```

2. 링크드 리스트를 순회하며 노드 값을 배열에 저장

```typescript
while (currentNode) {
  nodes.push(currentNode.val);
  currentNode = currentNode.next;
}
```

3. nodes 배열을 뒤집음

```typescript
nodes.reverse();
```

4. 뒤집힌 배열을 기반으로 새로운 링크드 리스트 생성

```typescript
const reversed = new ListNode(nodes[0]);
currentNode = reversed;

for (let i = 1; i < nodes.length; i++) {
  currentNode.next = new ListNode(nodes[i]);
  currentNode = currentNode.next;
}
```

5. 새롭게 생성한 역순 리스트 반환

```typescript
return reversed;
```

### 두 번째 풀이: 링크드 리스트의 포인터를 직접 조작하는 접근

링크드 리스트의 포인터를 직접 변경하여 역순으로 만든다.

1. 변수 생성 및 초기화

- current: 현재 노드를 가리키는 포인터
- prev: 이전 노드를 가리키는 포인터(초기값 null)

```typescript
let current = head;
let prev = null;
```

2. 리스트를 순회하며 연결 방향을 반대로 변경

- next 변수에 다음 노드를 저장
- 현재 노드의 next를 prev로 변경하여 연결 방향을 뒤집음
- prev를 현재 노드로 변경
- current를 다음 노드로 변경

```typescript
while (current) {
  const next = current.next; // 다음 노드를 저장
  current.next = prev; // 현재 노드의 방향을 뒤집음
  prev = current; // prev를 현재 노드로 변경
  current = next; // current를 다음 노드로 이동
}
```

3. 역순으로 변환된 리스트의 head 반환

```typescript
return prev;
```

## 문제 회고

처음에는 배열을 활용해 쉽게 해결할 수 있다고 생각했다. 노드의 값을 차례로 배열에 저장한 뒤, 배열을 뒤집어 다시 연결 리스트를 만들면 된다고 판단했다. 하지만 이 방법은 시간과 공간 복잡도가 상대적으로 높았고, 다른 사람들의 풀이에 비해 실행 속도가 많이 느렸다.

다른 접근법을 살펴보니, 링크드 리스트의 특징을 활용하면 추가적인 배열 없이도 문제를 해결할 수 있다는 걸 알게 되었다. 노드들의 연결을 직접 변경하며 리스트를 역순으로 만드는 방식이 더 효율적이었다. 이를 통해 링크드 리스트를 다루는 기본적인 조작법과 역순 변환 기법을 익힐 수 있었다. 이 문제를 통해 링크드 리스트의 구조적 특성과 장점을 더 깊이 이해하게 되었다.

## 참고 자료

- [Step By Step Explained with Images. Easiest to understand. Java, C++, Python, JavaScript, Go Codes](https://leetcode.com/problems/reverse-linked-list/solutions/5612752/step-by-step-explained-with-images-easiest-to-understand-java-c-python-javascript-go-codes/?envType=study-plan-v2&envId=leetcode-75)
- [Array.prototype.reverse() - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
