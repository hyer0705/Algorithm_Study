/**
 * 3147. Taking Maximum Energy From the Mystic Dungeon
 * url: https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon/description/
 * Difficulty: Medium
 * Topic: dynamic programming
 * Date: 2024.05.12(SUN)
 */

/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function (energy, k) {
  const dp = new Array(energy.length).fill(0);

  for (let i = dp.length - 1; i >= 0; i--) {
    if (i + k > dp.length - 1) dp[i] = energy[i];
    else {
      dp[i] = energy[i] + dp[i + k];
    }
  }
  return Math.max(...dp);
};

console.log(maximumEnergy([-2, -3, -1], 2));
