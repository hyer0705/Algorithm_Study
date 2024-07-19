/**
 * 3218. Minimum Cost for Cutting Cake I
 * url: https://leetcode.com/problems/minimum-cost-for-cutting-cake-i/
 * topic: Array, Dynamic Programming, Greed, Sorting
 * difficulty: Medium
 * date: 2024-07-18(THU)~
 */

class Cut {
  constructor(cost, type) {
    this.cost = cost;
    this.type = type;
  }
}

/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  const CUT_TYPE = Object.freeze({
    HORIZONTAL: "h",
    VERTICAL: "v",
  });

  const totalCut = [];
  horizontalCut.forEach((cost) =>
    totalCut.push(new Cut(cost, CUT_TYPE.HORIZONTAL))
  );
  verticalCut.forEach((cost) =>
    totalCut.push(new Cut(cost, CUT_TYPE.VERTICAL))
  );

  totalCut.sort((a, b) => b.cost - a.cost);

  let totalCost = 0;
  let currH = 1;
  let currV = 1;

  for (let i = 0; i < totalCut.length; i++) {
    const currTotalCut = totalCut[i];
    if (currTotalCut.type === CUT_TYPE.HORIZONTAL) {
      totalCost += currTotalCut.cost * currV;
      currH++;
    } else if (currTotalCut.type === CUT_TYPE.VERTICAL) {
      totalCost += currTotalCut.cost * currH;
      currV++;
    }
  }

  return totalCost;
};

console.log(minimumCost(3, 2, [1, 3], [5]));
