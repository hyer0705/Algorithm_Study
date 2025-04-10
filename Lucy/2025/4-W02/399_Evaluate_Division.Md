# 399. Evaluate Division

## 문제 정보

- URL: [399. Evaluate Division 풀어보기](https://leetcode.com/problems/evaluate-division/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Array, String, Depth-First Search, Breadth-First Search, Union Find, Graph, Shortest Path

## 문제 회고

### 💡 어떤 문제인가요?

이번 문제는 두 변수 간의 나눗셈 관계를 그래프 형태로 구성해서, 주어진 쿼리에 대해 `A / B = ?`의 값을 구하는 문제입니다. 즉, `a / b = 2.0, b / c = 3.0`이라는 정보가 주어졌다면, `a / c = 6.0`이 되는 방식입니다.

### 💭 처음엔 어떻게 생각했나요?

처음 문제를 봤을 땐, “이걸 어떻게 그래프로 표현하지?”라는 생각이 들었습니다. Chat GPT에 질문을 하여 `a / b = 2.0`을 `a → b (2.0)`으로, 그리고 동시에 `b → a (1 / 2.0)`으로 표현하면 되겠다는 아이디어를 떠올릴 수 있었습니다. 이걸 가중치가 있는 양방향 그래프로 구성해야겠다고 생각했습니다.

### 🧩 어떻게 풀이했나요?

1. 그래프 구성

- 먼저, 주어진 equations와 values를 바탕으로 가중치가 있는 방향 그래프를 만듭니다.
- 각 변수는 노드, 각 식은 양방향 간선으로 표현합니다.
  - 예를 들어 a / b = 2.0이면 a → b는 가중치 2.0, b → a는 가중치 1/2.0인 간선을 추가합니다.
  - 이처럼 양방향으로 연결함으로써 나중에 DFS로 어느 방향이든 탐색할 수 있게 됩니다.

```typescript
const graph = new Map<string, [string, number][]>();

const addEdge = (from: string, to: string, weight: number) => {
  if (!graph.has(from)) graph.set(from, []);

  const neighbors = graph.get(from);
  if (neighbors) neighbors.push([to, weight]);
};

for (let i = 0; i < equations.length; i++) {
  const [from, to] = equations[i];
  const weight = values[i];

  addEdge(from, to, weight);
  addEdge(to, from, 1 / weight);
}
```

2. DFS로 쿼리 탐색

- queries의 각 쌍 [C, D]에 대해, DFS 방식으로 C에서 D까지의 경로를 탐색합니다.
- 탐색하는 동안, 경로 상의 간선 가중치를 계속 누적 곱하면서 계산합니다.
- 만약 C에서 D까지의 경로가 존재한다면, 누적 곱을 결과로 반환하고, 경로가 없거나 변수 자체가 없으면 -1.0을 반환합니다.
- 같은 변수 쌍이라면(C == D) 1.0을 반환합니다.

```typescript
const UNDEFINED_RESULT = -1.0;

const queryResults: number[] = [];

const dfs = (current: string, target: string, visited: Set<string>, product: number): number => {
  if (!graph.has(current)) return UNDEFINED_RESULT;
  if (current === target) return product;

  visited.add(current);

  for (const [next, weight] of graph.get(current)!) {
    if (!visited.has(next)) {
      const result = dfs(next, target, visited, product * weight);
      if (result !== UNDEFINED_RESULT) return result;
    }
  }

  return UNDEFINED_RESULT;
};

for (const [C, D] of queries) {
  if (!graph.has(C) || !graph.has(D)) {
    queryResults.push(UNDEFINED_RESULT);
  } else if (C === D) {
    queryResults.push(1);
  } else {
    const visited = new Set<string>();
    const result = dfs(C, D, visited, 1);
    queryResults.push(result);
  }
}
```

3. 쿼리 결과 반환

- 위 과정을 통해 각 쿼리의 답을 배열에 저장하고, 최종적으로 모든 쿼리에 대한 결과 배열을 반환합니다.

```typescript
return queryResults;
```

#### 그림으로 설명

![Image](https://github.com/user-attachments/assets/fe607027-b622-4b1d-9e08-ea862dba0e0a)

### 🤔 회고

처음에는 식을 그래프로 어떻게 변환해야 할지 막막했지만, ‘그래프로 치환해서 생각해보기’라는 아이디어를 통해 문제를 풀이할 수 있었습니다. 해당 문제를 풀어보면서 피연산자(변수 A, B)를 노드로 연산된 값(나눗셈 값)을 가중치로 생각할 수도 있구나를 배울 수 있었습니다.
