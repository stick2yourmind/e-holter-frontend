import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;
