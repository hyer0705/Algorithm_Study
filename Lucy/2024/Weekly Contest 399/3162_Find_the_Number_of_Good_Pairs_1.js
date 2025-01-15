/**
 * 3162. Find the Number of Good Pairs 1
 * URL: https://leetcode.com/problems/find-the-number-of-good-pairs-i/description/
 * DIFFICULTY: Easy
 * TOPIC: Array
 * DATE: 2024.05.31(FRI)
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  // nums1, nums2 배열의 길이를 각각 N과 M 상수에 저장
  const N = nums1.length,
    M = nums2.length;

  // 정답을 저장할 변수 total 선언 및 0으로 초기화
  let total = 0;

  // 이중 for문을 사용하여 모든 (i, j) 를 탐색
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      // 문제에 해당되는 조건일 경우 total 값을 증가
      if (nums1[i] % (nums2[j] * k) === 0) total++;
    }
  }

  // total 반환
  return total;
};
