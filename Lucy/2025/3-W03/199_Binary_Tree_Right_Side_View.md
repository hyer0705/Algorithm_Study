# 199. Binary Tree Right Side View

## 문제 정보

- URL: [199. Binary Tree Right Side View 문제 풀러가기](https://leetcode.com/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Tree, Depth-First Search, Breadth-First Search, Binary Tree

## 문제 회고

이 문제는 이진 트리의 오른쪽에서 보이는 노드들을 찾는 문제였다. 처음에는 BFS(너비 우선 탐색) 을 사용해 트리를 순회하면서 각 깊이에서 가장 오른쪽에 있는 노드를 어떻게 찾을지 고민했다.

그러다가 "각 깊이(depth)에서 가장 오른쪽에 있는 노드 하나만 알면 된다!" 는 아이디어가 떠올랐다. 그래서 sideNodes라는 1차원 배열을 만들고, `인덱스 = 깊이(depth)`로 생각하면 되지 않을까? 라는 방식으로 접근했다. 정답이었지만 더 빠른 풀이가 있었다.

다른 풀이를 찾아보니 DFS(깊이 우선 탐색)을 이용한 방식이 훨씬 빠르게 동작했다.

하지만 BFS 방식도 최적화할 방법이 있지 않을까? 하는 생각이 들어 ChatGPT를 활용해 성능 개선 방법을 탐구했다.

내 기존 BFS 풀이에서는 배열(queue)을 사용하고 Array.prototype.shift()를 이용해 노드를 꺼냈다. 그런데 이 연산은 O(n) 의 시간 복잡도를 가지므로 트리의 노드 개수가 많아질수록 비효율적이었다.

이를 개선하기 위해 포인터를 활용한 큐(Queue)를 직접 구현하여 shift() 없이 O(1) 시간 복잡도로 dequeue 연산을 수행하도록 변경했다. 이 방식으로 최적화한 결과 0ms로 통과하는 풀이를 만들 수 있었다.

## 문제 접근

### 첫 번째 풀이: BFS(Breadth-First Search)

너비 우선 탐색(BFS) 을 사용해 트리를 탐색하면서 각 깊이(depth)에서 가장 오른쪽에 위치한 노드를 저장하는 방식을 사용했다.

#### 변수 생성 및 초기화

- sideNodes: 깊이(depth)를 인덱스로 사용하여, 해당 깊이에서 가장 오른쪽에 있는 노드를 저장하는 배열. 제한 사항에서 트리의 노드 수는 0에서 100개 라고 했기에 깊이를 최대 100으로 생각.
- queue: BFS 탐색을 위한 큐. [트리 노드, 깊이] 형태로 저장.

```typescript
const sideNodes: (TreeNode | null)[] = new Array(100).fill(null);

const queue: [TreeNode | null, number][] = [];
queue.push([root, 0]); // [node, depth]
```

#### BFS로 트리 순회

- queue.shift()를 사용해 큐에서 요소를 꺼냄
- 현재 깊이(depth)에서 가장 마지막으로 방문한 노드가 오른쪽에서 보이는 노드이므로 sideNodes[depth]에 저장
- 왼쪽, 오른쪽 자식 노드를 순서대로 큐에 삽입하여 BFS 탐색 진행

```typescript
while (queue.length > 0) {
  const [node, depth] = queue.shift();

  if (!node) continue;

  sideNodes[depth] = node;

  if (node.left) queue.push([node.left, depth + 1]);
  if (node.right) queue.push([node.right, depth + 1]);
}
```

#### 결과 반환

- sideNodes 배열에서 null이 아닌 요소만 필터링
- TreeNode 객체에서 값(val)만 추출하여 결과 배열 생성

```typescript
const answer: number[] = sideNodes.filter((node) => node).map((node) => node.val);

return answer;
```

### 두 번째 풀이: DFS(Depth-First Search)(모범답안)

깊이 우선 탐색(DFS) 을 사용하여 트리를 순회하면서 각 깊이에서 가장 오른쪽에 있는 노드의 값을 저장하는 방식으로 풀이했다.

#### 변수 생성 및 초기화

- answer: 각 깊이에서 오른쪽에서 보이는 노드의 값을 저장하는 배열

```typescript
const answer: number[] = [];
```

### DFS 함수 정의 및 탐색 로직

- node: 현재 탐색 중인 노드
- depth: 현재 노드의 깊이
- answer: 각 깊이에서 오른쪽에서 보이는 노드의 값을 저장하는 배열

#### 탐색 흐름

1. answer.length <= depth이면 해당 깊이는 처음 방문하는 것이므로 answer에 추가
2. answer[depth] = node.val을 갱신 → DFS의 순서에 따라 마지막으로 방문한 노드가 오른쪽에서 보이는 노드
3. 왼쪽 노드 → 오른쪽 노드 순서로 재귀 호출

```typescript
const dfs = (node: TreeNode, depth: number, answer: number[]) => {
  if (!node) return;

  if (answer.length <= depth) answer.push(node.val);

  answer[depth] = node.val;

  dfs(node.left, depth + 1, answer);
  dfs(node.right, depth + 1, answer);
};
```

### dfs() 함수를 사용하여 DFS로 트리 순회 및 결과 반환

- dfs(root, 0, answer)를 호출하여 DFS 탐색 시작
- answer 배열을 반환하여 오른쪽에서 보이는 노드들의 값을 반환

```typescript
dfs(root, 0, answer);

return answer;
```

### 세 번째 풀이: BFS(Breadth-First Search) + 포인터

이 방법은 BFS(너비 우선 탐색) 을 사용하여 트리를 순회하면서 각 깊이에서 가장 오른쪽에 있는 노드의 값을 저장하는 방식이다. 이전 BFS 풀이에서 포인터(front)를 활용하여 큐의 앞 요소를 추출하는 방식으로 성능을 개선했다.

#### 변수 생성 및 초기화

- queue: 탐색할 노드와 깊이 정보를 저장하는 BFS용 큐
- front: 큐에서 값을 꺼낼 때 사용되는 포인터
- answer: 각 깊이에서 가장 오른쪽에 보이는 노드의 값을 저장하는 배열

```typescript
const queue: [TreeNode | null, number][] = [];
queue.push([root, 0]); // [노드, 깊이]

let front = 0; // 큐의 가장 앞자리를 가리키는 포인터

const answer: number[] = [];
```

### BFS로 트리 순회

#### 탐색 흐름

1. front 포인터를 사용해 큐에서 [node, depth]를 가져온다.
2. 노드가 null이면 건너뛴다.
3. 해당 depth가 answer에 처음 추가되는 경우, node.val을 저장한다.
4. 이후 depth의 값을 node.val로 갱신 → 마지막으로 방문한 노드가 오른쪽에서 보이는 노드
5. 왼쪽 자식 노드 → 오른쪽 자식 노드 순서로 큐에 삽입

```typescript
while (front < queue.length) {
  const [node, depth] = queue[front++];

  if (!node) continue;

  if (answer.length <= depth) answer.push(node.val);

  answer[depth] = node.val;

  if (node.left) queue.push([node.left, depth + 1]);
  if (node.right) queue.push([node.right, depth + 1]);
}
```

### 결과 반환

BFS 탐색을 완료한 후, answer 배열을 반환하여 오른쪽에서 보이는 노드들의 값을 얻는다.

```typescript
return answer;
```

## 참고 자료

- [[자료구조] Tree: 정의 및 depth와 height 구하기 | qkrgusdk's Tistory](https://hellooworld.tistory.com/28)
