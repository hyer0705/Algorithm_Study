/**
 * 3194. Minimum Average of Smallest and Largest Elements
 * URL: https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements/
 * DIFFICULTY: Easy
 * TOPIC:
 * DATE: 2024.06.25(TUE)~
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  // nums 배열을 얕은 복사한 배열을 오름차순으로 정렬하여 copied 변수에 저장
  let copied = [...nums].sort((a, b) => a - b);
  // 계산된 average 값들을 저장할 배열 avgs 선언 및 초기화
  const avgs = [];

  // copied 배열이 빈 배열일 때까지 반복
  while (copied.length > 0) {
    // copied 배열에서 최솟값을 저장할 변수 minElement 선언 및 초기화
    const minElement = copied[0];
    // copied 배열에서 최댓값을 저장할 변수 maxElement 선언 및 초기화
    const maxElement = copied[copied.length - 1];

    // minElement와 maxElement의 평균 값을 저장할 변수 avg 선언 및 초기화
    const avg = (minElement + maxElement) / 2;

    // copied 배열에서 minElement, maxElement 제거
    copied = copied.slice(1, copied.length - 1);
    // 계산된 average를 avgs 배열에 삽입
    avgs.push(avg);
  }

  // avgs 배열에서 최소 average 값 반환
  return Math.min(...avgs);
};

minimumAverage([7, 8, 3, 4, 15, 13, 4, 1]);
