/**
 * 345. Reverse Vowels of a String
 *
 * url: https://leetcode.com/problems/reverse-vowels-of-a-string/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * topic:
 * date: 2024.10.16(WED)
 */

function reverseVowels(s: string): string {
  const vowels = "AEIOUaeiou";
  const copied = [...s];

  const findVowelIndexes = [];
  for (let i = 0; i < s.length; i++) {
    if (vowels.includes(s[i])) {
      findVowelIndexes.push(i);
    }
  }

  const FINDVOWELINDEXES_LEN = findVowelIndexes.length;

  for (let i = 0; i < Math.floor(FINDVOWELINDEXES_LEN / 2); i++) {
    const [frontIdx, backIdx] = [
      findVowelIndexes[i],
      findVowelIndexes[FINDVOWELINDEXES_LEN - 1 - i],
    ];
    // swap
    [copied[frontIdx], copied[backIdx]] = [copied[backIdx], copied[frontIdx]];
  }

  return copied.join("");
}

console.log(reverseVowels("IceCreAm")); // "AceCreIm"
console.log(reverseVowels("leetcode")); // "leotcede"
