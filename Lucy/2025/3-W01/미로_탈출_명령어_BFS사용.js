// 예제는 통과했으나 다른 테스트 케이스를 통과하지 못함...
// BFS를 사용하면 시간 초과가 발생...!
function solution(n, m, x, y, r, c, k) {
  let answer = "impossible";

  // 1. n, m 값을 가지고 maze 배열 생성 및 초기화
  const maze = Array.from({ length: n }, () => new Array(m).fill("."));

  // 2. x, y, r, c 값을 가지고 S와 E 표시
  maze[x - 1][y - 1] = "S";
  maze[r - 1][c - 1] = "E";

  // 3. 빠른 경로를 찾는다 => BFS? (k를 제외하고)
  // 4. BFS 방식으로 빠른 경로를 찾다가 이동 경로도 queue에 저장할 수 있지 않을까라는 생각이 들었다.
  let minimumDistance = Infinity;
  let minimumPath = "";
  const direction = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ]; // [x, y, path] | r, l, d, u
  const visited = Array.from({ length: n }, () => new Array(m).fill(false));
  const queue = [];
  queue.push([x - 1, y - 1, 0, ""]); // x 좌표, y 좌표, 거리, 이동 경로
  while (queue.length > 0) {
    const [cx, cy, distance, path] = queue.shift();
    visited[cx][cy] = true;

    if (maze[cx][cy] === "E") {
      minimumDistance = Math.min(minimumDistance, distance);
      minimumPath = minimumPath === "" ? path : [minimumPath, path].sort().at(0);
    }

    for (const [directionX, directionY, nextPath] of direction) {
      const [nextX, nextY] = [cx + directionX, cy + directionY];

      if (nextX >= 0 && nextX < n && nextY >= 0 && nextY < m && !visited[nextX][nextY]) {
        queue.push([nextX, nextY, distance + 1, path + nextPath]);
      }
    }
  }

  // k를 신경쓰지 않고 S 에서 E까지 최소 경로의 이동 경로를 알아내는 것까지 했으나 그 다음은 어떻게 풀어야할지 감이 잡히지 않았다.
  if (minimumDistance === k) return minimumPath;
  if ((k - minimumDistance) % 2 !== 0 || k < minimumDistance) return answer;

  // 5. DFS로 k - minimumDistance 만큼 추가 이동하여 이동 경로 찾기
  let result = null;
  const dfs = (cx, cy, remain, path) => {
    if (result) return;
    if (remain === 0) {
      if (cx === r - 1 && cy === c - 1) result = path;
      return;
    }

    for (const [dx, dy, move] of direction) {
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        dfs(nx, ny, remain - 1, path + move);
      }
    }
  };

  dfs(r - 1, c - 1, k - minimumDistance, minimumPath);

  return result;
}

console.log(solution(3, 4, 2, 3, 3, 1, 5)); // "dllrl"
console.log(solution(2, 2, 1, 1, 2, 2, 2)); // "dr"
console.log(solution(3, 3, 1, 2, 3, 3, 4)); // "impossible"
