# 104. Maximum Depth of Binary Tree

## 문제 정보

- URL: [104. Maximum Depth of Binary Tree 보러가기](https://leetcode.com/problems/maximum-depth-of-binary-tree/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Easy
- TOPICS: Tree, DFS, BFS, Binary Tree

## 문제 접근

이 문제는 이진 트리의 최대 깊이를 구하는 문제로, **깊이 우선 탐색(DFS, Depth-First Search)**을 활용하여 해결할 수 있었다. 재귀를 사용하여 트리를 순회하며 리프 노드까지의 최대 깊이를 찾는 방식으로 접근했다.

### DFS(깊이 우선 탐색, Depth First Search)란?

- **DFS(Depth-First Search)**는 트리나 그래프를 탐색하는 대표적인 방법 중 하나이다.
- 이름 그대로 최대한 깊이 내려가면서 탐색을 진행한 후, 더 이상 탐색할 곳이 없으면 다시 뒤로 돌아가며(백트래킹) 다른 경로를 탐색한다.

- DFS는 **재귀(recursion)** 또는 **스택(stack)**을 활용하여 구현할 수 있다.
- 이진 트리에서는 재귀 호출을 사용하는 것이 일반적이다.

### DFS를 사용하여 이진 트리 순회하는 방법

이진 트리를 DFS로 탐색하는 방법에는 세 가지 순회 방식이 있다. 각 방법은 노드 방문 순서가 다르다.

1. 전위 순회(Pre-order): Root → Left → Right

먼저 루트 노드를 방문한 후, 왼쪽 자식 노드 → 오른쪽 자식 노드 순서로 방문합니다.

#### 예시

![트리](https://media.geeksforgeeks.org/wp-content/cdn-uploads/2009/06/tree12.gif)

- 순회: 1 > 2 > 4 > 5 > 3

2. 중위 순회(In-order): Left → Root → Right

왼쪽 자식 노드를 먼저 방문한 후, 루트 노드 → 오른쪽 자식 노드 순서로 방문합니다.

#### 예시

![트리](https://media.geeksforgeeks.org/wp-content/cdn-uploads/2009/06/tree12.gif)

- 순회: 4 > 2 > 5 > 1 > 3

3. 후위 순회(Post-order): Left → Right → Root

왼쪽 자식 노드 → 오른쪽 자식 노드를 먼저 방문한 후, 마지막에 루트 노드를 방문합니다.

#### 예시

![트리](https://media.geeksforgeeks.org/wp-content/cdn-uploads/2009/06/tree12.gif)

- 순회: 4 > 5 > 2 > 3 > 1

### 문제 풀이 설명

1. 변수 생성 및 초기화

- answer: 트리의 최대 깊이를 저장하는 변수로, 초기값은 0입니다.

```typescript
let answer = 0;
```

2. traverse() 함수 정의

- traverse() 함수를 사용하여 트리를 순회 및 깊이를 계산한다.
- traverse(node, depth):
  - 현재 **노드(node)**와 **깊이(depth)**를 매개변수로 받습니다.
  - 노드가 null이면, 더 이상 탐색할 수 없는 리프 노드에 도달한 것이므로, 현재까지 계산된 depth 값을 answer와 비교하여 갱신합니다.
  - 그렇지 않다면 왼쪽 자식 노드와 오른쪽 자식 노드를 탐색하며 깊이를 1씩 증가시킵니다.

```typescript
const traverse = (node, depth) => {
  if (node == null) {
    answer = Math.max(answer, depth); // 최대 깊이 갱신
    return;
  }

  traverse(node.left, depth + 1); // 왼쪽 서브트리 탐색
  traverse(node.right, depth + 1); // 오른쪽 서브트리 탐색
};
```

3. 트리 탐색 시작

- 루트 노드부터 탐색을 시작합니다.
- answer를 초깃값으로 설정하여 traverse() 함수를 호출합니다.

```typescript
traverse(root, answer);
```

4. 최대 깊이 결과 반환

```typescript
return answer;
```

## 문제 회고

오랜만에 깊이 우선 탐색(DFS) 유형의 문제를 풀었다. 스택이나 재귀를 사용해야 한다는 점은 떠올렸지만, 구체적인 구현 방법이 쉽게 떠오르지 않았다.

그래서 GeeksforGeeks에서 트리를 DFS 방식으로 순회하는 방법을 다시 공부한 후 문제를 해결할 수 있었다. 이 과정에서 트리 순회 방식에는 중위 순회(In-order), 전위 순회(Pre-order), 후위 순회(Post-order) 이렇게 세 가지가 있다는 점을 다시 상기할 수 있었다.

작년에 한 번 학습했던 내용이었지만, 시간이 지나니 다시 공부해야 했다. 이 경험을 통해 알고리즘 문제를 꾸준히 연습하는 것이 중요하다는 사실을 다시금 깨달았다.

## 참고 자료

- [DFS traversal of a Tree - Geeks for Geeks](https://www.geeksforgeeks.org/dfs-traversal-of-a-tree-using-recursion/)
