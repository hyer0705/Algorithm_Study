# 1466. Reorder Routes to Make All Paths Lead to the City Zero

## 문제 정보

- URL: [1466. Reorder Routes to Make All Paths Lead to the City Zero 풀어보기](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Depth-First Search, Breadth-First Search, Graph

## 문제 회고

### 🔍 어떤 문제인가요?

도시들 간의 연결 관계가 트리 형태로 주어졌고, 각 도로는 단방향입니다. 목표는 모든 도시가 0번 도시로 이동 가능하도록 도로의 방향을 최소한으로 바꾸는 것입니다. 즉, **"각 노드에서 0번 노드까지 가는 경로가 존재해야 한다"**는 조건을 만족시키면서, 도로 방향을 최소 몇 개 바꿔야 하는지를 구하는 문제입니다.

### 💭 처음엔 어떻게 생각했나요?

처음엔 connections 배열을 그대로 단방향 그래프로 만들고 어떻게 0번 도시에 도달하게 만들 수 있을지를 고민했습니다. 하지만 `어떤 도로의 방향을 바꿔야 하는지` 판단하는 기준이 애매했고, 어떻게 시작해야 할지도 감이 오지 않았습니다. 이때 문제에 주어진 **힌트(Hint1: 그래프를 무향으로 간주하세요. 루트에서 DFS를 시작하세요. 정방향의 간선을 만나면 해당 간선을 역순으로 탐색해야 합니다.)**를 보고 풀이할 수 있었습니다.

힌트에서 그래프를 무방향으로 보고 DFS를 수행하라는 말이 있었습니다. DFS로 탐색하면서 **정방향(즉, from → to 형태로 설정된 도로)**을 지나가야 할 경우에는 방향을 바꿔야 했습니다.

### 🧩 어떻게 풀이했나요?

1. 그래프 구성

- connections 배열을 기반으로, 양방향 그래프를 만들었습니다.
- 단, 각 간선에 대해 정방향(Forward) / 역방향(Backward) 정보를 추가하여 방향을 기억하도록 했습니다.

```typescript
enum Direction {
  Backward = 0,
  Forward = 1,
}
type NeighborWithDirection = [number, Direction];

const graph: NeighborWithDirection[][] = Array.from({ length: n }, () => []);
for (const [from, to] of connections) {
  graph[from].push([to, Direction.Forward]);
  graph[to].push([from, Direction.Backward]);
}
```

2. DFS 탐색

- 0번 도시를 루트로 삼고 DFS를 시작합니다.
- 이때 방문한 적 없는 노드로 이동할 때,
  - 간선이 정방향이면 → 방향을 바꿔야 하므로 카운트를 증가시킵니다.
  - 간선이 역방향이면 → 이미 0번 도시에 도달할 수 있는 방향이므로 그대로 둡니다.

```typescript
let edgesToReverse = 0;
const dfs = (city: number) => {
  visited[city] = true;

  for (const [nextCity, direction] of graph[city]) {
    if (!visited[nextCity]) {
      if (direction === Direction.Forward) {
        edgesToReverse++;
      }
      dfs(nextCity);
    }
  }
};

dfs(0);
```

3. 최종 반환

- 이렇게 DFS를 마친 후, 정방향이었던 간선들의 수를 반환하면, 방향을 바꿔야 하는 도로의 최소 수를 얻을 수 있습니다.

#### 그림으로 설명

![1446. Reorder Routes to Make All Paths Lead to the City Zero 그림 설명](https://github.com/user-attachments/assets/d4c8f966-7f69-4b8c-bd6d-d38243e9bf46)

### 🧠 회고

처음에는 어떻게 도로의 방향을 바꿔야 할지 막막했지만, 힌트를 통해 문제를 무방향 그래프로 바라보고, 방향 정보는 탐색 과정 중 판단의 기준으로만 써서 문제를 풀이할 수 있었습니다. "그래프를 어떻게 표현하느냐"가 문제 풀이의 핵심 실마리가 될 수 있다는 걸 알 수 있는 문제였습니다.
