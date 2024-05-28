/**
 * 3152. Special Array 2
 * URL: https://leetcode.com/problems/special-array-ii/description/
 * TOPIC: Prefix Sum
 * DIFFICUTY: MEDIUM
 * DATE: 2024.05.19(SUN)
 */

/**
 * Test Case 535 에서 Time Limit Exceeded...
 *
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const answer = [];

  const EVEN = 0,
    ODD = 1;
  const getParity = (val) => (val % 2 === 0 ? EVEN : ODD);

  for (const [from, to] of queries) {
    let res = true;
    for (let i = from + 1; i <= to; i++) {
      if (i - 1 >= 0) {
        if (getParity(nums[i - 1]) === getParity(nums[i])) {
          res = false;
          break;
        }
      }
    }
    answer.push(res);
  }
  return answer;
};

// ===================================================
/**
 * solution 확인 후 풀이!
 *
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const EVEN = 0,
    ODD = 1;

  // 배열의 요소의 값의 parity를 판별하는 함수
  const getParity = (val) => (val % 2 === 0 ? EVEN : ODD);

  // nums 배열의 인접한 요소들이 서로 다른 parity를 갖는지 확인 후 결과를 저장하는 배열 boolArr
  const boolArr = new Array(nums.length);
  boolArr[0] = true;

  // boolArr 값 계산
  for (let i = 1; i < boolArr.length; i++) {
    // getParity() 함수의 결과값이 다를 경우에만 true
    boolArr[i] = getParity(nums[i - 1]) !== getParity(nums[i]);
  }

  // boolArr 배열의 0번 인덱스부터 i-1 번 인덱스까지 특별한 쌍(인접한 배열의 요소가 서로 짝 홀로 같지 않은 쌍)의 개수를 누적한 값을 저장하는 배열 prefixSumArr
  const prefixSumArr = new Array(nums.length);
  prefixSumArr[0] = 0;
  for (let i = 1; i < prefixSumArr.length; i++) {
    prefixSumArr[i] = prefixSumArr[i - 1] + (boolArr[i] ? 1 : 0);
  }

  // query 구간의 결과값을 담을 배열 answer
  const answer = [];
  for (const [from, to] of queries) {
    // to - from: 구간 [from, to] 에서의 인접한 쌍의 개수
    // prefixSumArr[from] - prefixSumArr[to]: 구간[from, to] 에서 '특별한'쌍의 개수
    // to - from === prefixSumArr[to] - prefixSumArr[from] 인 경우에만 special array 조건 성립
    answer.push(to - from === prefixSumArr[to] - prefixSumArr[from]);
  }

  // query 구간의 결과값들을 담은 배열 answer 반환
  return answer;
};
