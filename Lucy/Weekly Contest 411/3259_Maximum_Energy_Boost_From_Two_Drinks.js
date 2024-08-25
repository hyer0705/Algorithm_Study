/**
 * 3259. Maximum Energy Boost From Two Drinks
 * url: https://leetcode.com/problems/maximum-energy-boost-from-two-drinks/
 *
 * topic: Array, Dynamic Programming
 * difficulty: Medium
 * date: 2024.08.23(FRI)~
 */

/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const N = energyDrinkA.length;

  const dpA = new Array(N).fill(0);
  dpA[0] = energyDrinkA[0];
  dpA[1] = dpA[0] + energyDrinkA[1];

  const dpB = new Array(N).fill(0);
  dpB[0] = energyDrinkB[0];
  dpB[1] = dpB[0] + energyDrinkB[1];

  for (let i = 2; i < N; i++) {
    dpA[i] = Math.max(dpA[i - 1], dpB[i - 2]) + energyDrinkA[i];
    dpB[i] = Math.max(dpB[i - 1], dpA[i - 2]) + energyDrinkB[i];
  }

  return Math.max(dpA[N - 1], dpB[N - 1]);
};
