/**
 * 3185. Count Pairs That Form a Complete Day II
 * URL: https://leetcode.com/problems/count-pairs-that-form-a-complete-day-ii/
 * TOPIC: Array, Hash Table, Counting
 * DIFFICULTY: MEDIUM
 * DATE: 2024.06.18(TUE)~
 */

/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  // 1 day = 24 hours
  const DAY_TO_HOURS = 24;

  // hours 배열의 시간들을 24 hours로 나눴을 때의 나머지 값들을 저장하는 배열 remainders 선언 및 초기화
  // 길이가 24인 이유? 24로 나눴을 경우 나머지 값은 0~23이 나오기 때문
  const remainders = new Array(DAY_TO_HOURS).fill(0);

  // complete day 쌍의 갯수를 저장할 변수 completeDayCnt 선언 및 초기화
  let completeDayCnt = 0;
  // for ... of문을 통해 hours의 요소 순회
  for (const h of hours) {
    // hours의 각 요소를 24 hours로 나눈 나머지의 값을 저장하는 remainder 변수 선언 및 초기화
    const remainder = h % DAY_TO_HOURS;
    // remainder에서 완성할 24 hours의 보완 값 complement 변수 선언 및 초기화(remainder + complement = 24가 되게 만들어야 함)
    const complement = (DAY_TO_HOURS - remainder) % DAY_TO_HOURS;

    // complete day 쌍의 갯수 추가
    // remainders 배열에서 현재 `h`와 쌍을 이룰 수 있는 이전의 나머지 값의 빈도를 찾아서 추가
    completeDayCnt += remainders[complement];

    // remainders 배열에서 remainder 갯수 증가
    remainders[remainder]++;
  }

  // complete day 쌍의 갯수 반환
  return completeDayCnt;
};

countCompleteDayPairs([72, 48, 24, 3]);
