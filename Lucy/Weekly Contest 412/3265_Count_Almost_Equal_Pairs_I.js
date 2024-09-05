/**
 * 3265. Count Almost Equal Pairs I
 * url: https://leetcode.com/problems/count-almost-equal-pairs-i/
 *
 * topic: Array, Hash Table, Sorting, Counting, Enumeration
 * difficulty: Medium
 * date: 2024.09.02(MON)
 */

/**
 * 두번째 풀이...
 * 아래 링크의 풀이를 참고하여 문제를 해결할 수 있었다.
 * 배열을 순회하며 각 원소 nums[i]와 nums[j]를 문자열로 변환한다.
 * 두 숫자의 자릿수를 맞추기 위해, 두 문자열의 최대 길이 maxLen을 구하고, 짧은 쪽에 앞에 "0"을 추가하여 길이를 동일하게 맞춘다.
 * 변환된 두 문자열을 자릿수별로 비교하여 서로 다른 위치의 갯수를 센다.
 * 각 문자열의 자릿수별로 빈도를 xMap과 yMap에 저장한다. 여기서 key는 각 자릿수의 숫자이고, value는 해당 숫자의 빈도다.
 * xMap과 yMap의 key와 value를 비교하여, 두 숫자가 동일한 자릿수에 동일한 빈도를 갖는지 확인한다.
 * 두 숫자를 비교했을 때, 다른 자릿수가 2개 이하이고, 모든 자릿수의 숫자 빈도가 동일하다면 두 숫자는 거의 동일하다고 판단한다.
 * 참고 풀이: https://leetcode.com/problems/count-almost-equal-pairs-i/discuss/5686683/Easy-to-understand-C%2B%2B-Solution
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  const MAX_DIFF_ALLOWED = 2;
  const ZERO = "0";

  let answer = 0;

  const numsLen = nums.length;

  const isSame = (s1, s2) => s1 === s2;
  const areAlomostEqual = (numStr1, numStr2) => {
    const maxLen = Math.max(numStr1.length, numStr2.length);

    numStr1 = ZERO.repeat(maxLen - numStr1.length) + numStr1;
    numStr2 = ZERO.repeat(maxLen - numStr2.length) + numStr2;

    let differentCnt = 0;
    const xMap = new Map();
    const yMap = new Map();

    for (let i = 0; i < numStr1.length; i++) {
      if (!isSame(numStr1[i], numStr2[i])) differentCnt++;

      xMap.set(numStr1[i], (xMap.get(numStr1[i]) || 0) + 1);
      yMap.set(numStr2[i], (yMap.get(numStr2[i]) || 0) + 1);
    }

    const isSameMap = [...xMap.entries()].every(
      ([key, value]) => yMap.get(key) === value
    );

    return differentCnt <= MAX_DIFF_ALLOWED && isSameMap;
  };

  for (let i = 0; i < numsLen; i++) {
    for (let j = i + 1; j < numsLen; j++) {
      const numStr1 = nums[i].toString();
      const numStr2 = nums[j].toString();

      if (areAlomostEqual(numStr1, numStr2)) answer++;
    }
  }
  return answer;
};

/**
 * 첫 번째 시도...
 *
 * Map 객체를 사용하여 nums 배열의 각 요소에 대해 각 자리 숫자의 빈도를 계산하였다.
 * nums[i]와 nums[j]가 한 번의 swap 연산을 통해 동일한 숫자가 될 수 있는 경우를 찾아 카운트하려고 했다.
 *
 * Status: Wrong Answer
 * 228 / 686 test cases passed.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs2 = function (nums) {
  let answer = 0;

  const numsLen = nums.length;

  // 각 숫자에 대해 각 자릿수의 빈도를 저장하기 위한 Map 객체
  const countMap = new Map();
  nums.map((n, i) => {
    const obj = {};

    // 숫자를 문자열로 변환한 후, 각 자릿수를 순회하며 빈도를 계산
    n.toString()
      .split("")
      .forEach((v) => (obj[v] ? (obj[v] += 1) : (obj[v] = 1)));
    countMap.set(i, obj);
  });

  // 두 숫자를 비교하여 동일한 자릿수를 찾고, swap으로 같은 숫자가 될 수 있는지 확인
  for (let i = 0; i < numsLen - 1; i++) {
    for (let j = i + 1; j < numsLen; j++) {
      let cnt = 0;
      // 첫 번째 숫자의 자릿수를 순회하면서 두 번째 숫자에도 동일한 자릿수가 있는지 확인
      for (const [k, v] of Object.entries(countMap.get(i))) {
        if (Object.keys(countMap.get(j)).includes(k.toString())) cnt++;
      }
      // 다른 자릿수가 2개 이하이고, 첫 번째 숫자의 모든 자릿수가 두 번째 숫자에 있으면 카운트
      if (cnt <= 2 && cnt === Object.entries(countMap.get(i)).length) answer++;
    }
  }
  return answer;
};

console.log(countPairs([3, 12, 30, 17, 21]));
console.log(countPairs([1, 1, 1, 1, 1]));
console.log(countPairs([123, 231]));
console.log(countPairs([5, 12, 8, 5, 5, 1, 20, 3, 10, 10, 5, 5, 5, 5, 1]));
console.log(countPairs([11, 13, 11, 14, 11]));
