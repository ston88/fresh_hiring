import { gql } from 'apollo-boost';

export interface ICapitalRaisesListQueryData {
  edges: Array<{
    node: {
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
  total: number;
}

export interface ICapitalRaisesListQueryVariables {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  options?: {
    filters: Array<{
      key: string;
      value: string;
    }>;
    orders: Array<{
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
      total(options: $options)
    }
  }
`;
