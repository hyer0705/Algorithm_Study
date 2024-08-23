/**
 * 3249. Count the Number of Good Nodes
 * url: https://leetcode.com/problems/count-the-number-of-good-nodes/
 *
 * topic: Tree, Depth-First-Search
 * difficulty: Medium
 * date: 2024.08.21(WED)~
 */

/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function (edges) {
  const tree = {};

  // 인접 리스트 형태로 생성
  for (const [u, v] of edges) {
    !tree[u] && (tree[u] = []);
    tree[u].push(v);

    !tree[v] && (tree[v] = []);
    tree[v].push(u);
  }

  let goodNodes = 0;

  const dfs = (node, parent) => {
    let size = 1;
    // 자식 서브 트리의 크기를 저장하는 배열
    const sizes = [];

    // 자식 노드 순회
    for (const neighbor of tree[node]) {
      // 부모 노드로 역방향 탐색을 방지하기 위한 조건
      if (neighbor === parent) {
        continue;
      }

      // 재귀 호출을 하여 서브 트리의 크기 계산
      const subSize = dfs(neighbor, node);
      sizes.push(subSize);
      // 현재 노드가 포함된 전체 서브트리의 크기를 계산
      size += subSize;
    }

    // 자식 노드 순회 후, good node 판별
    // Set collection을 사용해서 size가 1개 이하면 자식 서브트리의 크기들이 모두 동일하다는 뜻!
    if (new Set(sizes).size <= 1) {
      goodNodes += 1;
    }

    // 서브트리 크기 반환
    return size;
  };

  // dfs 시작, 루트 노드를 인자 값으로 설정
  dfs(0, -1);

  // goodNodes들 카운트한 값 반환
  return goodNodes;
};

console.log(
  countGoodNodes([
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ])
);
console.log(
  countGoodNodes([
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [1, 6],
    [2, 7],
    [3, 8],
  ])
);
console.log(
  countGoodNodes([
    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [0, 9],
    [9, 10],
    [9, 12],
    [10, 11],
  ])
);
