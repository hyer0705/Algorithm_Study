function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const results: number[] = [];
  potions.sort((a, b) => a - b);

  for (const spell of spells) {
    let start = 0;
    let end = potions.length - 1;
    let answer = potions.length;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (potions[mid] >= success / spell) {
        answer = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    results.push(potions.length - answer);
  }

  return results;
}
