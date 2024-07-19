/**
 * 3216. Lexicographically Smallest String After a Swap
 * url: https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap/
 * topic: String, Greedy
 * difficulty: Easy
 * date: 2024-07-18(THU)~
 */

const isSameParity = (prevDigit, nextDigit) => prevDigit % 2 === nextDigit % 2;

const isGreaterThan = (prevDigit, nextDigit) => prevDigit > nextDigit;

/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  let swapCnt = 0;
  let res = s.slice(0);

  for (let i = 1; swapCnt < 1 && i < s.length; i++) {
    const [prev, next] = [s[i - 1], s[i]];

    if (isSameParity(prev, next) && isGreaterThan(prev, next)) {
      res = s.slice(0, i - 1) + next + prev + s.slice(i + 1);
      swapCnt++;
    }
  }

  return res;
};

console.log(getSmallestString("001"));
