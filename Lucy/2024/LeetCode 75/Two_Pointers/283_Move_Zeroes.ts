/**
 * 283. Move Zeroes
 *
 * url: https://leetcode.com/problems/move-zeroes/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Easy
 * date: 2024.11.02(SAT)
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  const nonZeroes = nums.filter((num) => num !== 0);

  for (let i = 0; i < nonZeroes.length; i++) {
    nums[i] = nonZeroes[i];
  }
  for (let i = nonZeroes.length; i < nums.length; i++) {
    nums[i] = 0;
  }

  //   console.log(nums);
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]
console.log(moveZeroes([0])); // [0]
console.log(moveZeroes([0, 0, 1])); // [1,0,0]
console.log(
  moveZeroes([
    73348, 66106, -85359, 53996, 18849, -6590, -53381, -86613, -41065, 83457, 0,
  ])
); // [73348,66106,-85359,53996,18849,-6590,-53381,-86613,-41065,83457,0]
