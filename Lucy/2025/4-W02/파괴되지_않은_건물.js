function solution(board, skill) {
  var answer = 0;

  const TYPE = {
    enemy: 1,
    friendly: 2,
  };

  const ROW = board.length;
  const COL = board[0].length;
  const diff = Array.from({ length: ROW + 1 }, () => new Array(COL + 1).fill(0));

  for (const [type, startRow, startCol, endRow, endCol, degree] of skill) {
    let val = 1;
    if (type === TYPE.enemy) val = -1;
    else val = 1;

    diff[startRow][startCol] += degree * val;
    diff[startRow][endCol + 1] -= degree * val;
    diff[endRow + 1][startCol] -= degree * val;
    diff[endRow + 1][endCol + 1] += degree * val;
  }

  // 행 누적합
  for (let i = 0; i < ROW + 1; i++) {
    for (let j = 1; j < COL + 1; j++) {
      diff[i][j] += diff[i][j - 1];
    }
  }

  // 열 누적합
  for (let j = 0; j < COL + 1; j++) {
    for (let i = 1; i < ROW + 1; i++) {
      diff[i][j] += diff[i - 1][j];
    }
  }

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      const durability = board[i][j] + diff[i][j];
      if (durability > 0) answer++;
    }
  }

  return answer;
}

solution(
  [
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5],
  ],
  [
    [1, 0, 0, 3, 4, 4],
    [1, 2, 0, 2, 3, 2],
    [2, 1, 0, 3, 1, 2],
    [1, 0, 1, 3, 3, 1],
  ]
); // 10
