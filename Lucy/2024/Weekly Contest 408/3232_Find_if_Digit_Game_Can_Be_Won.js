/**
 * 3232. Find if Digit Game Can Be Won
 *
 * topic: Array, Math
 * difficulty: Easy
 * date: 24.07.29(MON)~
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function (nums) {
  const singleDigitSum = calcSigleDigitSum(nums);
  const doubleDigitSum = calcDoubleDigitSum(nums);

  if (singleDigitSum === doubleDigitSum) return false;
  if (singleDigitSum > doubleDigitSum || doubleDigitSum > singleDigitSum)
    return true;
};

const calcSigleDigitSum = (nums) =>
  nums.filter((n) => n < 10 && n >= 1).reduce((acc, curr) => acc + curr, 0);

const calcDoubleDigitSum = (nums) =>
  nums.filter((n) => n >= 10 && n <= 99).reduce((acc, curr) => acc + curr, 0);

console.log(canAliceWin([5, 5, 5, 25]));
