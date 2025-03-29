/**
 * 151. Reverse Words in a String
 *
 * url: https://leetcode.com/problems/reverse-words-in-a-string/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * topic:
 * date: 2024.10.16(WED)
 */

function reverseWords(s: string): string {
  const copied = s
    .trim()
    .split(" ")
    .filter((s) => s.length > 0);

  return copied.reverse().join(" ");
}

console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"
