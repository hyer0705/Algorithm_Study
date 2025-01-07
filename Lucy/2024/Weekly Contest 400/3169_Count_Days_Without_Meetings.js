/**
 * 3169. Count Days Without Meetings
 * URL: https://leetcode.com/problems/count-days-without-meetings/
 * TOPIC:
 * DIFFICULTY: Medium
 * DATE: 2024.06.03(MUN)
 */

/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */

/**
 * Discuss Tab에서 Line Sweep Algorithm을 사용하라는 Hint를 얻어서 Chat GPT에 해당 알고리즘을 물어보고 공부하여 풀이!
 *
 * Line Sweep Algorithm 이란?
 *  여러 이벤트가 시간 축 상에서 발생하는 경우를 효율적으로 처리하는 알고리즘
 *  이 알고리즘은 주로 회의 일정, 선분 겹침 문제, 직사각형 교차 등의 문제에서 많이 사용됨
 *
 * Line Sweep Algorithm의 기본 아이디어?
 *  시간 순서대로 사건을 정렬한 다음, 각 사건을 처리하면서 현재 상태를 유지하고 업데이트 하는 것
 *
 * 해당 문제를 `Line Sweep Algorithm`을 사용하여 풀기 위해서는 다음 단계를 따릅니다
 *  1. 이벤트 생성
 *      각 회의의 시작과 끝을 나타내는 이벤트를 생성합니다. 각 회의는 시작 이벤트와 끝 이벤트로 분리될 수 있습니다.
 *  2. 이벤트 정렬
 *      시작 이벤트와 끝 이벤트를 시간 순서대로 정렬합니다. 시간대가 같은 경우 시작 이벤트를 먼저 처리합니다.
 *  3. 이벤트 처리
 *      이벤트를 시간 순서대로 처리하면서 현재 진행 중인 회의의 수를 추적합니다. 회의가 없는 날을 카운트합니다.
 */
var countDays = function (days, meetings) {
  // 이벤트의 type인 "start" 와 "end" 를 각각 START, END 상수에 초기화
  const START = "start";
  const END = "end";

  // 이벤트를 저장할 배열 생성
  const events = [];

  // meetings 배열의 각 요소를 순회하며 이벤트 생성
  for (const [s, e] of meetings) {
    events.push([s, START]); // 시작일 이벤트 추가
    events.push([e + 1, END]); // e + 1의 의미? 끝난 다음 날을 나타냄. 종료일 이벤트 추가
  }

  // events 배열 정렬
  // [day, event type]
  events.sort((a, b) => {
    // 날짜가 다른 경우, 날짜 기준으로 정렬
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    // 날짜가 같은 경우, 이벤트 타입이 "start"가 "end"보다 앞에 오도록 정렬
    else {
      // a는 start type, b는 end type 일 경우 a가 먼저 오도록 음수 반환
      if (a[1] === START && b[1] === END) {
        return -1;
      }
      // a가 end type, b가 start type일 경우 b가 먼저 오도록 양수 반환
      else if (a[1] === END && b[1] === START) {
        return 1;
      }
      // 둘 다 같은 타입인 경우, 순서 변경 없음
      else {
        return 0;
      }
    }
  });

  // 회의가 없는 날을 저장할 변수 availableDays 선언 및 초기화
  let availableDays = 0;

  // 현재 진행 중인 meeting 수를 저장할 변수 currMeetings 선언 및 초기화
  let currMeetings = 0;

  // 현재 이벤트를 처리하기 전에 마지막으로 처리한 날짜를 저장하는 변수 prevDay 선언 및 초기화
  let prevDay = 1;

  // events 배열 순회
  for (const [day, type] of events) {
    // 이벤트를 마지막으로 처리한 날과 현재 이벤트의 날 사이에 회의가 없는 날을 계산
    if (prevDay < day) {
      // 현재 진행되는 회의가 없는 경우 availableDays에 비어있는 날 추가
      if (currMeetings === 0) availableDays += day - prevDay;

      // prevDay를 현재 이벤트의 날로 업데이트
      prevDay = day;
    }

    // type이 start 인 경우 현재 진행중인 회의 증가
    if (type === START) currMeetings++;
    // type이 end 인 경우 현재 진행중인 회의 감소
    else currMeetings--;
  }

  // 모든 이벤트가 처리된 후, 마지막 이벤트 날짜 이후부터 주어진 총 일수까지 회의가 없는 날을 계산
  if (prevDay <= days && currMeetings === 0)
    availableDays += days - prevDay + 1;

  // 회의가 없는 비어있는 날 반환
  return availableDays;
};

// Runtime Error... FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
// var countDays = function (days, meetings) {
//   const checkSchedule = new Array(days + 1).fill(false);

//   for (const [s, e] of meetings) {
//     for (let i = s; i <= e; i++) {
//       if (!checkSchedule[i]) checkSchedule[i] = true;
//     }
//   }

//   return checkSchedule.filter((v) => !v).length - 1;
// };

countDays(10, [
  [5, 7],
  [1, 3],
  [9, 10],
]);
