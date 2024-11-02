/**
 * 334. Increasing Triplet Subsequence
 *
 * url: https://leetcode.com/problems/increasing-triplet-subsequence/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.10.26(SAT)
 */

// 참고한 풀이: https://leetcode.com/problems/increasing-triplet-subsequence/discuss/4462160/JAVA-C%2B%2B-oror-O(n)-oror-Simple-Easy-Solution-oror-Step-By-Step-Explanation
function increasingTriplet(nums: number[]): boolean {
  let a = Infinity;
  let b = Infinity;

  for (const num of nums) {
    if (a >= num) {
      a = num;
    } else if (b >= num) {
      b = num;
    } else {
      return true;
    }
  }

  return false;
}

// 첫 번째 풀이: Wrong Answer(77 / 84 test cases passed)
/*
function increasingTriplet(nums: number[]): boolean {
  const isIncreases = new Array(nums.length - 1).fill(false); // isIncreases[i] = i < i + 1
  isIncreases[0] = true;

  for (let i = 0; i < isIncreases.length; i++) {
    isIncreases[i] = nums[i] < nums[i + 1];
  }

  return isIncreases.filter((isIncrease) => isIncrease).length >= 2;
}
*/

console.log(increasingTriplet([1, 2, 3, 4, 5])); // true
console.log(increasingTriplet([5, 4, 3, 2, 1])); // false
console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // true
console.log(increasingTriplet([2, 4, -2, -3])); // false
console.log(increasingTriplet([20, 100, 10, 12, 5, 13])); // true
console.log(increasingTriplet([6, 7, 1, 2])); // false
