# 437. Path Sum III

## 문제 정보

- URL: [437. Path Sum III 문제 풀어보기](https://leetcode.com/problems/path-sum-iii/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Tree, Depth-First Search, Binary Tree

## 문제 회고

처음에는 이전에 풀었던 1448. Count Good Nodes in Binary Tree 문제처럼 트리를 순회하는 재귀 함수의 파라미터를 활용하면 쉽게 풀 수 있을 것이라 생각했다. 그래서 루트 노드에서 현재까지 누적된 합을 currentSum이라는 파라미터로 설정하여 탐색을 진행했다.

하지만 이 방식으로는 테스트 케이스 71개 중 일부만 통과하고 나머지는 실패했다.

다른 풀이를 찾아보니 누적 합(prefix sum) 개념을 활용한 접근 방식이 있었다.

- 각 노드에서 루트까지의 누적 합을 계산한다.
- targetSum을 만들기 위해 필요한 이전 누적 합을 Map에 저장한다.
  - 현재까지의 누적 합을 SumA라고 하면, SumA - SumB = targetSum
  - 즉, SumB = SumA - targetSum이 되는 SumB가 Map에 존재한다면, 해당 노드까지의 경로 중 일부가 targetSum을 만족하는 것이다.
- 트리를 순회하면서 Map에 있는 해당 값의 개수를 카운트하여 정답을 구한다.
- Backtracking을 활용하여 탐색이 끝난 후 Map에서 해당 값을 제거해야 한다. 그렇지 않으면 다른 경로에서 동일한 누적 합이 중복 계산될 수 있기 때문이다.

이 접근 방식을 처음 접했을 때는 SumA - targetSum이 왜 기준이 되는지 이해하기 어려웠다. 하지만 ChatGPT를 통해 설명을 듣고, 결국 이전까지의 합 중 특정 값(SumB)이 존재하면 현재 노드까지의 합에서 해당 값을 빼면 targetSum이 된다는 원리를 깨달았다.

![Image](https://github.com/user-attachments/assets/14493681-f263-486f-8637-89c1e472513e)

스터디원들의 풀이를 살펴보니, 재귀 함수의 파라미터에 현재까지 방문한 노드들을 저장하는 배열을 활용하는 방식도 있었다. 이 방법으로 다시 한 번 풀어봐야겠다.

## 문제 접근

### 해시맵을 사용하여 누적 합 관리

```typescript
const prefixSumMap = new Map<number, number>();
prefixSumMap.set(0, 1);
```

- prefixSumMap: 누적 합(Prefix Sum) 개수를 저장하는 해시맵
- prefixSumMap.set(0, 1):
  - 누적 합이 0이 되는 경로가 1개 존재한다고 가정
  - sum - targetSum = 0이 되는 경우, 즉 루트에서 현재 노드까지의 경로 자체가 targetSum과 같을 때를 처리하기 위함

### dfs() 함수 정의

```typescript
const dfs = (node: TreeNode | null, currentSum: number): number => {
  if (!node) return 0;

  currentSum += node.val;
  let count = prefixSumMap.get(currentSum - targetSum) || 0;

  prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);

  count += dfs(node.left, currentSum);
  count += dfs(node.right, currentSum);

  prefixSumMap.set(currentSum, prefixSumMap.get(currentSum)! - 1);

  return count;
};
```

#### 함수 정의 및 파라미터 설명

```typescript
const dfs = (node: TreeNode | null, currentSum: number): number => {
  // ...
};
```

- dfs(): 현재 노드에서 가능한 경로 개수를 계산하는 재귀 함수
- currentSum: 루트에서 현재 노드까지의 누적 합

#### 예외 처리

```typescript
if (!node) return 0;
```

- node가 null이면 탐색 종료

#### 현재 노드에서의 경로 개수 찾기

```typescript
currentSum += node.val;
let count = prefixSumMap.get(currentSum - targetSum) || 0;
```

- 현재 노드의 값을 더해서 현재까지의 누적 합을 구함
- currentSum - targetSum이 prefixSumMap에 존재하는지 확인

  - 존재하면 해당 경로 개수만큼 count 증가
  - 존재하지 않으면 0을 반환

- why?
  - prefixSumMap에는 이전까지 나온 누적 합 값들이 저장되어 있음
  - currentSum - targetSum이 prefixSumMap에 존재한다는 것은 이전에 어떤 지점에서 targetSum 차이가 발생했다는 것을 의미
    ```plaintext
    currentSum - prefixSum = targetSum <=> prefixSum = currentSum - targetSum
    ```
  - 현재 노드에서 이전 노드까지의 어떤 경로가 targetSum을 만족하는 경우가 존재

#### 현재 누적 합을 해시맵에 추가

```typescript
prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);
```

- 현재까지의 누적 합을 prefixSumMap에 저장
- 같은 currentSum이 다시 나올 경우를 대비해 개수를 증가

#### 좌우 자식 노드 탐색(DFS 재귀 호출)

```typescript
count += dfs(node.left, currentSum);
count += dfs(node.right, currentSum);
```

- 왼쪽 자식과 오른쪽 자식 노드로 탐색을 진행
- 탐색하면서 count 누적

#### 백트래킹(현재 노드의 prefixSum 개수 감소)

```typescript
prefixSumMap.set(currentSum, prefixSumMap.get(currentSum)! - 1);
```

- 백트래킹: 현재 경로의 탐색이 끝나면, 현재 노드의 currentSum을 prefixSumMap에 감소시킴
- why? 다른 경로에서 영향을 받지 않도록, 현재 경로에서만 사용된 누적 합을 제거

#### 결과 반환

```typescript
return count;
```

- 현재 노드에서 시작하는 모든 targetSum 경로 개수 반환

### DFS 탐색 시작

```typescript
return dfs(root, 0);
```

- 루트 노드에서 누적 합 0으로 시작하여 DFS 탐색 실행

## 참고 자료

- [해당 문제 풀이 참고 자료: 🔥BEATS 💯 % 🎯 | 2 APPROACH |EASY & TRICKY👏| JAVA | C | C++ | PYTHON| JAVASCRIPT | DART](https://leetcode.com/problems/path-sum-iii/solutions/6403530/beats-2-approach-easy-tricky-java-c-c-python-javascript-dart/?envType=study-plan-v2&envId=leetcode-75)
