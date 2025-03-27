function solution(alp, cop, problems) {
  let maxAlpReq = -Infinity;
  let maxCopReq = -Infinity;

  for (const [alp_req, cop_req] of problems) {
    maxAlpReq = Math.max(maxAlpReq, alp_req);
    maxCopReq = Math.max(maxCopReq, cop_req);
  }

  const maxAlp = Math.max(alp, maxAlpReq);
  const maxCop = Math.max(cop, maxCopReq);
  const dp = Array.from({ length: maxAlp + 1 }, () => new Array(maxCop + 1).fill(Infinity));

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      if (i < maxAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      if (j < maxCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (i >= alp_req && j >= cop_req) {
          let newAlp = Math.min(i + alp_rwd, maxAlp);
          let newCop = Math.min(j + cop_rwd, maxCop);
          dp[newAlp][newCop] = Math.min(dp[newAlp][newCop], dp[i][j] + cost);
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
}

solution(10, 10, [
  [10, 15, 2, 1, 2],
  [20, 20, 3, 3, 4],
]); // 15
