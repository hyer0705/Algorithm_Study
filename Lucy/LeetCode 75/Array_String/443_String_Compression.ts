/**
 * 443. String Compression
 *
 * url: https://leetcode.com/problems/string-compression/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.10.26(SAT)
 */

function compress(chars: string[]): number {
  const CHARS_LEN = chars.length;

  let s = "";

  let chCnt = 0;
  for (let i = 0; i < CHARS_LEN; i++) {
    const currCh = chars[i];

    if (isEmpty(s)) {
      s += currCh;
      chCnt += 1;
    } else if (s[s.length - 1] === currCh) {
      chCnt += 1;
    } else if (s[s.length - 1] !== currCh) {
      s += cntToStr(chCnt);
      chCnt = 1;
      s += currCh;
    }
  }
  s += cntToStr(chCnt);

  resetChar(chars);

  for (let i = 0; i < s.length; i++) {
    chars.push(s[i]);
  }

  return chars.length;
}

function isEmpty(s: string): boolean {
  return s.length === 0;
}

function cntToStr(cnt: number): string {
  return cnt === 1 ? "" : cnt.toString();
}

function resetChar(chars: string[]): void {
  while (chars.length > 0) {
    chars.pop();
  }
}

console.log(compress(["a", "a", "b", "b", "c", "c", "c"])); //["a","2","b","2","c","3"]
console.log(compress(["a"])); //["a"]
console.log(
  compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]) // ["a","b","1","2"]
);
console.log(compress(["a", "a", "a", "b", "b", "a", "a"])); // ["a","3","b","2","a","2"]
