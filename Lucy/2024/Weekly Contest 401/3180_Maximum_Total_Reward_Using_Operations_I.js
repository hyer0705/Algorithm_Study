/**
 * 3180. Maximum Total Reward Using Operations I
 * URL: https://leetcode.com/problems/maximum-total-reward-using-operations-i/
 * DIFFICULTY: Medium
 * TOPIC: Array, Dynamic Programming
 * DATE: 2024.06.11(TUE)~
 */

/**
 * @param {number[]} rewardValues
 * @return {number}
 */

// dp의 길이를 n(rewardValues 의 길이)로 바꿨을 뿐인데 Time Limit이 발생하지 않음...
// 이유가 뭘까요...?
var maxTotalReward = function (rewardValues) {
  // sort
  rewardValues.sort((a, b) => a - b);

  const n = rewardValues.length;
  const UNDEFINED_REWARD = -1;
  const dp = new Array(n)
    .fill(null)
    .map(() => new Array(4001).fill(UNDEFINED_REWARD));

  const calculateDP = function (i, reward) {
    if (i === n) return reward;
    if (dp[i][reward] !== UNDEFINED_REWARD) return dp[i][reward];

    const include =
      rewardValues[i] > reward
        ? calculateDP(i + 1, reward + rewardValues[i])
        : reward;

    const exclude = calculateDP(i + 1, reward);

    return (dp[i][reward] = Math.max(include, exclude));
  };

  return calculateDP(0, 0);
};

// c++ solution 정답을 javascript로 변경...
// Time Limit Exceeded. 74 / 586 test cases passed.
var maxTotalReward = function (rewardValues) {
  // sort
  rewardValues.sort((a, b) => a - b);

  const n = rewardValues.length;
  const UNDEFINED_REWARD = -1;
  const dp = new Array(2001)
    .fill(null)
    .map(() => new Array(4001).fill(UNDEFINED_REWARD));

  const calculateDP = function (i, reward) {
    if (i === n) return reward;
    if (dp[i][reward] !== UNDEFINED_REWARD) return dp[i][reward];

    const include =
      rewardValues[i] > reward
        ? calculateDP(i + 1, reward + rewardValues[i])
        : reward;

    const exclude = calculateDP(i + 1, reward);

    return (dp[i][reward] = Math.max(include, exclude));
  };

  return calculateDP(0, 0);
};

console.log(maxTotalReward([1, 6, 4, 3, 2]));
