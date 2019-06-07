import { gql } from 'apollo-boost';

export interface ICapitalRaiseQueryData {
  capitalRaise: {
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
  };
}

export interface ICapitalRaiseQueryVariables {
  id: string;
}

export default gql`
  query CapitalRaiseQuery($id: ID!) {
    capitalRaise(id: $id) {
      id
      insertedAt
      updatedAt

      allocationAvailable
      banner
      bidsDue
      biddingOpen
      biddingClose
      gics
      haltPrice
      instrument
      key
      logo
      marketCap
      maxAmount
      minAmount
      name
      optionsAvailable
      optionsExpiration
      optionsRatioNumerator
      optionsRatioDenominator
      optionsStrikePrice
      price
      summary
      type
      website
    }
  }
`;
