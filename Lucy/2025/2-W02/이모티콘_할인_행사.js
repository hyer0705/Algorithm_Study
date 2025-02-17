function getDiscountCombinations(n) {
  const results = [];
  const discounts = [10, 20, 30, 40];

  const backtrack = (result) => {
    if (result.length === n) {
      results.push([...result]);
      return;
    }

    for (const discount of discounts) {
      result.push(discount);
      backtrack(result);
      result.pop();
    }
  };

  backtrack([]);

  return results;
}

function solution(users, emoticons) {
  var answer = [0, 0];

  // 이모티콘 할인율 경우의 수를 구해보자
  const discountCombinations = getDiscountCombinations(emoticons.length);

  // 이모티콘 할인율 경우의 수 순회
  for (const combination of discountCombinations) {
    let subscriberEmoticonPlus = 0;
    let totalPurchasePrice = 0;

    users.forEach(([minimumPurchaseDiscount, minimumSubscribeService]) => {
      let purchasePrice = 0;
      for (let i = 0; i < combination.length; i++) {
        if (combination[i] >= minimumPurchaseDiscount) {
          purchasePrice += emoticons[i] * ((100 - combination[i]) / 100);
        }
      }

      if (purchasePrice >= minimumSubscribeService) {
        purchasePrice = 0;
        subscriberEmoticonPlus++;
      }

      totalPurchasePrice += purchasePrice;
    });

    if (answer[0] < subscriberEmoticonPlus || (answer[0] === subscriberEmoticonPlus && answer[1] < totalPurchasePrice)) {
      answer[0] = subscriberEmoticonPlus;
      answer[1] = totalPurchasePrice;
    }
  }

  console.log(answer);
  return answer;
}

solution(
  [
    [40, 10000],
    [25, 10000],
  ],
  [7000, 9000]
); // [1, 5400]

solution(
  [
    [40, 2900],
    [23, 10000],
    [11, 5200],
    [5, 5900],
    [40, 3100],
    [27, 9200],
    [32, 6900],
  ],
  [1300, 1500, 1600, 4900]
); // [4, 13860]
