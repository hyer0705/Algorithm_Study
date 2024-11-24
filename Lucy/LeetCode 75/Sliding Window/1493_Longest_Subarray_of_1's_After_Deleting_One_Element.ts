/**
 * 1493. Longest Subarray of 1's After Deleting One Element
 *
 * url: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * date: 2024.11.23(SAT)
 */

function longestSubarray(nums: number[]): number {
  let maxLen = 0;
  const zeroIndices = nums
    .map((n, i) => {
      if (n === 0) return i;
      return -1;
    })
    .filter((i) => i !== -1);

  // virtual indices push
  zeroIndices.splice(0, 0, -1);
  zeroIndices.push(nums.length);

  const zeroIndicesLen = zeroIndices.length;

  if (zeroIndicesLen === 2) return nums.length - 1;

  for (let i = 1; i < zeroIndicesLen - 1; i++) {
    const currLen = zeroIndices[i + 1] - zeroIndices[i - 1] - 2;
    maxLen = Math.max(maxLen, currLen);
  }

  return maxLen;
}

// 73 / 82 test cases passed.
// function longestSubarray(nums: number[]): number {
//   let deleteCount = 0;
//   let maxLen = 0;
//   let i = 0;

//   for (let j = 0; j < nums.length; j++) {
//     while (deleteCount >= 1) if (nums[i++] === 0) deleteCount--;
//     if (nums[j] === 0) deleteCount++;
//     if (deleteCount === 1) {
//       const sliced = [...nums.slice(0, j), ...nums.slice(j + 1)];

//       let conscutiveOneCount = 0;
//       let maxSubarrayLen = 0;
//       for (let p = 0; p < sliced.length; p++) {
//         if (sliced[p] === 1) {
//           conscutiveOneCount++;
//         }

//         if (sliced[p] === 0) {
//           maxSubarrayLen = Math.max(maxSubarrayLen, conscutiveOneCount);
//           conscutiveOneCount = 0;
//         }
//       }

//       maxLen = Math.max(maxLen, maxSubarrayLen);
//       //   maxLen = Math.max(maxLen,  + .filter((n) => n === 1).length);
//     }
//   }

//   if (maxLen === 0) return nums.length - 1;
//   return maxLen;
// }

console.log(longestSubarray([1, 1, 0, 1])); // 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); // 5
console.log(longestSubarray([1, 1, 1])); // 2
