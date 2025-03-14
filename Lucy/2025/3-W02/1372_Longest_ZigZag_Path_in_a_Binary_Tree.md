# 1372. Longest ZigZag Path in a Binary Tree

# 문제 정보

- URL: [1372. Longest ZigZag Path in a Binary Tree 문제 풀러가기](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Dynamic Programming, Tree, Depth-First Search, Binary Tree

# 문제 회고

문제를 처음 접했을 때, 이진트리를 **DFS (깊이 우선 탐색)**를 사용해 순회하면 되겠다고 생각했다.

하지만 재귀 함수를 작성하면서 어떤 파라미터를 넘겨줘야 할지에 대해 고민이었다. 각 경로를 탐색할 때 방향과 현재까지의 경로 길이를 파라미터로 넘겨주면 좋겠다고 생각했다. 예를 들어, 현재 방향(왼쪽 또는 오른쪽)을 나타내는 currentDirection 파라미터를 넘겨주면, 그에 맞는 처리를 할 수 있지 않을까?

재귀 함수에서는 두 가지를 고려했다:

1. 같은 방향으로 계속 간다면 경로를 초기화하지 않고, 경로 길이를 currentPathLength + 1로 늘리기.
2. 방향이 바뀐다면 경로 길이를 0으로 초기화하고 새로운 경로를 시작하기.

또한, node가 null일 때는 경로를 더 이상 진행할 수 없으므로 currentPathLength를 반환하면서 재귀를 종료했다.

# 문제 접근

1. 예외 처리

```typescript
if (root === null) return 0;
if (root.left === null && root.right === null) return 0;
```

- root가 null인 경우: 트리가 비어있으므로 0을 반환
- root가 존재하지만 자식 노드가 없을 경우: 자식 노드가 없으면 ZigZag 경로를 만들 수 없으므로 0을 반환

2. DFS로 트리 순회

트리를 탐색하는 dfs() 함수를 정의

이 함수는 트리에서 ZigZag 경로의 길이를 찾기 위해 사용된다.

```typescript
const dfs = (node: TreeNode | null, currentPathLength: number, currentDirection: "l" | "r"): number => {
  if (node === null) return currentPathLength;

  if (currentDirection === "l") {
    return Math.max(dfs(node.left, 0, "l"), dfs(node.right, currentPathLength + 1, "r"));
  }

  return Math.max(dfs(node.left, currentPathLength + 1, "l"), dfs(node.right, 0, "r"));
};
```

- 파라미터 설명:

  - node: 현재 순회 중인 노드
  - currentPathLength: 현재까지의 ZigZag 경로 길이
  - currentDirection: 현재 진행 방향
    - 'l': 왼쪽 방향으로 진행
    - 'r': 오른쪽 방향으로 진행

- 기본 종료 조건:
  - node가 null일 경우, 더 이상 진행할 수 없으므로 **현재까지의 경로 길이(currentPathLength)**를 반환

```typescript
if (node === null) return currentPathLength;
```

- 현재 방향이 'l'일 때:
  - 왼쪽 자식 노드로 진행할 경우, 경로 길이는 0으로 초기화하고 dfs()를 호출하여 새로운 경로를 시작
  - 오른쪽 자식 노드로 진행할 경우, 경로 길이를 currentPathLength + 1로 늘리고 진행

```typescript
if (currentDirection === "l") {
  return Math.max(dfs(node.left, 0, "l"), dfs(node.right, currentPathLength + 1, "r"));
}
```

- 현재 방향이 'r'일 때:
  - 왼쪽 자식 노드로 진행할 경우, 경로 길이를 currentPathLength + 1로 늘리고 진행
  - 오른쪽 자식 노드로 진행할 경우, 경로 길이를 0으로 초기화하고 새로운 ZigZag 경로를 시작

```typescript
return Math.max(dfs(node.left, currentPathLength + 1, "l"), dfs(node.right, 0, "r"));
```

3. 결과 반환

최종적으로 트리의 루트 노드에서 왼쪽 및 오른쪽 자식 노드를 각각 시작점으로 하여 가장 긴 ZigZag 경로를 구한 뒤 반환

```typescript
return Math.max(dfs(root.left, 0, "l"), dfs(root.right, 0, "r"));
```

### 그림 설명

그림으로 설명하는게 이해가 더 쉬울 것 같아 그림 첨부합니다.

![Image](https://github.com/user-attachments/assets/13b8725c-748d-46aa-b084-01d1a215a8ff)

# 참고 자료
