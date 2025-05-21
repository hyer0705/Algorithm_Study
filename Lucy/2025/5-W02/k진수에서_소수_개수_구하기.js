function isPrime(x) {
  if (x < 2) return false;

  for (let i = 2; i ** 2 <= x; i++) {
    if (x % i === 0) return false;
  }

  return true;
}

function solution(n, k) {
  let count = 0;

  let toK = n.toString(k);
  const splitted = toK
    .split("0")
    .filter((numStr) => numStr.length > 0 && numStr != 1)
    .map(Number);

  for (const number of splitted) {
    if (isPrime(number)) count++;
  }

  return count;
}

solution(437674, 3); // 3
solution(110011, 10); // 2
