/** global idb */
import { IMasternode, WEI } from "./types";
import { estimateBlocksTil } from "./estimate";
import { openIndexDb, read, MAX_AGE } from './indexdb'

const nodeApi = "https://nodeapi.energi.network/";
const masternodeListMethod = "masternode_listMasternodes";

export const getBalances = async (owners: string | string[]) =>
  Promise.all(([] as string[]).concat(owners).map(getBalance)).then(merge);

export const getBalance = (owner: string) => {
  return fetch(
    `//explorer.energi.network/api?module=account&action=balance&address=${owner}`
  )
    .then((r) => r.json())
    .then((r) => Number(r.result) / WEI)
    .then((balance) => ({ [owner]: { balance } }));
};

export const listMasternodes = async () => {
  const db = await openIndexDb(masternodeListMethod).catch((e: any) => {
    console.warn(e)
  });
  if (db) {
    try {
      const tx = db.transaction([masternodeListMethod], "readonly");
      const store = tx.objectStore(masternodeListMethod);
      const result = await read(store.get(masternodeListMethod))
      const age = Date.now() - result.timestamp
      console.log("Cached result", result, age);
      if (result && age < MAX_AGE) {
        return result;
      }
    } catch (e) {
      console.error('Get cached data error', e)
    }
  }
  const result = await rpc<IMasternode[]>(
    nodeApi,
    "masternode_listMasternodes"
  );
  if (db) {
    try {
      const tx = db.transaction([masternodeListMethod], "readwrite");
      const store = tx.objectStore(masternodeListMethod);
      const cache = { ...result, method: masternodeListMethod, timestamp: Date.now() }
      store.put(cache);
      console.log("Save cached result", result);
      await tx.complete;
    } catch (e) {
      console.error('Save cached data error', e)
    }
  }
  return result;
};

export async function estimateBlocksTilNextMasternodeRewards(
  owners: string | string[]
) {
  const { result } = await listMasternodes();
  return merge(
    ([] as string[])
      .concat(owners)
      .map((owner) => ({ [owner]: estimateBlocksTil(result, owner) }))
  );
}

export async function estimateBlocksTilNextMasternodeReward(owner: string) {
  const { result } = await listMasternodes();
  return estimateBlocksTil(result, owner);
}

export async function rpc<V>(
  url = "",
  method = "",
  params: string[] = [],
  id = 15
): Promise<{
  id: number;
  jsonrpc: string;
  result: V;
}> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  }).then((v) => v.json());
}

export function merge<V>(arr: V[]): V {
  return Object.assign({}, ...arr);
}

export function mapValues(values: any, fn: (v: any, k: string) => any) {
  return Object.keys(values).reduce((acc, k) => {
    acc[k] = fn(values[k], k);
    return acc;
  }, {} as any);
}
