function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const word1Count = getCharCount(word1);
  const word2Count = getCharCount(word2);

  return checkEqual(word1Count, word2Count);
}

function getCharCount(word: string): Map<string, number> {
  const countMap = new Map();

  [...word].forEach((char) => {
    if (!countMap.has(char)) countMap.set(char, 0);

    countMap.set(char, countMap.get(char) + 1);
  });

  return countMap;
}

function checkEqual(a: Map<string, number>, b: Map<string, number>): boolean {
  // keys() 비교
  for (const k of a.keys()) {
    if (!b.has(k)) return false;
  }

  // values 값 동일한지 비교
  const mp = new Map<number, number>();
  for (let val of a.values()) {
    mp.set(val, (mp.get(val) || 0) + 1);
  }

  for (let val of b.values()) {
    if (!mp.has(val) || mp.get(val) === 0) return false;
    mp.set(val, (mp.get(val) || 0) - 1);
  }

  return true;
}
