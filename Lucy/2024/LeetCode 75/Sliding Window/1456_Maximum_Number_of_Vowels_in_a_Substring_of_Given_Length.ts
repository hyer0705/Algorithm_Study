/**
 * 1456. Maximum Number of Vowels in a Substring of Given Length
 *
 * url: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.11.06(수)
 */

function maxVowels(s: string, k: number): number {
  const vowels = "aeiou";

  let slicedS = s.slice(0, k);
  let currentVowelCount = [...slicedS].filter((ch) => vowels.includes(ch)).length;
  let maxVowelCount = currentVowelCount;

  for (let i = 1; i < s.length - k + 1; i++) {
    if (vowels.includes(s[i - 1])) currentVowelCount -= 1;
    if (vowels.includes(s[i + k - 1])) currentVowelCount += 1;

    maxVowelCount = Math.max(maxVowelCount, currentVowelCount);
  }

  return maxVowelCount;
}

console.log(maxVowels("abciiidef", 3)); // 3
console.log(maxVowels("aeiou", 2)); // 2
console.log(maxVowels("leetcode", 3)); // 2
