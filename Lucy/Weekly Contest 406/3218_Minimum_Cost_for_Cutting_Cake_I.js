/**
 * 3218. Minimum Cost for Cutting Cake I
 * url: https://leetcode.com/problems/minimum-cost-for-cutting-cake-i/
 * topic: Array, Dynamic Programming, Greed, Sorting
 * difficulty: Medium
 * date: 2024-07-18(THU)~
 */

// Cut 비용을 클래스로 표현
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
  // Cut의 유형 상수 정의(horizontalCut 배열 요소인지? verticalCut 배열 요소인지?)
  const CUT_TYPE = Object.freeze({
    HORIZONTAL: "h",
    VERTICAL: "v",
  });

  // horizontalCut, verticalCut 배열을 하나의 배열에 관리하기 위한 totalCut 배열
  const totalCut = [];
  horizontalCut.forEach((cost) =>
    totalCut.push(new Cut(cost, CUT_TYPE.HORIZONTAL))
  );
  verticalCut.forEach((cost) =>
    totalCut.push(new Cut(cost, CUT_TYPE.VERTICAL))
  );

  // 내림차순으로 정렬
  totalCut.sort((a, b) => b.cost - a.cost);

  // cutting 비용을 저장할 변수, totalCost
  let totalCost = 0;
  // cutting 이후 currH - row 갯수, currV - col 갯수
  let currH = 1;
  let currV = 1;

  // totalCut 배열 순회
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
