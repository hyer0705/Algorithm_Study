function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const UNDEFINED_RESULT = -1.0;

  const queryResults: number[] = [];
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

  return queryResults;
}
