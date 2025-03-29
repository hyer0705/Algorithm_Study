/**
 * 3289. The Two Sneaky Numbers of Digitville
 *
 * url: https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville/
 * difficulty: Easy
 * topic:
 * date: 2024.09.22(SUN)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  const cntMap = new Map();
  nums.forEach((n) =>
    cntMap.has(n) ? cntMap.set(n, cntMap.get(n) + 1) : cntMap.set(n, 1)
  );

  return Array.from(cntMap)
    .filter(([_, val]) => val > 1)
    .map(([key, _]) => key)
    .sort((a, b) => a - b);
};

console.log(getSneakyNumbers([0, 1, 1, 0])); // [0, 1]
console.log(getSneakyNumbers([0, 3, 2, 1, 3, 2])); // [2, 3]
console.log(getSneakyNumbers([7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2])); // [4, 5]
