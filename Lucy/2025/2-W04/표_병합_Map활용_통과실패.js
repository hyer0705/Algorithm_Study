// 합계: 31.8 / 100.0
// test case: 7/22

function solution(commands) {
  const COMMAND = {
    Update: "UPDATE",
    Merge: "MERGE",
    Unmerge: "UNMERGE",
    Print: "PRINT",
  };

  const answer = [];

  const table = new Map();
  const mergedCoordinates = new Set();

  for (const command of commands) {
    const splitedCommand = command.split(" "); // splitedCommand[0] -> UPDATE, MEREGE, UNMERGE, PRINT

    if (splitedCommand[0] === COMMAND.Update) {
      if (splitedCommand.length === 4) {
        const [_, r, c, value] = splitedCommand;

        const coordinatesKey = `${r},${c}`;
        if (table.has(coordinatesKey)) {
          const originValue = table.get(coordinatesKey);
          const newValue = { ...originValue, value };

          table.set(coordinatesKey, newValue);

          if (originValue.merged) {
            originValue.merged.split("+").forEach((coordinate) => {
              table.has(coordinate) && table.set(coordinate, { ...table.get(coordinate), value });
            });
          }
        } else {
          table.set(coordinatesKey, { value, merged: null });
        }
      } else if (splitedCommand.length === 3) {
        const [_, originValue, newValue] = splitedCommand;

        for (const [key, values] of table) {
          if (values.value === originValue) {
            table.set(key, { ...table.get(key), value: newValue });
          }
        }
      }
    } else if (splitedCommand[0] === COMMAND.Merge) {
      const [_, r1, c1, r2, c2] = splitedCommand;

      if (table.has(`${r1},${c1}`) && table.has(`${r2},${c2}`)) {
        const standardValue = table.get(`${r1},${c1}`).value;
        const newMerged = [table.get(`${r1},${c1}`).merged ?? `${r1},${c1}`, table.get(`${r2},${c2}`).merged ?? `${r2},${c2}`].join("+");

        newMerged.split("+").forEach((key) => table.set(key, { value: standardValue, merged: newMerged }));
      } else if (table.has(`${r1},${c1}`)) {
        const standardValue = table.get(`${r1},${c1}`).value;
        const newMerged = [table.get(`${r1},${c1}`).merged, `${r2},${c2}`].join("+");

        newMerged.split("+").forEach((key) => table.set(key, { value: standardValue, merged: newMerged }));
      } else if (table.has(`${r2},${c2}`)) {
        const standardValue = table.get(`${r2},${c2}`).value;
        const newMerged = [`${r1},${c1}`, table.get(`${r2},${c2}`).merged].join("+");

        newMerged.split("+").forEach((key) => table.set(key, { value: standardValue, merged: newMerged }));
      }
    } else if (splitedCommand[0] === COMMAND.Unmerge) {
      const [_, r, c] = splitedCommand;

      const copiedMerged = table.get(`${r},${c}`).merged;
      copiedMerged.split("+").forEach((key) => {
        if (key !== `${r},${c}`) {
          table.delete(key);
        }
      });

      table.set(`${r},${c}`, { ...table.get(`${r},${c}`), merged: null });
    } else if (splitedCommand[0] === COMMAND.Print) {
      const [_, r, c] = splitedCommand;
      const coordinatesKey = `${r},${c}`;

      const printValue = table.has(coordinatesKey) ? table.get(coordinatesKey).value : "EMPTY";
      answer.push(printValue);
    }
  }

  console.log(answer);

  return answer;
}

solution([
  "UPDATE 1 1 menu",
  "UPDATE 1 2 category",
  "UPDATE 2 1 bibimbap",
  "UPDATE 2 2 korean",
  "UPDATE 2 3 rice",
  "UPDATE 3 1 ramyeon",
  "UPDATE 3 2 korean",
  "UPDATE 3 3 noodle",
  "UPDATE 3 4 instant",
  "UPDATE 4 1 pasta",
  "UPDATE 4 2 italian",
  "UPDATE 4 3 noodle",
  "MERGE 1 2 1 3",
  "MERGE 1 3 1 4",
  "UPDATE korean hansik",
  "UPDATE 1 3 group",
  "UNMERGE 1 4",
  "PRINT 1 3",
  "PRINT 1 4",
]); // ["EMPTY", "group"]

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
