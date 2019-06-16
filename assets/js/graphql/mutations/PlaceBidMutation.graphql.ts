import { gql } from 'apollo-boost';

export interface IPlaceBidMutationData {
  placeBid: {
    id: string;
    amount_paid: number;
    shares_price: number;
    options_ratio_numerator: number;
    options_ratio_denominator: number;
    options_strike_price: number;
    user_id: string;
    organisation_id: string;
  };
}

export interface IPlaceBidMutationVariables {
  bid: {
    amount_paid: number;
    shares_price: number;
    options_ratio_numerator: number;
    options_ratio_denominator: number;
    options_strike_price: number;
    user_id: string;
    organisation_id: string;
  };
}

export default gql`
  mutation PlaceBidMutation($bid: BidInput!) {
    placeBid(bid: $bid) {
      id
      amount_paid
      shares_price
      options_ratio_numerator
      options_ratio_denominator
      options_strike_price
      user_id
      organisation_id
    }
  }
`;
