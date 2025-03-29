/**
 * 238. Product of Array Except Self
 *
 * url: https://leetcode.com/problems/product-of-array-except-self/
 * difficulty: Medium
 * date: 2024.10.26(SAT)
 */

// 참고한 풀이: https://leetcode.com/problems/product-of-array-except-self/discuss/1342916/3-Minute-Read-Mimicking-an-Interview
function productExceptSelf(nums: number[]): number[] {
  const NUMS_LEN = nums.length;

  const prefix = new Array(NUMS_LEN).fill(0);
  const suffix = new Array(NUMS_LEN).fill(0);

  prefix[0] = 1;
  suffix[NUMS_LEN - 1] = 1;

  for (let i = 1; i < NUMS_LEN; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }
  for (let i = NUMS_LEN - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  const answer = [];
  for (let i = 0; i < NUMS_LEN; i++) {
    answer.push(prefix[i] * suffix[i]);
  }

  return answer;
}

// 첫 번째 풀이 - Time Limit Exceeded(18 / 24 test cases passed)
/*
 function productExceptSelf(nums: number[]): number[] {
  const answer: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    answer.push(
      nums.filter((_, idx) => idx !== i).reduce((acc, curr) => acc * curr, 1)
    );
  }

  return answer;
} 
  */

console.log(productExceptSelf([1, 2, 3, 4])); // [24,12,8,6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]
