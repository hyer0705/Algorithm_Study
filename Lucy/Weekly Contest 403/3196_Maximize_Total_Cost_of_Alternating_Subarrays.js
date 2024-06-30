/**
 * 3196. Maximize Total Cost of Alternating Subarrays
 * URL: https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays/
 * DIFFICULTY: Medium
 * TOPIC: Array, Dynamic Programming
 * DATE: 2024.06.29(FRI)~
 */

/**
 * 사실 문제를 이해조차 하지 못했습니다. Discuss에서 가장 인기 있는 글의 풀이를 보고 공부했습니다.
 * 참고한 풀이: https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays/discuss/5355138/Dynamic-programming-and-space-optimized.-Beats-100-easy-to-understand.
 *
 * 해당 풀이를 이해한 대로 정리해보았습니다.
 * * 각 숫자에 대해 이전 결과에 더하거나 빼는 두 가지 선택 사항이 있습니다.
 * * addCost, subtractCost 라는 두개의 상태를 사용할 것입니다.
 *
 * Add와 Subtract 두가지 연산
 * * Add: 이전 결과는 중요하지 않으므로 addCost와 subtractCost 중 더 큰 상태에 현재 요소를 더합니다
 * * Subtract: addCost 상태에서 현재 요소를 뺍니다. addCost에서 빼는 이유는 addCost > subCost 일 경우가 높기 때문에 이 문제는 비용의 최댓값을 구하는 것이기 때문에 addCost에서 현재 요소를 빼줍니다
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTotalCost = function (nums) {
  // nums[0] 요소를 각각 addCost, subTractCost 상태에 할당
  let addCost = nums[0];
  let subtractCost = nums[0];

  // nums[0] 요소는 확인했으니 nums[1] 요소부터 순회
  for (let i = 1; i < nums.length; i++) {
    // Add 연산 결과
    const addRes = Math.max(addCost, subtractCost) + nums[i];

    // Subtract 연산 결과
    const subtractRes = subtractCost - nums[i];

    // addCost, subtractCost 상태 업데이트
    [addCost, subtractCost] = [addRes, subtractRes];
  }

  return Math.max(addCost, subtractCost);
};

console.log(maximumTotalCost([1, -2, 3, 4]));
