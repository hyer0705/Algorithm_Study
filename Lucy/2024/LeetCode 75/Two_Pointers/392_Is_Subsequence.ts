/**
 * 392. Is Subsequence
 *
 * url: https://leetcode.com/problems/is-subsequence/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * date: 2024.11.02(SAT)
 */

function isSubsequence(s: string, t: string): boolean {
  let sPointer = 0;
  let tPointer = 0;

  while (tPointer < t.length) {
    if (s[sPointer] === t[tPointer]) {
      sPointer++;
    }
    tPointer++;
  }

  return sPointer === s.length;
}

console.log(isSubsequence("abc", "ahbgdc")); // true
console.log(isSubsequence("axc", "ahbgdc")); // false
