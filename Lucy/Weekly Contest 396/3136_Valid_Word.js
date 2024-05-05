/**
 * 2024년 05월 05일(SUN)
 * 3136. Valid Word(https://leetcode.com/problems/valid-word/description/)
 */

/**
 * @param {string} word
 * @return {boolean}
 */
var isValid = function (word) {
  const MIN_LEN = 3;

  const isMinLen = (word) => word.length >= MIN_LEN;
  const consistOfDigitEn = (word) => /^[\d|A-Z|a-z]+$/.test(word);
  const includesVowel = (word) =>
    word.toLowerCase().match(/[aeiou]/g)?.length >= 1;
  const includesConsonant = (word) =>
    word.toLowerCase().match(/[b-df-hj-np-tv-z]/g)?.length >= 1;

  if (!isMinLen(word)) return false;
  if (!consistOfDigitEn(word)) return false;
  if (!includesVowel(word)) return false;
  if (!includesConsonant(word)) return false;

  return true;
};
