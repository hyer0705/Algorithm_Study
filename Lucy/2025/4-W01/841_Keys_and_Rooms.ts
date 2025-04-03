function canVisitAllRooms(rooms: number[][]): boolean {
  const visited: boolean[] = new Array(rooms.length).fill(false);
  visited[0] = true;

  dfs(rooms, visited, 0);

  return visited.every((el) => el);
}

function dfs(rooms: number[][], visited: boolean[], currentKey: number) {
  const keys = rooms[currentKey];

  for (const key of keys) {
    if (!visited[key]) {
      visited[key] = true;
      dfs(rooms, visited, key);
    }
  }
}
