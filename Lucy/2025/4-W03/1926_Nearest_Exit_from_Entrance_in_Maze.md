# 1926. Nearest Exit from Entrance in Maze

## 문제 정보

- URL: [1926. Nearest Exit from Entrance in Maze 풀어보기](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Array, Breadth-First Search, Matrix

## 문제 회고

### 문제 요약

- '.'는 빈 공간, '+'는 벽인 미로에서 시작점(entrance)으로부터 가장 가까운 `출구(경계선의 빈 공간)`까지의 최단 경로를 찾는 문제.
- 출구는 입구와 동일한 위치가 아니어야 함.
- 상하좌우 네 방향으로만 이동 가능.

### 접근 방식

- `BFS (너비 우선 탐색)`을 사용해서 최단 거리를 찾는 전형적인 문제.
- queue를 사용해 경로를 탐색하면서 visited 체크를 통해 중복 방문을 막음.
- 경계(0행, 마지막 행, 0열, 마지막 열)에 도달했을 때 그 지점이 출구 조건을 만족하면 그때의 `currentPath`을 리턴.

#### 풀이 코드

```typescript
function nearestExit(maze: string[][], entrance: number[]): number {
  const queue: [number, number, number][] = [];
  queue.push([entrance[0], entrance[1], 0]); // [row, col, path]

  const ROW = maze.length;
  const COL = maze[0].length;
  const EMPTY = ".";

  const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited: boolean[][] = Array.from({ length: ROW }, () => new Array(COL).fill(false));

  const getCoordinates = (row: number, col: number): string => `${row},${col}`;

  while (queue.length > 0) {
    const [row, col, currentPath] = queue.shift()!;

    if (row === 0 || row === ROW - 1 || col === 0 || col === COL - 1) {
      if (getCoordinates(row, col) !== getCoordinates(entrance[0], entrance[1])) {
        return currentPath;
      }
    }

    for (const [dr, dc] of direction) {
      const [nr, nc] = [row + dr, col + dc];

      if (nr >= 0 && nr < ROW && nc >= 0 && nc < COL && maze[nr][nc] === EMPTY && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc, currentPath + 1]);
      }
    }
  }

  return -1;
}
```

### 어려웠던 점 & 해결 방법

처음엔 모든 경로를 끝까지 탐색해서 시간 초과가 발생했다. BFS의 특성상 처음으로 출구 조건을 만족한 경로가 최단 경로이므로, 찾자마자 바로 return 하면 시간 초과 없이 문제를 해결할 수 있었다. 이 부분을 놓치고 있다가 ChatGPT를 통해 BFS의 기본 특성을 다시 확인하며 수정할 수 있었다.

### 리팩터링 or 다시 풀어본다면?

runtime이 나보다 빠른 코드를 봤는데 나의 코드와 차이점은 BFS를 레벨 단위로 구현했다는 점이다. 내가 짠 코드에서는 큐에 좌표와 함께 현재까지 이동한 거리를 넣고, 매번 꺼낼 때마다 거리값을 추적하며 출구인지 확인했다. 반면, 다른 코드는 큐에 좌표만 넣고, 한 번 큐를 돌 때마다 `한 발자국`씩 이동하는 좌표들을 모두 처리한다. 이 덕분에 거리(steps)는 큐를 돌고 난 후 한 번만 증가시키면 되고, 일일이 거리 정보를 각 노드에 저장하지 않도 된다. 그래서 문제를 다시 풀게 된다면 해당 풀이를 참고해야겠다.

```typescript
// 다른 사람의 풀이
function nearestExit(maze: string[][], entrance: number[]): number {
  const queue = [entrance];
  let steps = 0,
    rows = maze.length,
    cols = maze[0].length;

  while (queue.length > 0) {
    let len = queue.length;
    while (len > 0) {
      let [row, col] = queue.shift();
      maze[row][col] = "#";
      if ((row === 0 || row === rows - 1 || col === 0 || col === cols - 1) && (row !== entrance[0] || col !== entrance[1])) return steps;
      if (col + 1 < cols && maze[row][col + 1] === ".") {
        queue.push([row, col + 1]);
        maze[row][col + 1] = "#";
      }
      if (row + 1 < rows && maze[row + 1][col] === ".") {
        queue.push([row + 1, col]);
        maze[row + 1][col] = "#";
      }
      if (row - 1 >= 0 && maze[row - 1][col] === ".") {
        queue.push([row - 1, col]);
        maze[row - 1][col] = "#";
      }
      if (col - 1 >= 0 && maze[row][col - 1] === ".") {
        queue.push([row, col - 1]);
        maze[row][col - 1] = "#";
      }
      len--;
    }
    steps++;
  }

  return -1;
}
```
