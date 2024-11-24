/**
 * 1732. Find the Highest Altitude
 *
 * url: https://leetcode.com/problems/find-the-highest-altitude/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * date: 2024.11.24(SUN)
 */

function largestAltitude(gain: number[]): number {
  const altitude = [0];

  for (let i = 0; i < gain.length; i++) {
    altitude.push(altitude[i] + gain[i]);
  }

  return Math.max(...altitude);
}

console.log(largestAltitude([-5, 1, 5, 0, -7])); // 1
console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2])); // 0
