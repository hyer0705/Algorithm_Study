/**
 * 3280. Convert Date to Binary
 *
 * url: https://leetcode.com/problems/convert-date-to-binary/description/
 * difficulty: Easy
 * topic: Math, String
 * date: 2024.09.17(TUE)
 */

/**
 * @param {string} date
 * @return {string}
 */
var convertDateToBinary = function (date) {
  const [year, month, day] = date.split("-").map(Number);
  return `${year.toString(2)}-${month.toString(2)}-${day.toString(2)}`;
};

console.log(convertDateToBinary("2080-02-29")); // "100000100000-10-11101"
console.log(convertDateToBinary("1900-01-01")); // "11101101100-1-1"
