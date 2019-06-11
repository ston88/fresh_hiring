export interface ICapitalRaise {
  id: string;
  insertedAt: string;
  updatedAt: string;

  allocationAvailable: string;
  banner: string;
  bidsDue: string;
  biddingOpen: string;
  biddingClose: string;
  gics: string;
  haltPrice: number;
  instrument: string;
  key: string;
  logo: string;
  marketCap: number;
  maxAmount: number;
  minAmount: number;
  name: string;
  optionsAvailable: boolean;
  optionsExpiration: number;
  optionsRatioNumerator: number;
  optionsRatioDenominator: number;
  optionsStrikePrice: number;
  price: number;
  summary: string;
  type: string;
  website: string;
}
