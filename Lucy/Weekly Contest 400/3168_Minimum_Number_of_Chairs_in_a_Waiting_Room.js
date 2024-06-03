/**
 * 3168. Minimum Number of Chairs in a Waiting Room
 * URL: https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room/
 * TOPIC:
 * DIFFICULTY: EASY
 * DATE: 2024.06.03(MUN)
 */

/**
 * @param {string} s
 * @return {number}
 */

// Hint 2: The answer is the maximum number of people in the waiting room at any instance.
// 위 힌트를 보고 해결 방법을 생각했다!
var minimumChairs = function (s) {
  // "E" 를 저장하는 상수 E 선언 및 초기화
  const E = "E";

  // "L" 을 저장하는 상수 L 선언 및 초기화
  const L = "L";

  // 현재 room에서 기다리고 있는 사람의 수를 저장할 변수 room 선언 및 초기화
  let room = 0;
  // room에서 최대 기다렸던 사람의 수를 저장할 변수 max를 선언 및 -Infinity 값으로 초기화
  let max = -Infinity;

  // s 길이만큼 반복
  for (let i = 0; i < s.length; i++) {
    // s[i] 의 값이 "E" 인 경우
    if (s[i] === E) {
      // room 증가
      room++;

      // max 변수와 현재 방에서 기다리는 사람의 수를 저장하고 있는 room 변수 비교
      // max 가 room보다 작은 경우 room에 저장된 값을 max에 재할당
      if (max < room) max = room;
    }
    // s[i] 의 값이 "L" 인 경우
    else if (s[i] === L) {
      // room 감소
      room--;
    }
  }

  // room에서 가장 많은 사람이 기다렸던 순간을 저장한 max 변수 반환
  return max;
};

const res = minimumChairs("ELEELEELLL");
