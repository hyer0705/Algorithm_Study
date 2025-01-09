function solution(dice) {
  const N = dice.length;
  const combination = combine(N, N / 2);

  return rollDice(dice, combination);
}

function combine(n, r) {
  const results = [];

  const backtrack = (start, result) => {
    if (result.length === r) {
      results.push([...result]);
      return;
    }

    for (let i = start; i < n + 1; i++) {
      result.push(i);
      backtrack(i + 1, result);
      result.pop();
    }
  };

  backtrack(1, []);

  return results;
}

function rollDice(dice, combination) {
  let maxDice = [];
  let maxWin = -Infinity;

  for (let i = 0; i < combination.length / 2; i++) {
    const aDice = combination[i];
    const bDice = combination[combination.length - i - 1];

    const sumOfaDice = calculateSum(dice, aDice);
    const sumOfbDice = calculateSum(dice, bDice);

    const win = calculateWin(sumOfaDice, sumOfbDice);

    maxWin = Math.max(maxWin, ...win);

    if (maxWin === win[0]) {
      maxDice = aDice;
    } else if (maxWin === win[1]) {
      maxDice = bDice;
    }
  }

  return maxDice;
}

function calculateSum(dice, indices) {
  const arr = [];

  const recursive = (level, sum) => {
    if (level === indices.length) {
      arr.push(sum);
      return;
    }

    for (const face of dice[indices[level] - 1]) {
      recursive(level + 1, sum + face);
    }
  };

  recursive(0, 0);

  return arr;
}

function calculateWin(aDice, bDice) {
  aDice.sort((a, b) => a - b);
  bDice.sort((a, b) => a - b);

  const countWin = (sortedA, sortedB) => {
    let count = 0;
    let pointer = 0;

    for (const sum of sortedA) {
      while (pointer < sortedB.length && sortedB[pointer] < sum) {
        pointer++;
      }
      count += pointer;
    }

    return count;
  };

  const countRes = [countWin(aDice, bDice), countWin(bDice, aDice)];

  return countRes;
}

console.log(
  solution([
    [1, 2, 3, 4, 5, 6],
    [3, 3, 3, 3, 4, 4],
    [1, 3, 3, 4, 4, 4],
    [1, 1, 4, 4, 5, 5],
  ])
); // [1, 4]

console.log(
  solution([
    [1, 2, 3, 4, 5, 6],
    [2, 2, 4, 4, 6, 6],
  ])
); // [2]

console.log(
  solution([
    [40, 41, 42, 43, 44, 45],
    [43, 43, 42, 42, 41, 41],
    [1, 1, 80, 80, 80, 80],
    [70, 70, 1, 1, 70, 70],
  ])
); // [1,3]
