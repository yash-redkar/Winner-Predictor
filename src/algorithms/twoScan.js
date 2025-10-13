import { ComparisonCounter } from "../utils/comparisonCounter.js";

export const runTwoScan = (players) => {
  const counter = new ComparisonCounter();

  // First scan: find the winner
  let winner = players[0];
  for (let i = 1; i < players.length; i++) {
    if (counter.compare(players[i].score, winner.score) > 0) {
      winner = players[i];
    }
  }

  // Second scan: find the best among remaining
  let runnerUp = null;
  for (let i = 0; i < players.length; i++) {
    if (players[i]._id !== winner._id) {
      if (!runnerUp || counter.compare(players[i].score, runnerUp.score) > 0) {
        runnerUp = players[i];
      }
    }
  }

  return { winner, runnerUp, comparisons: counter.getCount() };
};
