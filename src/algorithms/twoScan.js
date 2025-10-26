import { ComparisonCounter } from "../utils/comparisonCounter.js";

export const runTwoScan = (players) => {
  const counter = new ComparisonCounter();

  let maxScore = players[0].score;
  let secondMaxScore = -Infinity;

  // Single pass to find max and second max
  for (let i = 1; i < players.length; i++) {
    const cmp = counter.compare(players[i].score, maxScore);
    if (cmp > 0) {
      secondMaxScore = maxScore;
      maxScore = players[i].score;
    } else if (cmp < 0) {
      const cmp2 = counter.compare(players[i].score, secondMaxScore);
      if (cmp2 > 0) {
        secondMaxScore = players[i].score;
      }
    }
  }

  // Winners and runner-ups
  const winners = players.filter((p) => p.score === maxScore);
  const runnerUps = players.filter((p) => p.score === secondMaxScore);

  return {
    winners,
    runnerUps,
    comparisons: counter.getCount(),
  };
};
