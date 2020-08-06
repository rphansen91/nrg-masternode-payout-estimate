import { IMasternode, WEI } from "./types";
import { estimateBlocksTil } from './estimate'

const nodeApi = "https://nodeapi.energi.network/";

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

export const listMasternodes = () => {
  return rpc<IMasternode[]>(nodeApi, "masternode_listMasternodes");
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
