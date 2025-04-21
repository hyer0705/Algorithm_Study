# 994. Rotting Oranges

## 문제 정보

- URL: [994. Rotting Oranges 풀어보기](https://leetcode.com/problems/rotting-oranges/description/?envType=study-plan-v2&envId=leetcode-75)
- LEVEL: Medium
- TOPICS: Array, Breadth-First Search, Matrix

## 문제 회고

### 문제 요약

이 문제는 2차원 배열 형태의 박스 안에 있는 신선한 오렌지가 썩은 오렌지에 의해 1분마다 상하좌우로 썩게 되는 상황을 시뮬레이션하여, 모든 신선한 오렌지가 썩는 데 걸리는 시간을 구하는 문제이다. 만약 모든 오렌지가 썩을 수 없다면 `-1`을, 처음부터 신선한 오렌지가 없다면 `0`을 반환해야 한다.

### 접근 방식

- 2중 for문으로 `grid`를 순회하면서 오렌지 개수를 카운트하고, 썩은 오렌지의 좌표를 큐에 저장한다.
- BFS 방식으로 인접한 신선한 오렌지를 썩게 만들면서 시간(`time`)을 증가시킨다.
- BFS 탐색이 끝난 뒤 신선한 오렌지가 남아 있다면 -1, 그렇지 않으면 누적된 `time`을 반환한다.

#### 풀이 코드

```typescript
function orangesRotting(grid: number[][]): number {
  const ORANGE = {
    empty: 0,
    fresh: 1,
    rotten: 2,
  };
  const ROW = grid.length;
  const COL = grid[0].length;

  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue: number[][] = []; // [row, col, time];

  // find the coordinates of the rotten orange
  const countOrangeMap = new Map<number, number>();
  countOrangeMap.set(ORANGE.empty, 0);
  countOrangeMap.set(ORANGE.fresh, 0);
  countOrangeMap.set(ORANGE.rotten, 0);

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === ORANGE.rotten) {
        queue.push([i, j, 0]);
        countOrangeMap.set(ORANGE.rotten, (countOrangeMap.get(ORANGE.rotten) ?? 0) + 1);
      } else if (grid[i][j] === ORANGE.fresh) {
        countOrangeMap.set(ORANGE.fresh, (countOrangeMap.get(ORANGE.fresh) ?? 0) + 1);
      } else {
        countOrangeMap.set(ORANGE.empty, (countOrangeMap.get(ORANGE.empty) ?? 0) + 1);
      }
    }
  }

  // 오렌지가 없는 경우 => 0
  if (countOrangeMap.get(ORANGE.rotten) === 0 && countOrangeMap.get(ORANGE.fresh) === 0) return 0;
  // 썪은 오렌지가 없는 경우 => -1
  if (countOrangeMap.get(ORANGE.rotten) === 0) return -1;

  // bfs
  let time: number = -1;
  while (queue.length > 0) {
    const [row, col, currentTime] = queue.shift()!;

    time = Math.max(time, currentTime);

    for (const [dr, dc] of direction) {
      const [nr, nc] = [row + dr, col + dc];

      if (nr >= 0 && nr < ROW && nc >= 0 && nc < COL && grid[nr][nc] === ORANGE.fresh) {
        queue.push([nr, nc, currentTime + 1]);
        grid[nr][nc] = ORANGE.rotten;

        countOrangeMap.set(ORANGE.fresh, (countOrangeMap.get(ORANGE.fresh) ?? 0) - 1);
        countOrangeMap.set(ORANGE.rotten, (countOrangeMap.get(ORANGE.rotten) ?? 0) + 1);
      }
    }
  }

  if ((countOrangeMap.get(ORANGE.fresh) ?? 0) > 0) {
    return -1;
  }

  return time;
}
```

### 어려웠던 점 & 해결 방법

처음에는 BFS 탐색 후 신선한 오렌지가 남아 있는지만 판단해서 단순히 `-1` 또는 `time`을 반환했는데, 문제에서 요구하는 다양한 케이스(예: 처음부터 오렌지가 없음, 썩은 오렌지가 없음 등)를 놓쳐서 오답이 발생했다.

이 문제를 해결하기 위해 BFS 탐색 전에 신선한 오렌지, 썩은 오렌지, 빈 칸의 개수를 카운팅하는 `coutnOrageMap`을 도입했. 이를 통해 다음과 같은 초기 조건들을 명확하게 분기 처리할 수 있었다.

- 신선한 오렌지도 없고 썩은 오렌지도 없는 경우 -> 오렌지가 없으므로 `0`을 반환
- 썩은 오렌지가 없는 경우 -> 신선한 오렌지가 썩을 수 없으므로 `-1`을 반환

### 리팩터링 or 다시 풀어본다면

`0`, `-1` 등 리턴 값이 다른 사람이 코드를 봤을 때, 의미하는 바가 명확하지 않아서, 이를 상수로 정의해 매직 넘버를 제거하고 가독성을 높이고 싶다.

조건문들을 좀 더 의미가 명확하게 표현하도록 리팩터링하면 코드의 의도를 파악하기 쉬울 것 같다.

현재는 큐에 시간 정보를 같이 저장해서 처리했지만, 레벨 단위 BFS 방식(한 분기의 썩은 오렌지를 한 번에 처리하고 한 레벨 증가하는 방식)이 더 빠르게 느껴져 그 방식으로도 다시 풀어보고 싶다.

```typescript
// 다른 사람의 풀이(레벨 단위 BFS 방식)

// BFS: Initialize a queue with rotten oranges, count fresh ones. Simulate minute-by-minute rotting by processing levels of the BFS. The key is counting a minute after you finish processing all the oranges that were rotten at the start of that minute.
// For each level, rot 4D adjacent fresh oranges, decrement the count, and enqueue the newly rotten ones
// Increment minutes after each level if rot is still spreading. Return total minutes (levels) if all fresh oranges rot, else return -1
// O(m*n) time & space
function orangesRotting(grid: number[][]): number {
  // Edge case
  if (!grid || grid.length == 0 || grid[0].length == 0) {
    return 0;
  }

  const totalRows = grid.length;
  const totalCols = grid[0].length;

  // We need to know WHERE the rotten oranges are right at the beginning
  const rottenOranges: [number, number][] = [];
  // and count how many `freshOranges` we have in total
  let freshOranges = 0;

  // Initialize `rottenOranges` and `freshOranges`
  for (let r = 0; r < totalRows; ++r) {
    for (let c = 0; c < totalCols; ++c) {
      if (grid[r][c] == 2) rottenOranges.push([r, c]);
      if (grid[r][c] == 1) freshOranges++;
    }
  }

  // Edge case
  if (freshOranges == 0) {
    return 0;
  }

  let minutes = 0;
  // Directions for neighbors: up, right, down, left
  // [0, 1] moves to the right, which means [r, c+1]
  // [-1, 0] moves up, which means [r-1, c]
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  while (rottenOranges.length > 0) {
    if (freshOranges == 0) {
      break; // Obviously
    }

    const rottenBatchSize = rottenOranges.length; // The number of rotting oranges in the CURRENT minute (i.e. the current "level" of BFS)
    let rottingRightNow = false;

    // Implementing what happens WITHIN the CURRENT minute
    for (let i = 0; i < rottenBatchSize; ++i) {
      // Get the coordinate of the current rotten orange
      const [r, c] = rottenOranges.shift()!;

      for (const [rowDir, colDir] of directions) {
        const adjRow = r + rowDir;
        const adjCol = c + colDir;
        if (adjRow >= 0 && adjCol >= 0 && adjRow < totalRows && adjCol < totalCols && grid[adjRow][adjCol] == 1) {
          grid[adjRow][adjCol] = 2; // rot the adjacent fresh orange
          freshOranges--;
          rottingRightNow = true;
          rottenOranges.push([adjRow, adjCol]); // prepare for the NEXT minute
        }
      }
    }

    // If the `rottenOranges` queue still has elements after processing the current minute,
    // it means the oranges we just added will rot others in the NEXT minute.
    minutes++;
  }

  return freshOranges == 0 ? minutes : -1;
}
```
