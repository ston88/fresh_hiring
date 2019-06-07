import { gql } from 'apollo-boost';

export interface ICreateUserMutationData {
  createUser: {
    email: string;
    name: string;
  };
}

export interface ICreateUserMutationVariables {
  redirectTo?: string;
  user: {
    email: string;
    name: string;
  };
}

export default gql`
  mutation CreateUserMutation($redirectTo: String, $user: UserInput!) {
    createUser(redirectTo: $redirectTo, user: $user) {
      email
      name
    }
  }
`;
