/**
 * 1431. Kids With the Greatest Number of Candies
 *
 * url: https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * topic:
 * date: 2024.10.11(FRI)
 */

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const CANDIES_LEN = candies.length;
  const res = new Array(CANDIES_LEN);

  for (let i = 0; i < CANDIES_LEN; i++) {
    const calculated = candies[i] + extraCandies;
    const copied = [...candies];
    copied[i] = calculated;

    res[i] = calculated === Math.max(...copied);
  }

  return res;
};

console.log(kidsWithCandies([2, 3, 5, 1, 3], 3));
