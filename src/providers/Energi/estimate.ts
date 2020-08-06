import moment from "moment";
import { IMasternode, WEI } from "./types";

export function estimateBlocksTil(result: IMasternode[] | null, owner: string) {
  // Find the current masternode rank
  const index = (result || []).findIndex(
    ({ Owner }) => Owner.toLowerCase() === (owner || "").toLowerCase()
  );
  const masternode = (result || [])[index];
  
  // If masternode not found throw error
  if (!masternode) return { isActive: false, isAlive: false };

  // Create list of masternodes in queue ahead of us
  const precedingResults = (result || []).slice(0, index);

  // Convert binary representation to JS number array
  const precedingAmounts = precedingResults.map(
    ({ Collateral }) => parseInt(Collateral) / WEI
  );

  // Calculate sum of collateral
  const precedingCollateral = precedingAmounts.reduce((acc, c) => acc + c, 0);

  // Estimated blocks until next reward
  // Each block the queue receives 9.14 NRG per 10000 Collateral
  const blocks = Math.floor(precedingCollateral / 10000);

  // Estimated timestamp of next reward
  const estimatedTime = moment().add(blocks, "minutes");
  const estimatedTimeUntil = estimatedTime.fromNow();
  
  return {
    rank: index + 1,
    blocks,
    isActive: masternode.IsActive,
    isAlive: masternode.IsAlive,
    estimatedTime,
    estimatedTimeUntil,
  };
}