function uniqueOccurrences(arr: number[]): boolean {
  const numberCount = new Map();
  arr.forEach((number) => {
    if (!numberCount.has(number)) numberCount.set(number, 0);

    numberCount.set(number, numberCount.get(number) + 1);
  });

  const occurrences = Array.from(numberCount.values());
  const uniqueOccurrences = new Set(occurrences);

  return occurrences.length === uniqueOccurrences.size;
}
