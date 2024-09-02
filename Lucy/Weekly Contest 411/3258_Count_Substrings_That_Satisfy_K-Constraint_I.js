/**
 * 3258. Count Substrings That Satisfy K-Constraint I
 * url: https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i/
 *
 * topic: String, Sliding Window
 * difficulty: Easy
 * date: 2024.08.23(FRI)~
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKConstraintSubstrings = function (s, k) {
  const splited = s.split("");
  let cnt = 0;

  // substring의 길이를 1부터 s의 길이까지 반복
  for (let subStrLen = 1; subStrLen <= splited.length; subStrLen++) {
    // substring을 비교하는 반복문
    for (
      let i = 0;
      i < splited.length && i + subStrLen <= splited.length;
      i++
    ) {
      const substring = splited.slice(i, i + subStrLen);

      // 0 갯수 카운트
      const oneCnt = substring.filter((n) => n === "1").length;
      // 1 갯수 카운트
      const zeroCnt = substring.filter((n) => n === "0").length;

      // K-Constraints에 해당되는지 확인
      if (zeroCnt <= k || oneCnt <= k) cnt++;
    }
  }

  return cnt;
};

console.log(countKConstraintSubstrings("10101", 1));
console.log(countKConstraintSubstrings("1010101", 2));
console.log(countKConstraintSubstrings("11111", 1));
