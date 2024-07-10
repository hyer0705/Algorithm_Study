/**
 * 3201. Find the Maximum Length of Valid Subsequence I
 * URL: https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i/
 * TOPIC:
 * DIFFICULTY: Medium
 * DATE: 2024.07.02(TUE)~
 */

/**
 * Discuss 탭에서 발견한 간단한 코드
 *
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
  // Math.max(sameParityCount, alternatingParityCount) 를 return 하는 함수
  // sameParityCount: 쭉 홀수 요소, 쭉 짝수 요소인 경우를 count
  // alternatingParityCount: 배열의 요소가 홀수-짝수가 번갈아 가면서 나오는 경우 count
  const countMaxLength = (nums, startWithOdd) => {
    let sameParityCount = 0;
    let alternatingParityCount = 0;

    let currentParity = startWithOdd;
    for (const num of nums) {
      // 짝수-홀수가 번갈아 가면서 나오는 경우 count
      if (num % 2 == currentParity) {
        alternatingParityCount++;
        currentParity = !currentParity; // parity 변경
      }

      // 같은 짝수 혹은 같은 홀수인 경우 count
      if (num % 2 == startWithOdd) {
        sameParityCount++;
      }
    }

    return Math.max(sameParityCount, alternatingParityCount);
  };

  // Math.max(홀수인 경우와 짝수-홀수 번갈아 가면서 나오는 경우, 짝수인 경우와 짝수-홀수 번갈아 가면서 나오는 경우)
  return Math.max(countMaxLength(nums, true), countMaxLength(nums, false));
};

/**
 * 600/951 test case Wrong Answer...
 * [1,8,4,2,4]
 */
// var maximumLength = function (nums) {
//   const dp = [];
//   dp[0] = nums[0];
//   dp[1] = nums[1];

//   let dpIdx = 2;
//   for (let i = 2; i < nums.length; i++) {
//     if ((dp[dpIdx - 2] + dp[dpIdx - 1]) % 2 === (dp[dpIdx - 1] + nums[i]) % 2) {
//       dp[dpIdx++] = nums[i];
//     }
//   }

//   console.log(dp);
//   return dp.length;
// };

console.log(maximumLength([1, 8, 4, 2, 4]));
