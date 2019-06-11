import { gql } from 'apollo-boost';
// Types
import { ICapitalRaise } from '../../utils/types';

export interface ICapitalRaiseQueryData {
  capitalRaise: ICapitalRaise;
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
