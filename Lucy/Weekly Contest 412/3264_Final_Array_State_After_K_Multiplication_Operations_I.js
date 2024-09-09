/**
 * 3264. Final Array State After K Multiplication Operations I
 * url: https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i/
 *
 * topic:
 * difficulty: Easy
 * date: 2024.08.27(TUE)~
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  for (let i = 0; i < k; i++) {
    const minN = Math.min(...nums);
    const idx = nums.findIndex((n) => n === minN);

    nums[idx] *= multiplier;
  }

  return nums;
};

console.log(getFinalState([2, 1, 3, 5, 6], 5, 2));
console.log(getFinalState([1, 2], 3, 4));
