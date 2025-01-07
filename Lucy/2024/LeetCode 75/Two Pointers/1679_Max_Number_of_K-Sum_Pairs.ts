/**
 * 1679. Max Number of K-Sum Pairs
 *
 * url: https://leetcode.com/problems/max-number-of-k-sum-pairs/?envType=study-plan-v2&envId=leetcode-75
 * difficulty: Medium
 * topic:
 * date: 2024.11.06(WED)
 */

function maxOperations(nums: number[], k: number): number {
  let countOperations = 0;

  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === k) {
      left++;
      right--;
      countOperations++;
      continue;
    }

    if (sum > k) {
      right--;
      continue;
    }

    left++;
  }

  return countOperations;
}

/**
 * 첫 번째 풀이: Wrong Answer 42 / 51 test cases passed.
 */
// function maxOperations(nums: number[], k: number): number {
//   let operationCount = 0;

//   const countMap = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     const currentNum = nums[i];
//     const pairOfCurrentNum = k - nums[i];

//     const countCurrentNum = nums.filter((n) => n === currentNum).length;
//     const countPairOfCurrentNum = nums.filter((n) => n === pairOfCurrentNum).length;

//     if (countCurrentNum === 0 || countPairOfCurrentNum === 0) continue;

//     if (countMap.has(currentNum) || countMap.has(pairOfCurrentNum)) continue;
//     if (currentNum === pairOfCurrentNum) {
//       countMap.set(currentNum, Math.floor(countCurrentNum / 2));

//       operationCount += Math.floor(countCurrentNum / 2);
//     } else if (currentNum !== pairOfCurrentNum) {
//       countMap.set(currentNum, countCurrentNum);
//       countMap.set(pairOfCurrentNum, countPairOfCurrentNum);

//       operationCount += Math.min(countCurrentNum, countPairOfCurrentNum);
//     }
//   }

//   return operationCount;
// }

console.log(maxOperations([1, 2, 3, 4], 5)); // 2
console.log(maxOperations([3, 1, 3, 4, 3], 6)); // 1
