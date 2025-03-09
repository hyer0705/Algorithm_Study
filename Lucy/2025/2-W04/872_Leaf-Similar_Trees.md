# 872. Leaf Similar Trees

## 문제 정보

- URL: [872. Leaf Similar Trees 보러가기](https://leetcode.com/problems/leaf-similar-trees/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Easy
- TOPICS: Tree, DFS, Binary Tree

## 문제 접근

이 문제는 두 개의 이진 트리를 순회하여 리프 노드의 값을 비교하는 문제이다.

DFS를 사용하여 트리를 순회하면서 리프 노드를 찾아 배열에 저장하는 방식으로 접근했다. 이후, 각 트리의 리프 노드 배열을 문자열로 변환하여 비교함으로써 두 트리가 리프 유사(leaf-similar)한지 판단했다.

1. 변수 생성 및 초기화

- nodes: 리프 노드의 값을 저장할 배열

```typescript
let nodes: number[] = [];
```

2. traverse(node: TreeNode | null) 함수 정의

- DFS 방식으로 트리를 순회
- 왼쪽과 오른쪽 자식이 없는 경우(리프 노드인 경우), 배열에 값을 저장
  - node가 null인 경우 return 1을 하여 비어 있음을 확인
  - 지금 생각해보면 `node.left === null && node.right === null` 조건을 사용해도 가능했을 것 같다.

```typescript
const traverse = (node: TreeNode | null) => {
  if (!node) return 1;

  const left = traverse(node.left);
  const right = traverse(node.right);

  if (left === 1 && right === 1) nodes.push(node.val);
};
```

3. 두개의 트리 순회

- 첫 번째 트리를 순회한 후, 리프 노드 값을 문자열로 변환
- nodes 배열을 초기화한 후, 두 번째 트리를 동일하게 순회

```typescript
traverse(root1);
const root1Nodes: string = nodes.join(",");

nodes = [];
traverse(root2);
const root2Nodes: string = nodes.join(",");
```

4. 트리 순회 후, leaf 노드 비교 값 반환

```typescript
return root1Nodes === root2Nodes;
```

## 문제 회고

이번 문제는 **DFS(깊이 우선 탐색)**을 활용하여 두 개의 이진 트리의 리프 노드 값이 같은 순서로 나열되는지 확인하는 문제였다. 처음에는 리프 노드를 어떻게 찾아야 할지 고민했다. 트리를 순회하면서 왼쪽, 오른쪽 자식이 모두 없는 경우 해당 노드를 리프 노드로 판단하면 된다는 점을 알아냈다. 트리의 모든 노드를 탐색해야 하므로 **DFS(재귀 호출)**을 사용하여 탐색을 수행했다. 각 노드를 방문할 때, 리프 노드라면 배열에 값을 저장하도록 구현했다. 두 배열이 동일한지 비교하기 위해 Array.prototype.join()을 활용하여 문자열로 변환 후 비교했다.

문제를 풀면서 어렵게 느껴졌던 점은 재귀 함수의 매개변수를 어떻게 설정해야 할지 고민이 필요했다. 트리를 순회하면서 현재 노드의 상태를 어떻게 전달할지에 대한 감이 부족했다. 더 많은 재귀 문제를 풀어봐야 재귀 호출 시 필요한 매개변수를 직관적으로 떠올릴 수 있을 것 같다.

재귀 문제는 여전히 어렵게 느껴져 다양한 문제를 접하면서 반복적으로 연습해야겠다.

## 참고 자료

- [Array.prototype.join() - MDN Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
