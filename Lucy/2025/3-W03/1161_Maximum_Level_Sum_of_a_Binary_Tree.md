# 1161. Maximum Level Sum of a Binary Tree

## 문제 정보

- URL: [1161. Maximum Level Sum of a Binary Tree 문제 풀러 가기](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPCIS: Tree, Depth-Search First, Breadth-Search First, Binary Tree

## 문제 회고

BFS를 사용하여 트리를 순회할 때, 큐(Queue) 에 [노드, 레벨]을 저장하면서 같은 레벨의 노드 합을 구하는 방식으로 접근했다. JavaScript에는 내장 Queue 자료구조가 없어서 배열(Array)로 큐를 구현했는데, 여기서 shift()를 사용할지 고민했다. 하지만 shift()는 O(n)의 시간 복잡도를 가지므로, 포인터(front)를 사용하여 큐의 시작 지점을 관리하는 방식을 선택했다.

트리를 순회하며 각 레벨의 합을 levelSums 배열에 저장하고, 탐색이 끝난 후 최댓값을 가지는 레벨을 찾았다. 이렇게 풀었을 때 실행 속도는 8ms가 나왔다. 많은 사람들이 풀이한 방식보다 속도가 느려 해당 풀이를 참고하여 다시 풀어보았다.

다른 풀이를 보니 BFS로 트리를 순회하는 것은 동일했지만, 나는 반복문 2개를 사용하여 모든 레벨의 합을 구한 후 최댓값을 찾는 방식을 사용했다. 반면, 다른 풀이에서는 반복문 1개를 사용하여 탐색하면서 바로 최댓값을 찾는 방식을 활용하고 있었다.

처음 풀이를 할 때, 반복문 1개로 해결할 수 있지 않을까? 하는 고민이 들었지만, 우선 떠오른 방식(반복문 2개 사용)을 그대로 진행했다. 다음부터는 최댓값이나 최솟값을 구하는 문제에서 불필요한 저장 없이, 한 번의 탐색으로 해결할 수 있는 방법을 먼저 고려해야겠다.

## 문제 접근

이 문제는 트리의 각 레벨별 노드 값의 합을 계산하고, 합이 가장 큰 레벨을 반환하는 문제이다. 트리를 순회하며 각 레벨의 합을 저장한 후, 최댓값을 가진 레벨을 찾아야 한다.

### 첫 번째 풀이: BFS + 포인터 + 각 level의 합 모두 구한 후 레벨 도출

- 풀이 방법:
  1. BFS(너비 우선 탐색) 을 사용하여 트리를 순회
  2. 각 노드의 값을 해당 레벨의 합에 더해 저장
  3. 탐색이 끝난 후, 가장 큰 합을 가진 레벨을 찾기

#### 변수 초기화 및 BFS 탐색 준비

- queue: BFS를 위한 큐를 배열로 구현. [노드, 해당 노드의 레벨]을 저장한다.
- front: 큐에서 현재 탐색 중인 요소의 위치를 가리키는 포인터.
- levelSums: 각 레벨의 합을 저장하는 배열로, levelSums[i]는 i번째 레벨의 합을 의미한다.

```typescript
const queue: [TreeNode | null, number][] = [];
queue.push([root, 0]);

let front = 0;

const levelSums: number[] = [];
```

#### BFS로 트리 순회하며 레벨별 합 구하기

- BFS 탐색 진행: queue에서 요소를 하나씩 꺼내면서, 해당 노드의 값을 현재 레벨의 합에 더함
- levelSums[level]이 아직 존재하지 않으면 초기값(0)을 추가
- 자식 노드가 존재하면 해당 노드를 큐에 추가하며 레벨을 1 증가시킴

```typescript
while (front < queue.length) {
  const [node, level] = queue[front++];

  if (!node) continue;

  if (level <= levelSums.length && !levelSums[level]) levelSums.push(0);

  levelSums[level] += node.val;

  if (node.left) queue.push([node.left, level + 1]);
  if (node.right) queue.push([node.right, level + 1]);
}
```

#### 최대 레벨 합을 가지는 최소 레벨 찾기

- Math.max(...levelSums): 가장 큰 합을 찾음
- for 문을 사용하여 최대 합을 가진 가장 작은 레벨을 찾고 반환
- 레벨은 1부터 시작하므로 i + 1을 반환

```typescript
const maxSum = Math.max(...levelSums);
for (let i = 0; i < levelSums.length; i++) {
  const currentSums = levelSums[i];
  if (maxSum === currentSums) return i + 1;
}

return -1;
```

### 두 번째 풀이: BFS + level 한 번에 찾기

- 풀이 방법:
  1. BFS(너비 우선 탐색) 을 사용하여 레벨별 노드의 합을 계산
  2. 한 번의 BFS 순회로 최대 합과 그에 해당하는 최소 레벨을 찾음

#### 변수 초기화 및 BFS 탐색 준비

- queue: 현재 탐색할 노드를 저장하는 배열(큐 역할)
- maxSum: 현재까지 발견한 최대 레벨 합 (초기값: -Infinity → 어떤 값이든 처음 비교에서 갱신되도록)
- minLevel: 최대 합을 가진 최소 레벨을 저장하는 변수
- level: 현재 탐색 중인 레벨을 나타내는 변수

```typescript
let queue = [root];

let maxSum = -Infinity;
let minLevel = 0;
let level = 0;
```

#### BFS 탐색을 통해 각 레벨의 합 계산

- 이 코드의 핵심 로직:
  - 현재 레벨의 모든 노드를 탐색하면서 값을 더함
  - 자식 노드를 tempQueue에 저장하여 다음 레벨에서 탐색할 수 있도록 함
  - 현재 레벨의 합(sum)이 기존 maxSum보다 크다면 갱신

```typescript
while (queue.length) {
  const tempQueue: TreeNode[] = [];
  let sum = 0;

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];

    if (node.left) tempQueue.push(node.left);
    if (node.right) tempQueue.push(node.right);

    sum += node.val;
  }

  queue = tempQueue;
  level++;

  if (sum > maxSum) {
    maxSum = sum;
    minLevel = level;
  }
}
```

#### 최대 합을 가진 최소 레벨 반환

- 최종적으로 최대 합을 가진 최소 레벨(minLevel)을 반환

```typescript
return minLevel;
```

## 참고 자료
