/**
 *
 * 643. Maximum Average Subarray I
 *
 * url: https://leetcode.com/problems/maximum-average-subarray-i/
 * difficulty: Easy
 * date: 2024.11.06(WED)
 */

// 첫 번째 풀이
function findMaxAverage(nums: number[], k: number): number {
  let sum = nums.slice(0, k).reduce((acc, curr) => acc + curr, 0);
  let maxAverage = sum / k;

  for (let i = 1; i <= nums.length - k; i++) {
    sum += -nums[i - 1] + nums[i - 1 + k];
    const currentAverage = sum / k;

    maxAverage = Math.max(maxAverage, currentAverage);
  }

  return maxAverage;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75000
console.log(findMaxAverage([5], 1)); // 5
console.log(findMaxAverage([0, 1, 1, 3, 3], 4)); // 2.00000
console.log(findMaxAverage([4, 2, 1, 3, 3], 2)); // 3.00000
