/**
 * 100296. Permutation Difference between Two Strings
 * url: https://leetcode.com/contest/weekly-contest-397/problems/permutation-difference-between-two-strings/
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
