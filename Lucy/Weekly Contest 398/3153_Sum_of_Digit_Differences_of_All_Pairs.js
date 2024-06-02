/**
 * 3153. Sum of Digit Differences of All Pairs
 * URL: https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs/description/
 * TOPIC: Array, Hash Table, Math, Counting (홈페이지에 기재되어 있음)
 * DIFFICUTY: MEDIUM
 * DATE: 2024.05.19(SUN)
 */

/**
 * CountDigit * (n - CountDigit)
 * -> 첫번째 자리의 숫자 Digit = 1 인 경우, CountDigit은 첫번째 자리에서 Digit = 1의 갯수를 의미
 * -> n - CountDigit은 n(nums 배열의 요소 갯수) 에서 Digit = 1이 아닌 경우를 뜻함
 * -> CountDigit * (n - CountDigit) 은 Digit = 1과 Digit != 1 이 쌍을 이루는 경우의 수를 의미함
 *
 * 위 공식을 각 위치마다 적용해서 구한다
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var sumDigitDifferences = function (nums) {
  // nums 배열 길이를 저장하는 상수 NUMS_LEN 선언 및 초기화
  const NUMS_LEN = nums.length;
  // nums 배열의 각 요소의 길이가 동일하다고 가정했을 때, 그 길이를 저장하는 상수 NUM_LEN 선언 및 초기화
  const NUM_LEN = String(nums[0]).length;

  // digit differences 의 합을 저장할 변수 totalDigitDiff 선언 및 초기화
  let totalDigitDiff = 0;

  // nums의 배열의 요소의 길이만큼 반복
  for (let i = 0; i < NUM_LEN; i++) {
    // 각 숫자가 몇 번 나오는지 count 하기 위한 count 배열 선언 및 초기화(0~9까지 count 하기 위해 길이가 10인 배열 선언)
    const count = new Array(10).fill(0);

    // for of 문을 활용하여 nums 배열의 각 요소를 순회
    for (const n of nums) {
      // i 번째 자리의 숫자를 digit 이라는 변수에 할당
      const digit = +n.toString().charAt(i);

      // digit 변수를 활용하여 count 배열의 요소 1증가
      count[digit]++;
    }

    // reduce 메서드를 사용해서 count 배열의 요소를 순회하며 CountDigit * (n - CountDigit) 공식을 사용하여 계산
    totalDigitDiff += count.reduce(
      (acc, currVal) => acc + currVal * (NUMS_LEN - currVal),
      0
    );
  }

  // 모든 쌍을 2번씩 중복 계산하여 2로 나눈다(중복의 이유는 숫자 a와 숫자 b에 대해서 중복으로 계산되는 것을 위 코드에서 해결하지 않았기 때문)
  return totalDigitDiff;
};

sumDigitDifferences([13, 23, 12]);
