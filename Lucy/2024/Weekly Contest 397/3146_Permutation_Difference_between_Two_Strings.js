/**
 * 3146. Permutation Difference between Two Strings
 * URL: https://leetcode.com/problems/permutation-difference-between-two-strings/description/
 * Difficulty: Easy
 * Topic: ?
 * Date: 2024.05.12(SUN)
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var findPermutationDifference = function (s, t) {
  const sLen = s.length;
  let permutationDifference = 0;

  for (let i = 0; i < sLen; i++) {
    const findIdxInT = t.indexOf(s[i]);
    permutationDifference += Math.abs(i - findIdxInT);
  }

  return permutationDifference;
};
