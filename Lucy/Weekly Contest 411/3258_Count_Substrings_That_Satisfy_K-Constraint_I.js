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

  for (let window = 1; window <= splited.length; window++) {
    for (let i = 0; i < splited.length && i + window <= splited.length; i++) {
      const substring = splited.slice(i, i + window);

      const oneCnt = substring.filter((n) => n === "1").length;
      const zeroCnt = substring.filter((n) => n === "0").length;

      if (zeroCnt <= k || oneCnt <= k) cnt++;
    }
  }

  return cnt;
};

console.log(countKConstraintSubstrings("10101", 1));
console.log(countKConstraintSubstrings("1010101", 2));
console.log(countKConstraintSubstrings("11111", 1));
