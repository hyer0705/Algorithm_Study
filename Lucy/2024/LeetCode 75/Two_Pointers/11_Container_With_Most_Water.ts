/**
 * 11. Container With Most Water
 *
 * url: https://leetcode.com/problems/container-with-most-water/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.11.02(SAT)
 */

function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let answerArea = 0;

  while (left < right) {
    const currArea = Math.min(height[left], height[right]) * (right - left);
    answerArea = Math.max(currArea, answerArea);

    if (height[left] > height[right]) right--;
    else if (height[left] <= height[right]) left++;
  }

  return answerArea;
}

// 1차 풀이 - 25 / 63 test cases passed. Wrong Answer...
// function maxArea(height: number[]): number {
//   let left = 0;
//   let right = height.length - 1;
//   let resArea = 0;

//   while (left < right) {
//     const calcArea = Math.max(
//       getArea(Math.abs(right - left), Math.min(height[left], height[right])),
//       getArea(
//         Math.abs(right - (left + 1)),
//         Math.min(height[left + 1], height[right])
//       ),
//       getArea(
//         Math.abs(right - 1 - left),
//         Math.min(height[left], height[right - 1])
//       ),
//       getArea(
//         Math.abs(right - 1 - (left + 1)),
//         Math.min(height[left + 1], height[right - 1])
//       )
//     );
//     // console.log(calcArea);

//     if (calcArea > resArea) resArea = calcArea;

//     left++;
//     right--;
//   }

//   return resArea;
// }

// function getArea(width: number, height: number): number {
//   return width * height;
// }

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1])); // 1
console.log(maxArea([8, 7, 2, 1])); // 7
