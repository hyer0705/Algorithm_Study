function rotate(matrix, x1, y1, x2, y2) {
  const nums = [];
  // 1. 오른쪽으로 가는 위쪽 행
  for (let y = y1; y <= y2; y++) nums.push(matrix[x1][y]);
  // 2. 아래로 내려가는 오른쪽 열
  for (let x = x1; x <= x2; x++) nums.push(matrix[x][y2]);
  // 3. 왼쪽으로 가는 아래쪽 행
  for (let y = y2; y >= y1; y--) nums.push(matrix[x2][y]);
  // 4. 위로 올라가는 왼쪽 열
  for (let x = x2; x >= x1; x--) nums.push(matrix[x][y1]);

  // 시계방향 회전: 뒤에서 pop해서 앞에!
  nums.unshift(nums.pop());
  const min = Math.min(...nums);

  let idx = 0;
  // 1. 다시 채워넣기(같은 순서)
  for (let y = y1; y <= y2; y++) matrix[x1][y] = nums[idx++];
  for (let x = x1; x <= x2; x++) matrix[x][y2] = nums[idx++];
  for (let y = y2; y >= y1; y--) matrix[x2][y] = nums[idx++];
  for (let x = x2; x >= x1; x--) matrix[x][y1] = nums[idx++];

  return min;
}

function solution(rows, columns, queries) {
  var answer = [];

  const matrix = Array.from({ length: rows + 1 }, () => [-1]);

  let val = 1;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      matrix[i].push(val++);
    }
  }

  for (const query of queries) {
    const [x1, y1, x2, y2] = query;

    answer.push(rotate(matrix, x1, y1, x2, y2));
  }

  return answer;
}

solution(6, 6, [
  [2, 2, 5, 4],
  [3, 3, 6, 6],
  [5, 1, 6, 3],
]); // [8, 10, 25]

solution(3, 3, [
  [1, 1, 2, 2],
  [1, 2, 2, 3],
  [2, 1, 3, 2],
  [2, 2, 3, 3],
]); // [1, 1, 5, 3]
