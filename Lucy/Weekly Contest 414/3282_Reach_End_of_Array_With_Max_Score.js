/**
 * 3282. Reach End of Array With Max Score
 *
 * url: https://leetcode.com/problems/reach-end-of-array-with-max-score/
 * difficulty: Medium
 * topic: Array, Greedy
 * date: 2024.09.18(WED)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumScore = function (nums) {
  let i = 0;
  let j = 1;

  let score = 0;
  while (i < nums.length && j < nums.length) {
    if (nums[i] < nums[j]) {
      score = score + (j - i) * nums[i];
      i = j;
    }
    j++;
  }

  if (i < nums.length - 1) {
    score = score + (nums.length - 1 - i) * nums[i];
  }

  return score;
};

console.log(findMaximumScore([1, 3, 1, 5])); // 7
console.log(findMaximumScore([4, 3, 1, 3, 2])); // 16
console.log(findMaximumScore([1, 6, 1])); // 7
