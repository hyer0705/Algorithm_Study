/**
 * 3184. Count Pairs That Form a Complete Day I
 * URL: https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i/
 * TOPIC:
 * DIFFICULTY: EASY
 * DATE: 2024.06.18(TUE)~
 */

/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  const HOURS_LEN = hours.length;

  let completeDayCnt = 0;
  for (let i = 0; i < hours.length; i++) {
    for (let j = i + 1; j < hours.length; j++) {
      if ((hours[i] + hours[j]) % 24 === 0) completeDayCnt++;
    }
  }

  return completeDayCnt;
};

console.log(countCompleteDayPairs([12, 12, 30, 24, 24]));
