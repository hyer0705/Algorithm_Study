function removeStars(s: string): string {
  const STAR = "*";

  const stack: string[] = [];
  for (const ch of s) {
    if (ch === STAR) {
      stack.pop();
    } else {
      stack.push(ch);
    }
  }

  return stack.join("");
}

removeStars("leet**cod*e"); // "lecoe"
removeStars("erase*****"); // ""
