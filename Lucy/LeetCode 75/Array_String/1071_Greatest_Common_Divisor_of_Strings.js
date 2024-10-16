/**
 * 1071. Greatest Common Divisor of Strings
 *
 * url: https://leetcode.com/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * topic:
 * date: 2024.10.11(FRI)
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  let answer = "";

  const isDivided = (str, divisor) =>
    str.split(divisor).filter((s) => s.length !== 0).length === 0;

  const shorter = str1.length > str2.length ? str2 : str1;

  for (let i = 0; i < shorter.length; i++) {
    const divisor = shorter.slice(0, i + 1);
    if (isDivided(str1, divisor) && isDivided(str2, divisor)) answer = divisor;
  }
  return answer;
};

console.log(gcdOfStrings("ABCABC", "ABC")); // ABC
console.log(gcdOfStrings("ABABAB", "ABAB")); // AB
console.log(gcdOfStrings("LEET", "CODE")); // ""
console.log(gcdOfStrings("ABABABAB", "ABAB")); // "ABAB"
