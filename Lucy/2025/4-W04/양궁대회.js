function solution(n, info) {
  var answer = [-1];

  const ryanInfo = new Array(11).fill(0);

  let maxDiff = -Infinity;
  const dfs = (scoreIndex, usedArrow) => {
    // base code
    if (scoreIndex === 11) {
      const copiedRyanInfo = [...ryanInfo];

      if (usedArrow < n) {
        copiedRyanInfo[10] += n - usedArrow;
      }

      let peachScore = 0;
      let ryanScore = 0;

      for (let i = 0; i < 11; i++) {
        const peachArrow = info[i];
        const ryanArrow = copiedRyanInfo[i];

        if (peachArrow === 0 && ryanArrow === 0) continue;

        if (ryanArrow > peachArrow) {
          ryanScore += 10 - i;
        } else {
          peachScore += 10 - i;
        }
      }

      const diff = ryanScore - peachScore;
      if (diff > 0) {
        if (maxDiff < diff) {
          maxDiff = diff;
          answer = [...copiedRyanInfo];
        } else if (maxDiff === diff) {
          for (let i = 10; i >= 0; i--) {
            if (copiedRyanInfo[i] > answer[i]) {
              answer = [...copiedRyanInfo];
              break;
            } else if (copiedRyanInfo[i] < answer[i]) break;
          }
        }
      }

      return;
    }

    const newArrow = usedArrow + info[scoreIndex] + 1;
    if (newArrow <= n) {
      ryanInfo[scoreIndex] = info[scoreIndex] + 1;
      dfs(scoreIndex + 1, newArrow);
      ryanInfo[scoreIndex] = 0;
    }

    dfs(scoreIndex + 1, usedArrow);
  };

  dfs(0, 0);

  return answer;
}

solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
