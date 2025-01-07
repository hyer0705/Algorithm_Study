/**
 * 3202. Find the Maximum Length of Valid Subsequence II
 * URL: https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii/
 * TOPIC:
 * DIFFICULTY: Medium
 * DATE: 2024.07.02(TUE)~
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  // dp[i][remainder]의 의미?
  // dp[i][remainder]는 nums[i]에서 끝나고 [(nums[i] + nums[j]) % k == remainder]을 만족하는 `부분 수열의 최대 길이`를 나타냄
  // 이 부분 수열은 nums[i]를 마지막 요소로 갖는다는 의미
  // remainder는 0부터 k - 1까지의 값을 가질 수 있으며, 이는 `(nums[i] + nums[j]) % k`의 값입니다.

  // 크기가 nums.length * k 인 2차원 배열 생성
  // 1로 초기화하는 이유? 요소 하나를 부분 수열로 본다면, 길이가 1인 부분 수열 이기 때문! 요소의 값은 `부분 수열의 최대 길이`를 나타내기 때문
  const dp = Array.from({ length: nums.length }, (_) => new Array(k).fill(1));

  // 부분 수열의 최대 길이를 저장할 변수 maxLen
  let maxLen = 0;

  // nums 배열 순회
  for (let i = 0; i < nums.length; i++) {
    // i 인덱스 전까지 순회
    for (let j = 0; j < i; j++) {
      const remainder = (nums[j] + nums[i]) % k;

      // nums[i]에서 끝나고 [(nums[i] + nums[j]) % k == remainder]을 만족하는 `부분 수열의 최대 길이`
      dp[i][remainder] = Math.max(dp[i][remainder], dp[j][remainder] + 1);

      maxLen = Math.max(maxLen, dp[i][remainder]);
    }
  }

  return maxLen;
};

console.log(maximumLength([1, 4, 2, 3, 1, 4], 3));
