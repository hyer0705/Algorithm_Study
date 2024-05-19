/**
 * 3151. Special Array 1
 * URL: https://leetcode.com/problems/special-array-i/description/
 * TOPIC: Array
 * DIFFICULTY: EASY
 * DATE: 2024.05.19(SUN)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isArraySpecial = function (nums) {
  const EVEN = 0;
  const ODD = 1;

  // special array인지 결과값을 담는 res 변수 선언 및 초기화
  let res = true;

  // 배열의 첫 번째 요소의 parity의 값으로 초기화하고
  // for문 반복문에서 i index값의 이전 요소의 parity 값을 저장하는 변수 prev 선언
  let prev = nums[0] % 2 === 0 ? EVEN : ODD;

  // index 1부터 nums.length - 1까지 반복
  for (let i = 1; i < nums.length; i++) {
    // 현재 i 인덱스의 요소 값의 parity를 curr 변수에 저장
    let curr = nums[i] % 2 === 0 ? EVEN : ODD;

    // prev 변수와 curr 변수의 parity가 다르면 prev 변수 재할당
    if (prev !== curr) prev = curr;
    // prev 변수와 curr 변수의 parity가 다를 경우 special array의 기준에 맞지 않으므로 false return
    else {
      res = false;
      return res;
    }
  }

  return res;
};
