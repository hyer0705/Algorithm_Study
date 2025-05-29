function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const digitPairMap = new Map<string, string[]>();
  digitPairMap.set("2", "abc".split(""));
  digitPairMap.set("3", "def".split(""));
  digitPairMap.set("4", "ghi".split(""));
  digitPairMap.set("5", "jkl".split(""));
  digitPairMap.set("6", "mno".split(""));
  digitPairMap.set("7", "pqrs".split(""));
  digitPairMap.set("8", "tuv".split(""));
  digitPairMap.set("9", "wxyz".split(""));

  const results: string[] = [];

  const path: string[] = [];
  const backtrack = (depth: number) => {
    if (depth === digits.length) {
      results.push(path.join(""));
      return;
    }

    for (const digit of digitPairMap.get(digits[depth])!) {
      path.push(digit);
      backtrack(depth + 1);
      path.pop();
    }
  };
  backtrack(0);

  return results;
}
