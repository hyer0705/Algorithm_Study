// 269ms
enum Direction {
  Backward = 0,
  Forward = 1,
}
type NeighborWithDirection = [number, Direction];

function minReorder(n: number, connections: number[][]): number {
  const visited: boolean[] = new Array(n).fill(false);
  const graph: NeighborWithDirection[][] = Array.from({ length: n }, () => []);
  for (const [from, to] of connections) {
    graph[from].push([to, Direction.Forward]);
    graph[to].push([from, Direction.Backward]);
  }

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

  return edgesToReverse;
}
