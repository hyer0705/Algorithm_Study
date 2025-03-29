/**
 * 3211. Generate Binary Strings Without Adjacent Zeros
 *
 * url: https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/
 * difficulty: Medium
 * topic: String, Bit Manipulation, Recursion
 * date: 2024.07.10(WED)~
 */

// backtracking 알고리즘을 구현한 함수
const backtracking = (currStr, validStrs, n) => {
  const isStrLenLessThanZero = (str) => str.length < 1;
  const isCharOne = (ch) => ch === "1";

  // currStr 변수의 길이
  const currStrLen = currStr.length;

  // currStr 변수의 길이가 n 인 경우(주어진 길이 n의 이진 문자열이 생성된 경우)
  if (currStrLen === n) {
    // validStrs 배열에 삽입
    validStrs.push(currStr);
    return;
  }

  // 이진 문자열이니까 "0"과 "1" 두가지 경우에 대해서 시도
  for (const ch of ["0", "1"]) {
    // IF, currStr 문자열의 길이가 0인 경우
    // IF, currStr 문자열의 마지막 문자가 "1"인 경우(연속으로 문자가 0이 붙어있으면 문제에서 요구한 길이 2 이사의 부분 문자열을 만들 때, 최소 1이 한 번 이상 나와야 한다는 것을 만족하지 않음)
    // IF, 현재 반복문에서 ch 변수에 담긴 문자가 "1"인 경우
    if (
      isStrLenLessThanZero(currStr) ||
      isCharOne(currStr[currStrLen - 1]) ||
      isCharOne(ch)
    ) {
      backtracking(currStr + ch, validStrs, n);
    }
  }
};

/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  const currStr = "";
  const validStrs = [];
  backtracking(currStr, validStrs, n);

  return validStrs;
};

console.log(validStrings(3));
