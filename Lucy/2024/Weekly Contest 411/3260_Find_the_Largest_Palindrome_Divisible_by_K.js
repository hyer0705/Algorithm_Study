/**
 * 3260. Find the Largest Palindrome Divisible by K
 * url: https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k/
 *
 * topic: Math, String, Dynamic Programming, Greedy, Number Theory
 * difficulty: Hard
 * date: 2024.08.23(FRI)~
 */

// [Status: Time Limit Exceeded] 79 / 632 test cases passed.
// 9자리 숫자가 되면...시간 복잡도가 급격하게 증가하나 보다!
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var largestPalindrome = function (n, k) {
  const isPalindrome = (num) => {
    if (num.length === 1) return num;

    let s = 0,
      e = num.length - 1;
    while (s <= e) {
      if (num[s] !== num[e]) return false;
      s++;
      e--;
    }

    return true;
  };

  let largest = Math.floor(Number("9".repeat(n)) / k) * k;
  let smallest = Number("1" + "0".repeat(n - 1));

  for (let n = largest; n >= smallest; n -= k) {
    const nStr = String(n);
    if (isPalindrome(nStr)) return nStr;
  }

  return -1;
};

console.log(largestPalindrome(1, 4));
console.log(largestPalindrome(3, 5));
console.log(largestPalindrome(5, 6));
