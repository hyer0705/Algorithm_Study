/**
 * 3178. Find the Child Who Has the Ball After K Seconds
 * URL: https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds/
 * DIFFICULTY: Easy
 * TOPIC:
 * DATE: 2024.06.10(MON)~
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfChild = function (n, k) {
  // 현재 공을 가지고 있는 학생의 번호를 담는 변수 student 선언 및 초기화
  let student = 0;
  // 공을 패스할 방향을 담는 변수 direction, 1은 정방향, -1은 역방향
  let direction = 1;

  // k 초만큼 반복
  // second가 1부터 시작하는 이유? 1초가 흐른 후부터 시작하는 것을 의미함. student 번호에 0부터 시작하기 때문에
  for (let second = 1; second <= k; second++) {
    // 공을 패스
    student += direction;
    // 공을 가진 학생이 0 또는 n-1번째 학생일 때, direction 변경
    if (student === n - 1 || student === 0) direction *= -1;
  }

  // 공을 가지고 있는 학생 번호 반환
  return student;
};

numberOfChild(3, 5);
