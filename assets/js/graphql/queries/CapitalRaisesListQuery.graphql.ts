import { gql } from 'apollo-boost';
// Types
import { ICapitalRaise } from '../../utils/types';

export interface ICapitalRaisesListQueryData {
  capitalRaisesList: {
    edges: Array<{
      node: ICapitalRaise;
    }>;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      startCursor: string;
      hasPreviousPage: boolean;
    };
    options: {
      filters: Array<{
        key: string;
        value: string;
      }>;
      orders: Array<{
        key: string;
        value: string;
      }>;
    };
  };
}

export interface ICapitalRaisesListQueryVariables {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  options?: {
    filters?: Array<{
      key: string;
      value: string;
    }>;
    orders?: Array<{
      key: string;
      value: string;
    }>;
  };
}

export default gql`
  query CapitalRaisesListQuery($first: Int, $after: String, $last: Int, $before: String, $options: OptionsInput) {
    capitalRaisesList(first: $first, after: $after, last: $last, before: $before, options: $options) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
      options {
        filters {
          key
          value
        }
        orders {
          key
          value
        }
      }
    }
  }
`;
