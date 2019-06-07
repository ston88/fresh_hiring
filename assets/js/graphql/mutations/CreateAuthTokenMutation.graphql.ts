import { gql } from 'apollo-boost';

export interface ICreateAuthTokenMutationData {
  createAuthToken: string;
}

export interface ICreateAuthTokenMutationVariables {
  email: string;
  redirectTo?: string;
}

export default gql`
  mutation CreateAuthTokenMutation($email: String!, $redirectTo: String) {
    createAuthToken(email: $email, redirectTo: $redirectTo)
  }
`;
