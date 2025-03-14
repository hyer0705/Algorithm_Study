# 236. Lowest Common Ancestor of a Binary Tree

## 문제 정보

- URL: [236. Lowest Common Ancestor of a Binary Tree 문제 풀러가기](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Tree, Depth-First Search, Binary Tree

## 문제 회고

처음 문제를 읽었을 때, Lowest Common Ancestor (LCA) 개념이 생소해서 이해하기 어려웠다. 문제와 위키피디아 설명을 읽어도 이해하기 어려워 ChatGPT에 쉽게 설명해 달라고 요청했다. 덕분에 개념을 정리할 수 있었다. 핵심은 두 노드 p, q의 조상 중에서 가장 깊이 있는 (즉, p와 q에 가장 가까운) 공통 조상을 찾는 문제라는 것이었다.

조상 노드를 어떻게 찾을지 고민하다가, GeeksforGeeks에서 루트 노드부터 특정 노드까지의 경로를 출력하는 함수에 대한 글을 발견했다. 이를 응용해서 p와 q의 조상 노드 리스트를 구한 후, JavaScript의 filter(), includes(), at() 메서드를 활용해 가장 깊은 공통 조상(LCA)을 찾는 방식으로 풀이를 완성했다.

정답은 맞췄지만, 속도가 느린 편이었다. 그래서 더 효율적인 풀이를 찾아봤는데, 생각보다 코드가 간단했다. 트리를 순회하면서 p와 q를 찾을 때, 해당 노드의 부모 노드가 LCA인지 확인하는 방식이었다.

이런 문제를 꾸준히 풀다 보면, 나도 저렇게 깔끔하고 효율적인 풀이를 바로 떠올릴 수 있을까? 🤔

## 문제 접근

### 첫 번째 풀이: 모든 조상 노드를 찾아서 LCA를 구하는 방식

이 방법은 각 노드의 조상 노드 리스트를 구한 뒤, 두 리스트에서 가장 마지막으로 겹치는 노드(LCA)를 찾는 방식이다.

1. DFS로 조상 노드 찾기

- 특정 노드까지 가는 경로(조상 노드 리스트)를 찾기 위해 dfs() 함수를 정의한다.
- 이 함수는 재귀적으로 탐색하며, target 노드를 찾을 때까지 경로를 저장한다.
- target을 찾으면 true를 반환하고, 찾지 못하면 스택에서 해당 노드를 제거하며 백트래킹한다.

```typescript
const dfs = (node: TreeNode | null, target: TreeNode | null, ancestors: TreeNode[]): boolean => {
  if (node === null) return false;

  ancestors.push(node);

  if (node.val === target.val) return true;

  if (dfs(node.left, target, ancestors) || dfs(node.right, target, ancestors)) return true;

  ancestors.pop();

  return false;
};
```

2. 각 노드의 조상 리스트 구하기

- p와 q 각각의 조상 리스트를 저장할 배열을 선언한 후, dfs()를 호출해 채운다.

```typescript
const pAncestors: TreeNode[] = [];
const qAncestors: TreeNode[] = [];

dfs(root, p, pAncestors);
dfs(root, q, qAncestors);
```

3. LCA 찾기

- pAncestors와 qAncestors에서 공통 조상을 찾아 가장 마지막(가장 깊은) 노드를 반환한다.

```typescript
const commonAncestor: TreeNode | null = pAncestors.filter((ancestor) => qAncestors.includes(ancestor)).at(-1);

return commonAncestor;
```

### 두 번째 풀이: 재귀 탐색을 통한 LCA 찾기

이 방법은 트리를 순회하면서 LCA를 직접 찾는 방식이다.

1. 예외 처리 (기저 사례)

- root가 null이면 탐색을 종료한다.
- root가 p 또는 q라면, root가 LCA가 될 가능성이 있으므로 그대로 반환한다.

```typescript
if (!root || root === p || root === q) return root;
```

2. 왼쪽과 오른쪽 서브트리 탐색

- 왼쪽과 오른쪽 서브트리를 재귀적으로 탐색하여 p와 q를 찾는다.

```typescript
const left = lowestCommonAncestor(root.left, p, q);
const right = lowestCommonAncestor(root.right, p, q);
```

3. LCA 판별

- 만약 left와 right에서 각각 p와 q를 찾았다면, 현재 노드(root)가 공통 조상이다.

```typescript
if (left && right) return root;
```

- left 또는 right 중 하나에서만 p 혹은 q를 찾은 경우, 그 노드가 LCA가 된다.

```typescript
return left || right;
```

## 참고 자료

- [Print path from root to a given node in a binary tree | GeeksforGeeks](https://www.geeksforgeeks.org/print-path-root-given-node-binary-tree/)
