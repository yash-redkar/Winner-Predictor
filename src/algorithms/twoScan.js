import { ComparisonCounter } from "../utils/comparisonCounter.js";

export const runTwoScan = (players) => {
  const counter = new ComparisonCounter();

  if (players.length === 0) {
    return { winners: [], runnerUps: [], comparisons: 0 };
  }

  // Initialize with the first player
  let winner = players[0];
  let runnerUp = null; // Will store the single runner-up player object

  // Single pass to find winner and the specific runner-up based on your tie-break rule
  for (let i = 1; i < players.length; i++) {
    const currentPlayer = players[i];
    const cmp = counter.compare(currentPlayer.score, winner.score);

    if (cmp > 0) {
      // Case 1: New undisputed winner
      // The current winner is demoted to the new runner-up
      runnerUp = winner;
      winner = currentPlayer;
    } else if (cmp === 0) {
      // Case 2: Tie for max score - Apply the specific tie-break rule: lower ID wins
      if (currentPlayer.id < winner.id) {
        // Current player is the new winner (due to lower ID)
        // The old winner is demoted to the new runner-up
        runnerUp = winner;
        winner = currentPlayer;
      } else {
        // Current player is NOT the winner (higher ID loses tie-break)
        // Check if the current player is better than the current runner-up
        if (
          !runnerUp ||
          counter.compare(currentPlayer.score, runnerUp.score) > 0
        ) {
          runnerUp = currentPlayer;
        }
        // Note: If currentPlayer.score == runnerUp.score,
        // the current runnerUp remains as we are only tracking one.
      }
    } else {
      // cmp < 0 (Current player has a lower score than the current winner)
      // Case 3: Check if the current player is better than the current runner-up
      if (
        !runnerUp ||
        counter.compare(currentPlayer.score, runnerUp.score) > 0
      ) {
        runnerUp = currentPlayer;
      }
    }
  }

  // The output format expects arrays, so we wrap the single player objects
  const winners = [winner];
  // Runner-up might be null if n<2 or all scores were the same as the winner
  const runnerUps = runnerUp ? [runnerUp] : [];

  return {
    winners,
    runnerUps,
    comparisons: counter.getCount(),
  };
};
