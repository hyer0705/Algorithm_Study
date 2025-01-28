function solution(n, tops) {
  const arrA = new Array(n + 1).fill(0);
  const arrB = new Array(n + 1).fill(0);

  arrA[0] = 0;
  arrB[0] = 1;

  for (let i = 1; i <= n; i++) {
    arrA[i] = arrA[i - 1] + arrB[i - 1];
    if (tops[i - 1] === 0) {
      arrB[i] = arrA[i - 1] + 2 * arrB[i - 1];
    } else if (tops[i - 1] === 1) {
      arrB[i] = 2 * arrA[i - 1] + 3 * arrB[i - 1];
    }
  }

  return (arrA[n] + arrB[n]) % 10007;
}

solution(2, [0, 1]);
