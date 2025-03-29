function countEdges(edges) {
  const countMap = new Map();

  for (const [from, to] of edges) {
    if (!countMap.has(from)) {
      countMap.set(from, [0, 0]); // [나가는 간선, 들어오는 간선]
    }
    if (!countMap.has(to)) {
      countMap.set(to, [0, 0]);
    }

    countMap.get(from)[0] += 1;
    countMap.get(to)[1] += 1;
  }

  return countMap;
}

function calculateAnswer(countEdgeMap) {
  const answer = [0, 0, 0, 0];

  for (const [key, count] of countEdgeMap) {
    if (count[0] >= 2 && count[1] === 0) answer[0] = key;
    else if (count[0] === 0 && count[1] > 0) answer[2] += 1;
    else if (count[0] >= 2 && count[1] >= 2) answer[3] += 1;
  }

  answer[1] = countEdgeMap.get(answer[0])[0] - answer[2] - answer[3];

  return answer;
}

function solution(edges) {
  const countEdgeMap = countEdges(edges);
  const answer = calculateAnswer(countEdgeMap);

  return answer;
}

// 첫 번째 풀이
// function solution(edges) {
//   const TOTAL_GRAPH_COUNT = "totalGraphCount";

//   var answer = [];
//   const resultMap = new Map();

//   // 1. 생성된 정점 찾기
//   const adjacentList = new Map();
//   for (const [from, to] of edges) {
//     if (!adjacentList.has(from)) adjacentList.set(from, []);

//     adjacentList.get(from).push(to);
//   }

//   const toVertices = new Set();
//   const candidateVertices = [];
//   adjacentList.forEach((to, from) => {
//     if (to.length >= 2) {
//       candidateVertices.push(from);
//     }
//     toVertices.add(...to);
//   });

//   for (const vertex of candidateVertices) {
//     if (!toVertices.has(vertex)) {
//       answer.push(vertex);
//       resultMap.set(TOTAL_GRAPH_COUNT, adjacentList.get(vertex).length);
//       adjacentList.delete(vertex);
//       break;
//     }
//   }
//   console.log(resultMap, adjacentList);

//   return answer;
// }

console.log(
  solution([
    [2, 3],
    [4, 3],
    [1, 1],
    [2, 1],
  ])
); // [2, 1, 1, 0]
console.log(
  solution([
    [4, 11],
    [1, 12],
    [8, 3],
    [12, 7],
    [4, 2],
    [7, 11],
    [4, 8],
    [9, 6],
    [10, 11],
    [6, 10],
    [3, 5],
    [11, 1],
    [5, 3],
    [11, 9],
    [3, 8],
  ])
); // [4, 0, 1, 2]
