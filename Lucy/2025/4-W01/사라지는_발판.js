function solution(board, aloc, bloc) {
  const ROW = board.length;
  const COL = board[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const isMove = (r, c) => r >= 0 && r < ROW && c >= 0 && c < COL && board[r][c] === 1;

  const play = (r, c, opponentR, opponentC, moveCount) => {
    // 현재 위치가 사라졌다면 패배 (이전 턴에서 상대가 발판을 없앴기 때문)
    if (board[r][c] === 0) return [false, moveCount];

    let canMove = false;
    let minMoves = Infinity;
    let maxMoves = -Infinity;
    let isWin = false;

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];

      if (isMove(nr, nc)) {
        canMove = true;

        // 이동 후 현재 위치 발판 없애기
        board[r][c] = 0;
        const [opponentWin, opponentMoves] = play(opponentR, opponentC, nr, nc, moveCount + 1);
        board[r][c] = 1; // 원래대로 되돌리기 (백트래킹)

        if (opponentWin) {
          maxMoves = Math.max(maxMoves, opponentMoves);
        } else {
          isWin = true;
          minMoves = Math.min(minMoves, opponentMoves);
        }
      }
    }

    // 이동할 곳이 없는 경우 (현재 위치에서 움직일 수 없는 경우)
    if (!canMove) return [false, moveCount];

    return isWin ? [true, minMoves] : [false, maxMoves];
  };

  return play(aloc[0], aloc[1], bloc[0], bloc[1], 0)[1];
}
