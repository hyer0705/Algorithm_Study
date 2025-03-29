function solution(dice) {
  const N = dice.length;
  const diceCombination = combineDice(N, N / 2);

  let maxDiceCombination = [];
  let maxPoint = -Infinity;

  // 각각 가져간 주사위를 모두 굴린 뒤, 나온 수들을 모두 합해 점수를 계산
  for (const diceCase of diceCombination) {
    // A가 먼저 n / 2개의 주사위를 가져가면 B가 남은 n / 2개의 주사위를 가져갑니다.
    const aDice = diceCase;
    const bDice = Array.from({ length: N }, (_, i) => i + 1).filter((i) => !aDice.includes(i));

    // 각각 가져간 주사위를 모두 굴린 뒤, 나온 수들을 모두 합해 점수를 계산
    const arrA = sumOfDice(dice, aDice); // 6^(N/2) 가지의 합을 계산
    const arrB = sumOfDice(dice, bDice);

    // 점수를 계산
    const point = calculatePoint(arrA, arrB);

    if (point > maxPoint) {
      maxPoint = point;
      maxDiceCombination = aDice;
    }
  }

  return maxDiceCombination;
}

function combineDice(n, r) {
  const combinations = [];

  const backtrack = (start, combination) => {
    if (combination.length === r) {
      combinations.push([...combination]);
      return;
    }

    for (let i = start; i < n + 1; i++) {
      combination.push(i);
      backtrack(i + 1, combination);
      combination.pop();
    }
  };

  backtrack(1, []);

  return combinations;
}

function sumOfDice(dice, diceCase) {
  // 재귀함수
  const sums = [];
  const totalDice = diceCase.length;

  const recursive = (level, sum) => {
    if (level === totalDice) {
      sums.push(sum);
      return;
    }
    for (const face of dice[diceCase[level] - 1]) {
      recursive(level + 1, sum + face);
    }
  };

  recursive(0, 0);

  return sums;
}

function calculatePoint(arrA, arrB) {
  arrA.sort((a, b) => a - b);
  arrB.sort((a, b) => a - b);

  let winPoint = 0;
  let pointer = 0;

  arrA.forEach((sum) => {
    while (pointer < arrB.length && sum > arrB[pointer]) {
      pointer++;
    }
    winPoint += pointer;
  });

  return winPoint;
}

solution([
  [1, 2, 3, 4, 5, 6],
  [3, 3, 3, 3, 4, 4],
  [1, 3, 3, 4, 4, 4],
  [1, 1, 4, 4, 5, 5],
]); // [1, 4]
