const CENTER = "-";

class Seller {
  constructor(name, referee) {
    this.name = name;
    this.referee = referee;
    this.profit = 0;
  }

  receiveProfit(profit) {
    this.profit += profit;
  }

  isCenter() {
    return this.name === CENTER;
  }
}

function solution(enroll, referral, seller, amount) {
  var answer = [];

  const TOOTHBRUSH_PRICE = 100;
  const n = enroll.length;
  const sellerMap = new Map();
  sellerMap.set(CENTER, new Seller(CENTER, null));

  for (let i = 0; i < n; i++) {
    sellerMap.set(enroll[i], new Seller(enroll[i], referral[i]));
  }

  const recursive = (currentSeller, profit) => {
    const MY_DISTRIBUTION_RATE = 0.9;
    const REFERREE_DISTRIBUTION_RATE = 0.1;

    if (currentSeller.isCenter()) {
      currentSeller.receiveProfit(profit);
      return;
    }
    if (profit < 10) {
      currentSeller.receiveProfit(profit);
      return;
    }

    const myProfit = Math.ceil(profit * MY_DISTRIBUTION_RATE);
    const refereeProfit = Math.floor(profit * REFERREE_DISTRIBUTION_RATE);

    currentSeller.receiveProfit(myProfit);

    const refereeSeller = sellerMap.get(currentSeller.referee);
    recursive(refereeSeller, refereeProfit);
  };

  for (let i = 0; i < seller.length; i++) {
    const totalProfit = amount[i] * TOOTHBRUSH_PRICE;
    recursive(sellerMap.get(seller[i]), totalProfit);
  }

  for (const currentSeller of enroll) {
    answer.push(sellerMap.get(currentSeller).profit);
  }

  return answer;
}

solution(
  ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
  ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
  ["young", "john", "tod", "emily", "mary"],
  [12, 4, 2, 5, 10]
); // [360, 958, 108, 0, 450, 18, 180, 1080]
