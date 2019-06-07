import { gql } from 'apollo-boost';

export interface IMeQueryData {
  me: {
    email: string;
    name: string;
  };
}

export default gql`
  query MeQuery {
    me {
      email
      name
    }
  }
`;
