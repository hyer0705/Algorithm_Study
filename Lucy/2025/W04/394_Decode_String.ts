function decodeString(s: string): string {
  const OPEN = "[";
  const CLOSE = "]";

  const numStack: number[] = [];
  const strStack: string[] = [];

  let numStr = "";

  for (const ch of s) {
    if (Number.isInteger(+ch)) {
      numStr += ch;
    } else if (ch === OPEN) {
      strStack.push(OPEN);
      numStack.push(+numStr);
      numStr = "";
    } else if (ch === CLOSE) {
      let targetStr = "";

      while (strStack.length > 0) {
        if (strStack[strStack.length - 1] === OPEN) {
          strStack.pop();
          break;
        }

        targetStr = strStack.pop() + targetStr;
      }

      const repeatCount = numStack.pop();

      if (repeatCount) {
        strStack.push(targetStr.repeat(repeatCount));
      }
    } else {
      strStack.push(ch);
    }
  }

  return strStack.join("");
}
