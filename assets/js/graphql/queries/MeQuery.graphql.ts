import { gql } from 'apollo-boost';

export interface IMeQueryData {
  me: {
    id: string;
    email: string;
    name: string;
  };
}

export default gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`;
