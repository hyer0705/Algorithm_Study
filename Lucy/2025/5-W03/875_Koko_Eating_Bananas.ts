function isPossible(k: number, h: number, piles: number[]): boolean {
  let hour = 0;
  for (const pile of piles) {
    hour += Math.ceil(pile / k);
    if (hour > h) return false; // 계산되고 있는 hour가 h(경비원이 돌아오는 시간)를 넘기는 순간 false를 반환
  }

  return hour <= h;
}

function minEatingSpeed(piles: number[], h: number): number {
  let low = 1;
  let high = Math.max(...piles);

  while (low < high) {
    const k = Math.floor((low + high) / 2);

    if (isPossible(k, h, piles)) {
      high = k;
    } else {
      low = k + 1;
    }
  }

  return low;
}
