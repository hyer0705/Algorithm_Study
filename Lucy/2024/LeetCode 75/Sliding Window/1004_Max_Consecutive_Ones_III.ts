/**
 * 1004. Max Consecutive Ones III
 *
 * url: https://leetcode.com/problems/max-consecutive-ones-iii/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.11.23(SAT)
 */

function longestOnes(nums: number[], k: number): number {
  let maxLen = 0;
  let i = 0;
  let j = 0;
  let flipCount = 0;

  while (j < nums.length) {
    while (flipCount > k) if (nums[i++] === 0) flipCount--;

    if (nums[j] === 0) flipCount++;
    if (flipCount <= k) maxLen = Math.max(maxLen, j - i + 1);

    j++;
  }
  return maxLen;
}

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
console.log(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)); // 10
