// 첫 번째 풀이: 2차원 배열을 그대로 사용하여 풀이. shiftRow(), rotate() 함수를 구현하여 풀이
//  -> 33.3점(정확성만 통과)
function solution(rc, operations) {
  // 명령어 정의
  const OPERATION = {
    rotate: "Rotate",
    shiftRow: "ShiftRow",
  };

  // ROW, COL 변수 정의 및 초기화
  const ROW = rc.length;
  const COL = rc[0].length;
  const totalEdgeElementsCount = 2 * ROW + 2 * COL - 4;

  // rc 배열 복사
  let copiedRC = [];

  for (let i = 0; i < rc.length; i++) {
    copiedRC.push([...rc[i]]);
  }

  const shiftRow = (arr, shiftCount) => {
    const shifted = Array.from({ length: ROW }, (_) => "");
    for (let r = 0; r < ROW; r++) {
      shifted[(r + shiftCount) % ROW] = [...arr[r]];
    }

    return shifted;
  };

  const getEdgeElements = (arr) => {
    // 행렬의 바깥쪽에 있는 원소들 구하기
    const edgeElements = [];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let currentDirection = 0;
    let currentCoordinates = [0, 0];
    while (edgeElements.length < totalEdgeElementsCount) {
      const [cx, cy] = currentCoordinates;
      if (cx >= 0 && cx < ROW && cy >= 0 && cy < COL) {
        edgeElements.push(arr[cx][cy]);
      }

      const [dx, dy] = directions[currentDirection];
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COL) {
        currentCoordinates = [nx, ny];
      } else if (nx < 0 || nx >= ROW || ny < 0 || ny >= COL) {
        currentDirection++;
        currentCoordinates = [cx + directions[currentDirection][0], cy + directions[currentDirection][1]];
      }
    }

    return edgeElements;
  };

  const rotate = (arr, edgeElements, rotateCount) => {
    const rotatedEdgeElements = Array.from({ length: edgeElements.length }).fill(0);

    for (let i = 0; i < rotatedEdgeElements.length; i++) {
      rotatedEdgeElements[(i + rotateCount) % totalEdgeElementsCount] = edgeElements[i];
    }

    // rotate
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let currentDirection = 0;
    let currentCoordinates = [0, 0];
    let currentEdgeElement = 0;
    while (currentEdgeElement < totalEdgeElementsCount) {
      const [cx, cy] = currentCoordinates;
      if (cx >= 0 && cx < ROW && cy >= 0 && cy < COL) {
        arr[cx][cy] = rotatedEdgeElements[currentEdgeElement];
      }

      const [dx, dy] = directions[currentDirection];
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COL) {
        currentCoordinates = [nx, ny];
      } else if (nx < 0 || nx >= ROW || ny < 0 || ny >= COL) {
        currentDirection++;
        currentCoordinates = [cx + directions[currentDirection][0], cy + directions[currentDirection][1]];
      }

      currentEdgeElement++;
    }
  };

  for (const operation of operations) {
    if (operation === OPERATION.shiftRow) {
      copiedRC = shiftRow(copiedRC, 1);
    } else if (operation === OPERATION.rotate) {
      const edgeElements = getEdgeElements(copiedRC);
      rotate(copiedRC, edgeElements, 1);
    }
  }

  // console.log(copiedRC);

  return copiedRC;
}

// 두 번째 풀이: 중복되는 명령어의 갯수를 카운트하여 명령어를 반복 수행하지 않고 통과하도록 풀이
//  -> 67.5점(정확성에서 일부, 효율성에서 일부만 통과)
function solution(rc, operations) {
  // 명령어 정의
  const OPERATION = {
    rotate: "Rotate",
    shiftRow: "ShiftRow",
  };

  // ROW, COL 변수 정의 및 초기화
  const ROW = rc.length;
  const COL = rc[0].length;
  const totalEdgeElementsCount = 2 * ROW + 2 * COL - 4;

  // rc 배열 복사
  let copiedRC = [];

  for (let i = 0; i < rc.length; i++) {
    copiedRC.push([...rc[i]]);
  }

  const shiftRow = (arr, shiftCount) => {
    const shifted = Array.from({ length: ROW }, (_) => "");
    for (let r = 0; r < ROW; r++) {
      shifted[(r + shiftCount) % ROW] = [...arr[r]];
    }

    return shifted;
  };

  const getEdgeElements = (arr) => {
    // 행렬의 바깥쪽에 있는 원소들 구하기
    const edgeElements = [];
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let currentDirection = 0;
    let currentCoordinates = [0, 0];
    while (edgeElements.length < totalEdgeElementsCount) {
      const [cx, cy] = currentCoordinates;
      if (cx >= 0 && cx < ROW && cy >= 0 && cy < COL) {
        edgeElements.push(arr[cx][cy]);
      }

      const [dx, dy] = directions[currentDirection];
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COL) {
        currentCoordinates = [nx, ny];
      } else if (nx < 0 || nx >= ROW || ny < 0 || ny >= COL) {
        currentDirection++;
        currentCoordinates = [cx + directions[currentDirection][0], cy + directions[currentDirection][1]];
      }
    }

    return edgeElements;
  };

  const rotate = (arr, edgeElements, rotateCount) => {
    const rotatedEdgeElements = Array.from({ length: edgeElements.length }).fill(0);

    for (let i = 0; i < rotatedEdgeElements.length; i++) {
      rotatedEdgeElements[(i + rotateCount) % totalEdgeElementsCount] = edgeElements[i];
    }

    // rotate
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let currentDirection = 0;
    let currentCoordinates = [0, 0];
    let currentEdgeElement = 0;
    while (currentEdgeElement < totalEdgeElementsCount) {
      const [cx, cy] = currentCoordinates;
      if (cx >= 0 && cx < ROW && cy >= 0 && cy < COL) {
        arr[cx][cy] = rotatedEdgeElements[currentEdgeElement];
      }

      const [dx, dy] = directions[currentDirection];
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < ROW && ny >= 0 && ny < COL) {
        currentCoordinates = [nx, ny];
      } else if (nx < 0 || nx >= ROW || ny < 0 || ny >= COL) {
        currentDirection++;
        currentCoordinates = [cx + directions[currentDirection][0], cy + directions[currentDirection][1]];
      }

      currentEdgeElement++;
    }
  };

  // two pointer 개념으로 명령어 갯수 카운트 해보기
  let currentOperationIndex = 0;
  while (currentOperationIndex < operations.length) {
    const currentOperation = operations[currentOperationIndex];
    let countSameOperation = 1;
    while (currentOperation === operations[currentOperationIndex + 1]) {
      currentOperationIndex++;
      countSameOperation++;
    }

    if (currentOperation === OPERATION.shiftRow) {
      copiedRC = shiftRow(copiedRC, countSameOperation % ROW);
    } else if (currentOperation === OPERATION.rotate) {
      const edgeElements = getEdgeElements(copiedRC);
      rotate(copiedRC, edgeElements, countSameOperation % totalEdgeElementsCount);
    }

    currentOperationIndex += countSameOperation;
  }

  return copiedRC;
}

// 세 번째 풀이: Deque를 Array로 표현하여 풀이
//  -> 66.7점(정확성은 통과, 효율성에서 일부만 통과)
function solution(rc, operations) {
  const answer = [];

  const OPERATION = Object.freeze({
    shiftRow: "ShiftRow",
    rotate: "Rotate",
  });

  const ROW = rc.length;
  const COL = rc[0].length;

  const leftCol = [];
  const rightCol = [];
  const rows = [];

  for (let r = 0; r < ROW; r++) {
    leftCol.push(rc[r][0]);
    rightCol.push(rc[r][COL - 1]);
    rows.push(rc[r].slice(1, COL - 1));
  }

  for (const operation of operations) {
    if (operation === OPERATION.shiftRow) {
      leftCol.unshift(leftCol.pop());
      rows.unshift(rows.pop());
      rightCol.unshift(rightCol.pop());
    } else if (operation === OPERATION.rotate) {
      rows[0].unshift(leftCol.shift());
      rightCol.unshift(rows[0].pop());
      rows[ROW - 1].push(rightCol.pop());
      leftCol.push(rows[ROW - 1].shift());
    }
  }

  for (let i = 0; i < ROW; i++) {
    answer.push([leftCol[i], ...rows[i], rightCol[i]]);
  }

  return answer;
}

// 네 번째 풀이: Deque를 Array로 표현 + 중복되는 명령어의 갯수를 카운트한 후 제거 풀이
//  -> 91.7점(효율성에서 1개만 통과하지 못함...)
function solution(rc, operations) {
  const answer = [];

  const OPERATION = Object.freeze({
    shiftRow: "ShiftRow",
    rotate: "Rotate",
  });

  const ROW = rc.length;
  const COL = rc[0].length;

  const leftCol = [];
  const rightCol = [];
  const rows = [];

  for (let r = 0; r < ROW; r++) {
    leftCol.push(rc[r][0]);
    rightCol.push(rc[r][COL - 1]);
    rows.push(rc[r].slice(1, COL - 1));
  }

  let prev = null;
  let count = 0;
  const commandCount = [];
  for (const operation of operations) {
    if (prev === null || prev === operation) {
      count++;
    } else {
      commandCount.push([prev, count]);
      count = 1;
    }

    prev = operation;
  }
  commandCount.push([prev, count]);

  for (const [command, count] of commandCount) {
    if (command === OPERATION.shiftRow) {
      const moveCount = count % ROW;
      if (moveCount > 0) {
        for (let i = 0; i < count % ROW; i++) {
          leftCol.unshift(leftCol.pop());
          rows.unshift(rows.pop());
          rightCol.unshift(rightCol.pop());
        }
      }
    } else {
      const totalRotationCount = count % (2 * (ROW + COL - 2));
      if (totalRotationCount > 0) {
        for (let i = 0; i < totalRotationCount; i++) {
          rows[0].unshift(leftCol.shift());
          rightCol.unshift(rows[0].pop());
          rows[ROW - 1].push(rightCol.pop());
          leftCol.push(rows[ROW - 1].shift());
        }
      }
    }
  }

  for (let i = 0; i < ROW; i++) {
    answer.push([leftCol[i], ...rows[i], rightCol[i]]);
  }

  return answer;
}

solution(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  ["Rotate", "ShiftRow"]
); // [[8, 9, 6], [4, 1, 2], [7, 5, 3]]

solution(
  [
    [8, 6, 3],
    [3, 3, 7],
    [8, 4, 9],
  ],
  ["Rotate", "ShiftRow", "ShiftRow"]
); // [[8, 3, 3], [4, 9, 7], [3, 8, 6]]

solution(
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],
  ["ShiftRow", "Rotate", "ShiftRow", "Rotate"]
); // [[1, 6, 7 ,8], [5, 9, 10, 4], [2, 3, 12, 11]]
