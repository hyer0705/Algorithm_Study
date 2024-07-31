/**
 * 3228. Maximum Number of Operations to Move Ones to the End
 * url: https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/
 * date: 2024.07.21(SUN)~
 * topic: String, Greedy, Counting
 * difficulty: Medium
 */

/**
 * 두번째 풀이
 *  참고한 풀이
 *      https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/discuss/5508962/Greedy
 *
 *  문제 이해
 *     숫자 `1`이 숫자 `0`의 오른쪽으로 이동하는 연산을 수행할 수 있습니다.
 *    이동은 다른 숫자 `1`을 만나거나 문자열의 끝까지 이동합니다.
 *
 *  풀이
 *      숫자 `0`을 만나기 전까지 숫자 `1`을 카운트한다
 *      각 `0`을 만날 때마다, 이전에 셌던 숫자 `1`의 갯수를 누적하여 이동 가능한 총 횟수를 구합니다.
 *      연속된 `0`은 한 번의 연산으로 `1`이 모두 이동할 수 있기 때문에 하나의 `0`만 고려하고 나머지는 스킵합니다.
 *          -> '1'이 이동할 때 '0'을 넘어야 합니다.
 *          -> '0'이 연속으로 여러 개 있을 때, 첫 번째 '0'만 고려해도 모든 '1'이 그 '0'들을 한꺼번에 넘어갈 수 있습니다.
 *          -> 따라서, '1'의 이동은 모든 연속된 '0'을 넘어가는 것이므로, 첫 번째 '0'에 대한 이동만 계산해도 충분합니다.
 */
/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  const sLen = s.length;
  let zeroCnt = 0;
  let ans = 0;

  for (let i = 0; i < sLen; i++) {
    if (s[i] === "0") {
      ans += zeroCnt;
      while (i < sLen && s[i] !== "1") {
        i++;
      }
    }
    zeroCnt++;
  }
  return ans;
};

// =====
/**
 * 첫번째 풀이...
 *  Status: Time Limit Exceeded
 *  658 / 694 test cases passed.
 *
 * 해당 문제는 오른쪽에 0이 위치한 숫자 1을 문자열의 끝으로 이동시키는 연산의 횟수를 세는 것으로 이해를 했습니다.
 * fromIdx: 숫자 1의 위치를 찾되 오른쪽에 0이 위치한 1의 인덱스 값
 * toIdx: fromIdx에 위치한 숫자 1을 문자열의 끝으로 이동시키기 위한 인덱스 값
 */
/**
 * @param {string} s
 * @return {number}
 */
var maxOperations_1 = function (s) {
  let copiedS = s.slice();
  let resCnt = 0;
  while (true) {
    const fromIdx = findIndexOfOneNextZero(copiedS, 0);
    if (isNotFound(fromIdx)) break;

    const toIdx = findNextIndexOfOne(copiedS, fromIdx + 1);

    copiedS = swapCharPosition(copiedS, fromIdx, toIdx);

    resCnt++;
  }

  return resCnt;
};

const NOT_FOUND = -1;

const findIndexOfOneNextZero = (str, startIdx) => {
  return str
    .split("")
    .findIndex((ch, idx, arr) => ch === "1" && arr[idx + 1] === "0");
};

const findNextIndexOfOne = (str, startIdx) => {
  const findIdx = str
    .split("")
    .findIndex((ch, idx) => idx >= startIdx && ch === "1");
  return findIdx === NOT_FOUND ? str.length : findIdx;
};

const isNotFound = (idx) => idx === NOT_FOUND;

const swapCharPosition = (str, fromIdx, toIdx) =>
  str.slice(0, fromIdx) +
  str.slice(fromIdx + 1, toIdx) +
  str[fromIdx] +
  str.slice(toIdx);

console.log(maxOperations("110"));
