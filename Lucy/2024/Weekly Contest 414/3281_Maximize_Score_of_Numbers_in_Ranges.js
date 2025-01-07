/**
 * 3281. Maximize Score of Numbers in Ranges
 *
 * url: https://leetcode.com/problems/maximize-score-of-numbers-in-ranges/
 * difficulty: Medium
 * topic: Array, Binary Search, Greedy, Sorting
 * date: 2024.09.17(TUE)
 */

/**
 * 참고한 정답 풀이: https://leetcode.com/problems/maximize-score-of-numbers-in-ranges/discuss/5753373/Easy-oror-Binary-Search-oror-simple-solution-oror-beat-100
 */

const isValid = (start, d, mid) => {
  let prev = start[0]; // 첫 번째 구간의 시작값으로 시작
  for (let i = 1; i < start.length; i++) {
    /**
     * 다음 숫자 선택:
     * 이후 구간들에서는 prev + mid와 start[i] 중 더 큰 값을 선택
     * 왜냐하면: prev + mid는 이전 구간에서 선택된 숫자(prev)와 최소 mid만큼의 차이를 유지해야 하므로
     *      prev에서 mid만큼 더한 값이 적절한 선택
     *      하지만 이 값이 구간의 시작값(start[i])보다 작을 수 있기 때문에,
     *      두 값 중 더 큰 값을 선택해야 합니다.
     */
    const next = Math.max(prev + mid, start[i]);

    // 선택한 값이 현재 구간의 끝을 초과하면 mid는 유효하지 않음
    if (next > start[i] + d) return false;

    // 다음 구간을 위해 prev 업데이트
    prev = next;
  }
  return true;
};

/**
 * @param {number[]} start
 * @param {number} d
 * @return {number}
 */
var maxPossibleScore = function (start, d) {
  let answer = 0;
  start.sort((a, b) => a - b);

  let lo = 0,
    hi = start[start.length - 1] - start[0] + d;
  // hi: start 배열의 가장 마지막 값 - start 배열의 첫 번째 값 + d

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isValid(start, d, mid)) {
      answer = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return answer;
};

//  첫 번째 정수는 start[0]이어야 하며, 이후의 각 정수는 [start[i], start[i] + d]에서 last_chosen_value보다 큰 가장 작은 정수여야 합니다.
console.log(maxPossibleScore([6, 0, 3], 2)); // 4
console.log(maxPossibleScore([2, 6, 13, 13], 5)); // 5
console.log(maxPossibleScore([0, 9, 2, 9], 2)); // 2
