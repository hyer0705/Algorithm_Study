/**
 * 3233. Find the Count of Numbers Which Are Not Special
 *
 * topic: Array, Math, Number Theory
 * difficulty: Medium
 * date: 24.07.29(MON)~
 */

/**
 * 해당 문제는 주어진 숫자 범위에서 각 숫자가 가지는 약수의 갯수가 특별하지 않은 경우를 구해내는 문제
 *
 * 특별하지 않은 경우?
 *  약수에서 본인을 제외한 약수의 갯수가 2개 초과인 경우
 *
 * 특별한 경우?
 *  약수 중에서 소수의 제곱이 본인인 경우(Ex. 3^2 = 9)
 *
 * 아래 풀이에서는 에라토스테네스의 체를 사용하여 Math.sqrt(r)보다 작은 숫자들 중에 소수를 구한다
 *  > 소수의 제곱근으로 주어진 l과 r 범위에 있는 숫자인 경우를 카운트하여 특별한 경우의 갯수를 구한다
 *  > 주어진 l과 r 범위의 숫자의 총 갯수에서 특별한 숫자의 갯수를 뺀 값을 리턴한다
 *
 * 아래 풀이 참고
 * https://leetcode.com/problems/find-the-count-of-numbers-which-are-not-special/discuss/5546339/Sieve-of-Eratosthenes
 */
/**
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var nonSpecialCount = function (l, r) {
  // 소수를 구해야하는 최대 숫자를 담는 변수 limitN
  let limitN = Math.floor(Math.sqrt(r));

  // 에라토스테네스의 체를 사용하기 위해 isPrime이라는 true로 초기화 된 (limitN + 1)의 길이를 가진 배열 생성
  const isPrime = new Array(limitN + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  // 약수를 구함
  for (let i = 2; i * i <= limitN; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limitN; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // 특별한 숫자 카운트
  let specialNumCnt = 0;
  for (let i = 2; i <= limitN; i++) {
    if (isPrime[i]) {
      // 소수의 제곱근이 [l, r] 범위에 있는 경우에만 카운트
      const square = i * i;
      if (square >= l && square <= r) {
        specialNumCnt++;
      }
    }
  }

  const totalCnt = r - l + 1;
  const nonSpecialCnt = totalCnt - specialNumCnt;

  // 특별하지 않은 경우의 숫자 갯수 반환
  return nonSpecialCnt;
};
/**
 * 첫 번째 풀이
 * Status: Time Limit Exceeded.
 * 702 / 855 test cases passed.
 *
 * 아래 링크를 참고해서 약수 구하는 방법을 참고
 * https://www.geeksforgeeks.org/javascript-program-to-find-all-divisors-of-a-number/#method-3-optimised-approach
 */
/**
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var nonSpecialCount1 = function (l, r) {
  // 파라미터로 넘겨진 num을 제외한 약수의 갯수를 반환하는 함수
  const cntProperDivisors = (num) => {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        i !== num / i && num !== num / i && divisors.push(num / i);
      }
    }

    return divisors.length;
  };

  // [l, r] 범위를 순회하면서 cntProperDivisors() 함수를 호출하여 특별하지 않은 숫자일 경우 카운트
  let res = 0;
  for (let i = l; i <= r; i++) {
    if (cntProperDivisors(i) !== 2) res++;
  }

  return res;
};

console.log(nonSpecialCount(4, 16));

// 약수 구하는 법을 구해야할 거 같은뎀
// 미리 l~r 사이에 약수를 구해놓아야 하나?
