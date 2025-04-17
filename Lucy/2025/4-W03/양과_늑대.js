function solution(info, edges) {
  const ROOT = 0;
  const INFO = {
    wolf: 1,
    sheep: 0,
  };

  // 트리 표현(단방향 그래프로 표현? 부모 -> 자식 순서로 탐색하기 때문)
  const graph = Array.from({ length: info.length }, () => []);
  for (const [parent, child] of edges) {
    graph[parent].push(child);
  }

  const dfs = (sheep, wolf, canVisitNodes) => {
    // 양의 수보다 늑대의 수가 같거나 많아지는 경우 dfs 탐색 종료
    if (sheep <= wolf) return 0;

    let maxSheep = sheep;

    for (let i = 0; i < canVisitNodes.length; i++) {
      const nextNode = canVisitNodes[i];
      const nextSheep = info[nextNode] === INFO.sheep ? sheep + 1 : sheep;
      const nextWolf = info[nextNode] === INFO.wolf ? wolf + 1 : wolf;

      // nextCanVisitNodes: "지금까지의 탐색 경로에서, 다음에 방문할 수 있는 모든 노드들"
      const nextCanVisitNodes = [...canVisitNodes.slice(0, i), ...canVisitNodes.slice(i + 1)];
      nextCanVisitNodes.push(...graph[nextNode]);

      const result = dfs(nextSheep, nextWolf, nextCanVisitNodes);
      maxSheep = Math.max(maxSheep, result);
    }

    return maxSheep;
  };

  return dfs(1, 0, graph[ROOT]);
}

solution(
  [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [
    [0, 1],
    [1, 2],
    [1, 4],
    [0, 8],
    [8, 7],
    [9, 10],
    [9, 11],
    [4, 3],
    [6, 5],
    [4, 6],
    [8, 9],
  ]
);
