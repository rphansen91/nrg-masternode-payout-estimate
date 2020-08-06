export const WEI = 1e18;

export interface IMasternode {
  AnnouncedBlock: number;
  Collateral: string;
  Enode: string;
  IsActive: boolean;
  IsAlive: boolean;
  Masternode: string;
  Owner: string;
  SWFeatures: string;
  SWVersion: string;
}