import { ComparisonCounter } from "../utils/comparisonCounter.js";

export const runTournament = (players) => {
  const counter = new ComparisonCounter();

  // Recursive divide & conquer tournament
  const tournament = (arr) => {
    if (arr.length === 1) return { winner: arr[0], defeated: [] };

    const mid = Math.floor(arr.length / 2);
    const left = tournament(arr.slice(0, mid));
    const right = tournament(arr.slice(mid));

    counter.compare(left.winner.score, right.winner.score);

    if (left.winner.score >= right.winner.score) {
      return {
        winner: left.winner,
        defeated: [...left.defeated, right.winner],
      };
    } else {
      return {
        winner: right.winner,
        defeated: [...right.defeated, left.winner],
      };
    }
  };

  const { winner, defeated } = tournament(players);

  // Handle ties for winner
  const topScore = winner.score;
  const winners = players.filter((p) => p.score === topScore);

  // Runner-up: max of defeated players (minimal comparisons)
  let runnerUps = [];
  if (defeated.length > 0) {
    let maxScore = defeated[0].score;
    runnerUps = [defeated[0]];

    for (let i = 1; i < defeated.length; i++) {
      const cmp = counter.compare(defeated[i].score, maxScore);
      if (cmp > 0) {
        maxScore = defeated[i].score;
        runnerUps = [defeated[i]];
      } else if (cmp === 0) {
        runnerUps.push(defeated[i]);
      }
    }
  }

  return {
    winners,
    runnerUps,
    comparisons: counter.getCount(),
  };
};
