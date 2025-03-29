/**
 * 3226. Number of Bit Changes to Make Two Integers Equal
 * url: https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal/
 * date: 2024.07.26(FRI)~
 * topic: Bit Manipulation
 * difficulty: Easy
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
  const IMPOSSIBLE = -1;

  const binaryN = decimalToBinary(n);
  const binaryK = decimalToBinary(k).padStart(binaryN.length, BINARY_ZERO);

  let bitChangeCnt = 0;

  const changedN = [...binaryN]
    .map((ch, i) => {
      if (ch === BINARY_ONE && binaryK[i] === BINARY_ZERO) {
        bitChangeCnt++;
        return BINARY_ZERO;
      }

      return ch;
    })
    .join("");

  if (changedN === binaryK) {
    return bitChangeCnt;
  } else {
    return IMPOSSIBLE;
  }
};

const decimalToBinary = (decimalNum) => {
  let binary = "";
  for (; decimalNum > 0; decimalNum >>= 1) {
    binary = (decimalNum & 1) + binary;
  }

  return binary || BINARY_ZERO;
};

const BINARY_ONE = "1",
  BINARY_ZERO = "0";

console.log(minChanges(13, 4));
