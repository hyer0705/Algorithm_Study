/**
 * 3186. Maximum Total Damage With Spell Casting
 * URL: https://leetcode.com/problems/maximum-total-damage-with-spell-casting/
 * TOPIC: Array, Hash Table, Two Pointers, Binary Search, Dynamic Programming, Sorting, Counting
 * DIFFICULTY: MEDIUM
 * DATE: 2024.06.24(MON)
 *
 * 참고한 풀이: https://leetcode.com/problems/maximum-total-damage-with-spell-casting/discuss/?currentPage=1&orderBy=hot&query=&tag=dynamic-programming
 */

/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  // power 배열에 있는 각 damage 값의 빈도수를 계산하여 Map 객체에 저장
  const damageFrequency = new Map();
  power.forEach((v) => {
    damageFrequency.has(v)
      ? damageFrequency.set(v, damageFrequency.get(v) + 1)
      : damageFrequency.set(v, 1);
  });

  // power 배열의 unique한 damage 값을 오름차순으로 정렬한 배열 생성
  const uniqueDamages = [...new Set(power)].sort((a, b) => a - b);

  // uniqueDamages 배열의 길이를 상수에 저장
  const UNIQUE_DAMAGES_LEN = uniqueDamages.length;

  // dp 배열 선언 및 초기화
  // 길이가 UNIQUE_DAMAGES_LEN으로 한 이유? uniqueDamages 배열을 순회하면서 dp 배열을 채울 예정
  const dp = new Array(UNIQUE_DAMAGES_LEN).fill(0);
  // dp[0] = 첫 damage * 첫 damage의 빈도수
  dp[0] = uniqueDamages[0] * damageFrequency.get(uniqueDamages[0]);

  // 현재 인덱스에서 앞 쪽 인덱스를 순회하면서 power[i] - 1, power[i] - 2, power[i] + 1, power[i] + 2에 해당되지 않는 인덱스를 찾는 함수
  const findPrevIndex = (currIdx, currDamage, uniqueDamages) => {
    // 현재 인덱스의 이전 인덱스를 찾아야하므로, currIdx - 1
    let i = currIdx - 1;
    while (
      i >= 0 &&
      (Math.abs(uniqueDamages[i] - currDamage) === 1 ||
        Math.abs(uniqueDamages[i] - currDamage) === 2)
    ) {
      i--;
    }
    return i;
  };

  // uniqueDamages 배열 순회
  // i가 1부터 시작하는 이유? 0번째 인덱스는 이미 계산했으므로!
  for (let i = 1; i < UNIQUE_DAMAGES_LEN; i++) {
    // 현재 damage를 저장하는 currDamage 변수 선언 및 초기화
    const currDamage = uniqueDamages[i];
    // 현재 damage * 현재 damage 빈도 수 를 계산한 값을 저장하는 currDamageTotal 변수 선언 및 초기화
    const currDamageTotal = currDamage * damageFrequency.get(currDamage);

    // 현재 인덱스에서의 dp 값을 갱신
    // dp[i] = dp[i - 1] 인 이유? 이전에 계산해 놓은 값을 유지하기 위해
    dp[i] = dp[i - 1];

    // 현재 인덱스보다 이전에 위치한 damage의 인덱스 값 찾기
    const findIdx = findPrevIndex(i, currDamage, uniqueDamages);

    // findIdx 가 0보다 크거나 같을 때, 조건에 맞는 damage의 인덱스를 찾음
    if (findIdx >= 0) {
      dp[i] = Math.max(dp[i], dp[findIdx] + currDamageTotal);
    }
    // findIdx 가 0보다 작을 때, 조건에 맞는 damage의 인덱스를 찾지 못함
    else {
      dp[i] = Math.max(dp[i], currDamageTotal);
    }
  }

  // 최대 damage 값 반환
  return dp[UNIQUE_DAMAGES_LEN - 1];
};

maximumTotalDamage([1, 1, 3, 4]);
