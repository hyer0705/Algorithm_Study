/**
 * 3179. Find the N-th Value After K Seconds
 * URL: https://leetcode.com/problems/find-the-n-th-value-after-k-seconds/
 * DIFFICULTY: Medium
 * TOPIC: Array, Math, Simulation, Combinatorics, Prefix Sum
 * DATE: 2024.06.11(TUE)~
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var valueAfterKSeconds = function (n, k) {
  // 문제에 나온 'Since the answer may be very large, return it modulo 10^9 + 7.' 를 수행하기 위해 modulo를 담는 상수 MODULO 선언 및 초기화
  const MODULO = 10 ** 9 + 7;
  // 길이가 n이고 모든 요소가 1인 arr 선언 및 초기화
  const arr = new Array(n).fill(1);

  // k 초 반복문
  // 1초부터 시작! arr의 초기값을 1로 초기화했기 때문
  for (let second = 1; second <= k; second++) {
    // arr의 길이만큼 반복문을 돌려서 누적합을 구함
    // 누적합 공식 a[i] = (a[i - 1] + a[i]) % MODULO
    // MODULO의 나머지 연산을 해주는 이유는? 문제에 조건을 충족시키기 위함
    for (let i = 1; i < n; i++) {
      arr[i] = (arr[i - 1] + arr[i]) % MODULO;
    }
  }

  // arr[n-1] 반환
  return arr[n - 1];
};

valueAfterKSeconds(5, 1000);
