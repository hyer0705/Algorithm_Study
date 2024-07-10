/**
 * 3200. Maximum Height of a Triangle
 * URL: https://leetcode.com/problems/maximum-height-of-a-triangle/
 * TOPIC:
 * DIFFICULTY: EASY
 * DATE: 2024.07.02(TUE)~
 */

/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function (red, blue) {
  const calcHeightOfTriangle = (startColor, red, blue) => {
    const isColorPossible = (color, row) => color >= row;

    let currColor = startColor;
    let height = 0;

    for (
      let row = 1;
      (currColor === "r" && isColorPossible(red, row)) ||
      (currColor === "b" && isColorPossible(blue, row));
      row++
    ) {
      if (currColor === "r") {
        currColor = "b";
        red -= row;
      } else if (currColor === "b") {
        currColor = "r";
        blue -= row;
      }
      height = row;
    }
    return height;
  };
  // red가 top인 경우: red - blue - red - blue
  const resOfRedTop = calcHeightOfTriangle("r", red, blue);

  // blue가 top인 경우
  const resOfBlueTop = calcHeightOfTriangle("b", red, blue);

  return Math.max(resOfRedTop, resOfBlueTop);
};

console.log(maxHeightOfTriangle(10, 1));
