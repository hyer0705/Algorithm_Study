function solution(commands) {
  var answer = [];

  const COMMAND = {
    Update: "UPDATE",
    Merge: "MERGE",
    Unmerge: "UNMERGE",
    Print: "PRINT",
  };

  const content = Array.from({ length: 51 }, (_) => new Array(51).fill("EMPTY"));
  const merged = Array.from({ length: 51 }, (_) => new Array(51));
  for (let i = 0; i < merged.length; i++) {
    for (let j = 0; j < merged[0].length; j++) {
      merged[i][j] = `${i},${j}`;
    }
  }

  for (const command of commands) {
    const splitedCommand = command.split(" ");

    if (splitedCommand[0] === COMMAND.Update) {
      if (splitedCommand.length === 4) {
        const [_, r, c, value] = splitedCommand;
        const [x, y] = merged[+r][+c].split(",").map(Number);

        content[x][y] = value;
      } else if (splitedCommand.length === 3) {
        const [_, originValue, newValue] = splitedCommand;

        for (let i = 1; i < content.length; i++) {
          for (let j = 1; j < content[i].length; j++) {
            if (content[i][j] === originValue) content[i][j] = newValue;
          }
        }
      }
    } else if (splitedCommand[0] === COMMAND.Merge) {
      const [_, r1, c1, r2, c2] = splitedCommand;
      const [x1, y1] = merged[+r1][+c1].split(",").map(Number);
      const [x2, y2] = merged[+r2][+c2].split(",").map(Number);

      for (let i = 1; i < merged.length; i++) {
        for (let j = 1; j < merged[i].length; j++) {
          if (merged[i][j] === `${x2},${y2}`) merged[i][j] = `${x1},${y1}`;
        }
      }

      const newValue = content[x1][y1] !== "EMPTY" ? content[x1][y1] : content[x2][y2];
      content[x1][y1] = newValue;
    } else if (splitedCommand[0] === COMMAND.Unmerge) {
      const [_, r, c] = splitedCommand;
      const [x, y] = merged[+r][+c].split(",").map(Number);
      const tmp = content[x][y] !== "EMPTY" ? content[x][y] : "EMPTY";

      for (let i = 1; i < merged.length; i++) {
        for (let j = 1; j < merged[i].length; j++) {
          if (merged[i][j] === `${x},${y}`) {
            merged[i][j] = `${i},${j}`;
            content[i][j] = "EMPTY";
          }
        }
      }

      content[+r][+c] = tmp;
    } else if (splitedCommand[0] === COMMAND.Print) {
      const [_, r, c] = splitedCommand;
      const [x, y] = merged[+r][+c].split(",").map(Number);

      answer.push(content[x][y]);
    }
  }

  console.log(answer);

  return answer;
}

solution([
  "UPDATE 1 1 a",
  "UPDATE 1 2 b",
  "UPDATE 2 1 c",
  "UPDATE 2 2 d",
  "MERGE 1 1 1 2",
  "MERGE 2 2 2 1",
  "MERGE 2 1 1 1",
  "PRINT 1 1",
  "UNMERGE 2 2",
  "PRINT 1 1",
]); // ["d", "EMPTY"]
