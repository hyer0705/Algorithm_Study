/**
 * 1768. Merge Strings Alternately
 *
 * url: https://leetcode.com/problems/merge-strings-alternately/
 * difficulty: Easy
 * topic:
 * date: 2024.10.11(FRI)
 */

function mergeAlternately(word1: string, word2: string): string {
  let answer = "";
  for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
    word1[i] && (answer += word1[i]);
    word2[i] && (answer += word2[i]);
  }

  return answer;
}

console.log(mergeAlternately("abc", "pqr")); // apbqcr
console.log(mergeAlternately("ab", "pqrs")); // apbqrs
console.log(mergeAlternately("abcd", "qp"));
