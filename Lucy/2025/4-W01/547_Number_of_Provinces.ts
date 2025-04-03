// union-find algorithm
function findCircleNum(isConnected: number[][]): number {
  const parents: number[] = Array.from({ length: isConnected.length }, (_, i) => i);

  const find = (i: number): number => {
    if (parents[i] !== i) {
      parents[i] = find(parents[i]);
    }

    return parents[i];
  };

  const union = (i: number, j: number): void => {
    const iRep: number = find(i);

    const jRep: number = find(j);

    if (iRep !== jRep) {
      parents[jRep] = iRep;
    }
  };

  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected[i].length; j++) {
      if (isConnected[i][j] === 1) {
        union(i, j);
      }
    }
  }

  return new Set(parents.map(find)).size;
}

// dfs algorithm (모범 답안)
function findCircleNum(isConnected: number[][]): number {
  const visited = Array.from({ length: isConnected.length }, () => false);
  let provinces = 0;

  const dfs = (city: number): void => {
    visited[city] = true;

    for (let j = 0; j < isConnected[city].length; j++) {
      if (isConnected[city][j] === 1 && !visited[j]) {
        dfs(j);
      }
    }
  };

  for (let i = 0; i < isConnected.length; i++) {
    if (!visited[i]) {
      provinces++;
      dfs(i);
    }
  }

  return provinces;
}
