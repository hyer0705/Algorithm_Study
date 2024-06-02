/**
 * 3164. Find the Number of Good Pairs 2
 * URL: https://leetcode.com/problems/find-the-number-of-good-pairs-ii/description/
 * DIFFICULTY: MEDIUM
 * TOPIC: Array, Hash Table
 * DATE:
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
// Discuss tab에서 보고 푼 풀이!
var numberOfPairs = function (nums1, nums2, k) {
  // nums2[j] * k의 빈도수를 저장할 frequencyMap 변수 생성
  const frequencyMap = new Map();

  // good pairs의 총 갯수를 저장할 변수 total 생성 및 초기화
  let total = 0;

  // nums2를 forEach 메서드를 통해 nums2를 순회하면서 frequencyMap 에 값 추가
  nums2.forEach((num) => {
    const currKey = num * k;

    // nums2[j] * k를 key값으로 하여 해당 key가 있는 경우, get 메서드를 통해 현재 저장되어 있는 값에 1 를 더한 값 설정
    if (frequencyMap.has(currKey)) {
      frequencyMap.set(currKey, frequencyMap.get(currKey) + 1);
    }
    // nums2[j] * k를 key값으로 하여 해당 key가 없는 경우, set 메서드를 통해 1로 설정
    else {
      frequencyMap.set(currKey, 1);
    }
  });

  // nums1 배열의 요소를 for of 문을 통해 순회
  for (const num of nums1) {
    // 약수 구하는 for문에서 i 값을 0으로 초기화 해서 애를 먹었네요...
    // nums1의 약수를 구하는 for문, i의 제곱근까지만 반복하여 중복을 최소화함
    for (let i = 1; i <= Math.sqrt(num); i++) {
      //num 값이 i로 나누어 떨이질 때, i가 num의 약수일 때
      if (num % i === 0) {
        // 약수를 저장할 변수 factor1 선언 및 i 값으로 초기화
        const factor1 = i;
        // 약수를 저장할 변수 factor2 선언 및 num / i 값으로 초기화
        const factor2 = num / i;

        // factor1 과 factor2의 값이 다르고 frequencyMap의 저장되어 있을 때
        if (factor1 !== factor2 && frequencyMap.has(factor2)) {
          // total 에 frequencyMap에 저장되어 있는 key 대응되는 value값을 더함
          total += frequencyMap.get(factor2);
        }
        // factor1이 frequencyMap의 key값으로 저장되어 있을 때, total에 frequencyMap에 저장되어 있는 key에 대응되는 value 값을 더함
        if (frequencyMap.has(factor1)) total += frequencyMap.get(factor1);
      }
    }
  }

  // good pairs의 총 갯수를 저장한 total 변수 반환
  return total;
};

// Chat GPT의 풀이... Time Limit Exceeded. 683 / 687 test cases passed.
// var numberOfPairs = function (nums1, nums2, k) {
//   const divisorMap = new Map();
//   let total = 0;

//   nums2.forEach((v) => {
//     const currKey = v * k;
//     if (divisorMap.has(currKey)) {
//       divisorMap.set(currKey, divisorMap.get(currKey) + 1);
//     } else {
//       divisorMap.set(currKey, 1);
//     }
//   });

//   for (const num of nums1) {
//     for (const [k, v] of divisorMap.entries()) {
//       if (num % k === 0) total += v;
//     }
//   }
//   return total;
// };
