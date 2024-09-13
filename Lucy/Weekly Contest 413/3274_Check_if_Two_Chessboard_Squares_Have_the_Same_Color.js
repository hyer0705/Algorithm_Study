/**
 * 3274. Check if Two Chessboard Squares Have the Same Color
 *
 * url: https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color/
 * topic: Math, String
 * difficulty: Easy
 * date: 2024.09.10(TUE)
 */

/**
 * @param {string} coordinate1
 * @param {string} coordinate2
 * @return {boolean}
 */
var checkTwoChessboards = function (coordinate1, coordinate2) {
  const getSquareColor = ([x, y]) => {
    const isEven = (coordinateY) => coordinateY % 2 === 0;
    const coordinateMap = new Map(
      Object.entries({
        a: { odd: "black", even: "white" },
        b: { odd: "white", even: "black" },
        c: { odd: "black", even: "white" },
        d: { odd: "white", even: "black" },
        e: { odd: "black", even: "white" },
        f: { odd: "white", even: "black" },
        g: { odd: "black", even: "white" },
        h: { odd: "white", even: "black" },
      })
    );
    return isEven(y) ? coordinateMap.get(x).even : coordinateMap.get(x).odd;
  };

  return (
    getSquareColor(coordinate1.split("")) ===
    getSquareColor(coordinate2.split(""))
  );
};

console.log(checkTwoChessboards("a1", "c3"));
console.log(checkTwoChessboards("a1", "h3"));
