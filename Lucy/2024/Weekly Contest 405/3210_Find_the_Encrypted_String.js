/**
 * 3210. Find the Encrypted String
 *
 * url: https://leetcode.com/problems/find-the-encrypted-string/
 * difficulty: Easy
 * topic:
 * date: 2024.07.10(WED)~
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var getEncryptedString = function (s, k) {
  let encryptedStr = "";

  const sLen = s.length;
  for (let i = 0; i < sLen; i++) {
    encryptedStr += s[(i + k) % sLen];
  }

  return encryptedStr;
};

getEncryptedString("dart", 3);
