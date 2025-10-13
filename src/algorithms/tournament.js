import { ComparisonCounter } from "../utils/comparisonCounter.js";

export const runTournament = (players) => {
  const counter = new ComparisonCounter();

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

  // Runner-up is among the players defeated by the winner
  let runnerUp = defeated[0];
  for (let i = 1; i < defeated.length; i++) {
    if (counter.compare(defeated[i].score, runnerUp.score) > 0) {
      runnerUp = defeated[i];
    }
  }

  return { winner, runnerUp, comparisons: counter.getCount() };
};
