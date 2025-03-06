function solution(n, m, x, y, r, c, k) {
  let answer = "impossible";

  // 1. 이동 횟수를 계산하여 도달 가능한지 확인
  const minimumDistance = Math.abs(x - r) + Math.abs(y - c);
  if (minimumDistance > k || (k - minimumDistance) % 2 !== 0) return "impossible";

  // 2. dfs 방법으로 이동하면서 k만큼 이동했을 때, 미로 탈출 경로 알아내기
  const visited = new Set();
  const direction = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ]; // [x, y, move] | d, l, r, u 순(사전순)

  const dfs = (cx, cy, remain, path) => {
    // answer가 impossible이 아닌 경우 탐색 중단
    if (answer !== "impossible") return;

    // k번 이동한 경우 탐색 중단
    if (remain === 0) {
      if (cx === r && cy === c) answer = path;
      return;
    }

    // 앞으로 남은 이동 횟수 계산 후 "E"까지 이동가능한지 확인
    const remainingDistance = Math.abs(cx - r) + Math.abs(cy - c);
    if (remainingDistance > remain || (remain - remainingDistance) % 2 !== 0) return;

    // visited Set에 이미 탐색한 경우가 있는지 확인
    const visitedKey = `${cx},${cy},${remain}`;

    if (visited.has(visitedKey)) return;

    visited.add(visitedKey);

    // d > l > r > u 순으로 이동
    for (const [dx, dy, move] of direction) {
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 1 && ny >= 1 && nx <= n && ny <= m) {
        dfs(nx, ny, remain - 1, path + move);
      }
    }
  };

  // "S" 위치부터 DFS 순회
  dfs(x, y, k, "");

  return answer;
}

console.log(solution(3, 4, 2, 3, 3, 1, 5)); // dllrl
solution(2, 2, 1, 1, 2, 2, 2); // "dr"
solution(3, 3, 1, 2, 3, 3, 4); // "impossible"
