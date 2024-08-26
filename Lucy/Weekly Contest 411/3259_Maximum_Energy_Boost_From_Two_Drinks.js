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
  // n === energyDrinkA.length === energyDrinkB.length
  const N = energyDrinkA.length;

  // energyDrinkA 부터 마시기 시작했을 때의 점화식
  const dpA = new Array(N).fill(0);
  dpA[0] = energyDrinkA[0];
  dpA[1] = dpA[0] + energyDrinkA[1];

  // energyDrinkB 부터 마시기 시작했을 때의 점화식
  const dpB = new Array(N).fill(0);
  dpB[0] = energyDrinkB[0];
  dpB[1] = dpB[0] + energyDrinkB[1];

  // dpA와 dpB 배열 요소 계산(N까지!)
  for (let i = 2; i < N; i++) {
    // i 번째 시간에 에너지 드링크 A를 선택했을 때 얻을 수 있는 최대 에너지를 뜻한다. 현재 에너지드링크 + Max(한시간 전에 에너지 드링크 A를 마셨을 때, 두시간 전에 에너지 들이크 B를 마셨을 때)
    dpA[i] = Math.max(dpA[i - 1], dpB[i - 2]) + energyDrinkA[i];
    // i 번째 시간에 에너지 드링크 B를 선택했을 때 얻을 수 있는 최대 에너지를 뜻한다. 현재 에너지드링크 + Max(한시간 전에 에너지 드링크 B를 마셨을 때, 두시간 전에 에너지 들이크 A를 마셨을 때)
    dpB[i] = Math.max(dpB[i - 1], dpA[i - 2]) + energyDrinkB[i];
  }

  return Math.max(dpA[N - 1], dpB[N - 1]);
};
