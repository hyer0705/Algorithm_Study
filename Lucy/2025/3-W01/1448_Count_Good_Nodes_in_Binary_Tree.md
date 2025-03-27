# 1448. Count Good Nodes in Binary Tree

## 문제 정보

- URL: [1448. Count Good Nodes in Binary Tree 풀어보기](https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Tree, Depth-First Search, Breadth-First Search, Binary Tree

## 문제 회고

처음에는 각 노드를 루트 노드와만 비교했기 때문에 일부 테스트 케이스를 통과하지 못했다. 하지만 경로 상에서 이전까지의 최댓값을 유지하며 비교해야 한다는 점을 깨달았다. 즉, 어떤 노드가 Good Node가 되려면, 루트에서 해당 노드까지의 경로에서 가장 큰 값보다 크거나 같아야 한다.

이 기준을 코드에 반영하는 방법을 고민하다가, 다른 풀이를 참고하면서 재귀 함수의 파라미터로 현재까지의 최댓값을 전달하는 방식을 알게 되었다. 이렇게 하면 각 노드에서 "현재까지의 최댓값"과 비교하여 Good Node 여부를 판단할 수 있었다.

이번 문제를 풀면서 재귀 함수의 파라미터를 어떻게 설정해야 하는지에 대한 감각이 부족하다는 점을 느꼈다. 앞으로는 재귀를 사용할 때, 문제 해결에 필요한 추가적인 상태(state)를 파라미터로 전달하는 연습을 더 해봐야겠다.

## 문제 접근

1. 예외 처리

트리가 null인 경우, 탐색할 노드가 없으므로 Good Node의 개수는 0이 되어야 한다.

```typescript
if (!root) return 0;
```

2. 트리 순회 함수 traverse() 정의

트리를 순회하며 Good Node의 개수를 세기 위해 traverse() 함수를 정의한다.

- traverse() 함수의 역할
  - 현재 노드가 Good Node인지 판단
  - 현재까지 탐색한 경로에서 최댓값을 업데이트
  - 왼쪽, 오른쪽 자식 노드로 재귀 호출
- traverse() 함수의 파라미터
  - node: 현재 탐색 중인 노드
  - currentMaxValue: 루트에서 현재 노드까지의 경로 중 최댓값
- 동작 과정
  - 노드가 null이면 탐색 종료
  - 현재 노드의 값이 currentMaxValue보다 크거나 같으면 Good Node이므로 Good Node 갯수를 저장하는 변수 answer 1 증가
  - 현재 노드 값과 currentMaxValue를 비교하여 새로운 최댓값을 newMaxValue로 설정
  - 왼쪽과 오른쪽 자식 노드를 재귀적으로 탐색

```typescript
const traverse = (node: TreeNode | null, currentMaxValue: number): void => {
  if (!node) return;

  if (node.val >= currentMaxValue) {
    answer++;
  }

  const newMaxValue = Math.max(currentMaxValue, node.val);

  traverse(node.left, newMaxValue);
  traverse(node.right, newMaxValue);
};
```

3. Good Node 개수를 저장할 answer 변수 선언 및 초기화

```typescript
let answer = 0;
```

4. 트리 순회 시작

루트 노드에서 탐색을 시작하며, 초기 currentMaxValue는 루트 노드의 값으로 설정한다.

```typescript
traverse(root, root.val);
```

5. 결과 반환

탐색이 끝난 후 Good Node의 갯수를 저장하고 있는 answer 변수 반환한다.

```typescript
return answer;
```

## 참고 자료

- [핵심 로직 참고 자료: ✔️C++ | Python | C🔥97% DFS✅Detailed graph explantion | Beginner-friendly | Easy to understand ^\_^](https://leetcode.com/problems/count-good-nodes-in-binary-tree/solutions/2512547/c-python-c-97-dfs-detailed-graph-explantion-beginner-friendly-easy-to-understand/?envType=study-plan-v2&envId=leetcode-75)
