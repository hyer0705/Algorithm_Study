import { Queue } from "@datastructures-js/queue";

function predictPartyVictory(senate: string): string {
  const n = senate.length;

  const radiantSenators = new Queue<number>();
  const direSenators = new Queue<number>();

  for (let i = 0; i < senate.length; i++) {
    const senator = senate[i];
    if (senator === "R") {
      radiantSenators.enqueue(i);
    } else {
      direSenators.enqueue(i);
    }
  }

  while (radiantSenators.size() > 0 && direSenators.size() > 0) {
    const radiantSenator = radiantSenators.dequeue();
    const direSenator = direSenators.dequeue();

    if (radiantSenator > direSenator) {
      direSenators.enqueue(direSenator + n);
    } else {
      radiantSenators.enqueue(radiantSenator + n);
    }
  }

  if (radiantSenators.size() === 0) return "Dire";
  return "Radiant";
}

predictPartyVictory("DDRRR"); // 'Dire'
