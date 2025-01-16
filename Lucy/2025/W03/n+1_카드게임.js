class CardGame {
  constructor(coin, cards) {
    this.coin = coin;
    this.cards = cards;

    this.n = cards.length;
    this.nPlusOne = this.n + 1;

    this.currentCards = [];
    this.avaliableCards = [];

    this.pointer = 0;
  }

  play() {
    this.currentCards = this.cards.slice(0, this.n / 3);
    this.pointer = this.n / 3;

    let round = 1;

    while (this.hasNextRound()) {
      round++;
    }

    return round;
  }

  hasNextRound() {
    if (this.pointer >= this.n) return false;

    // 1. pick cards
    const pickCards = this.cards.slice(this.pointer, this.pointer + 2);
    this.avaliableCards.push(...pickCards);
    this.pointer += 2;

    // 2. 우선순위 1: 기존 카드에서 두개 뽑기
    if (this.tryCurrentCardsOnly()) return true;

    // 3. 우선순위 2: 동전 1개 사용
    if (this.coin >= 1) {
      if (this.tryOneNewCard([...this.currentCards, ...this.avaliableCards])) {
        this.coin--;
        return true;
      }
    }

    // 4. 우선순위 3: 동전 2개 사용
    if (this.coin >= 2) {
      if (this.tryTwoNewCards([...this.avaliableCards])) {
        this.coin -= 2;
        return true;
      }
    }

    return false;
  }

  tryCurrentCardsOnly() {
    const combination = this.combineCards(this.currentCards, this.nPlusOne);
    if (!combination) return false;

    this.currentCards = this.currentCards.filter((card) => !combination.includes(card));
    return true;
  }

  tryOneNewCard(cards) {
    const combination = this.combineCards(cards, this.nPlusOne);
    if (!combination) return false;

    const [card1, card2] = combination;
    if (this.currentCards.includes(card1)) {
      this.filterCards(card1, card2);
      return true;
    }

    if (this.currentCards.includes(card2)) {
      this.filterCards(card2, card1);
      return true;
    }

    return false;
  }

  filterCards(targetCard, otherCard) {
    this.currentCards = this.currentCards.filter((card) => card !== targetCard);
    this.avaliableCards = this.avaliableCards.filter((card) => card !== otherCard);
  }

  tryTwoNewCards(cards) {
    const combination = this.combineCards(cards, this.nPlusOne);
    if (!combination) return false;

    this.avaliableCards = this.avaliableCards.filter((card) => !combination.includes(card));
    return true;
  }

  combineCards(cards, target) {
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[i] + cards[j] === target) {
          return [cards[i], cards[j]];
        }
      }
    }

    return null;
  }
}

function solution(coin, cards) {
  const game = new CardGame(coin, cards);

  return game.play();
}

solution(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]); // 5
solution(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]); // 2
solution(2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7]); // 4
solution(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]); // 1
