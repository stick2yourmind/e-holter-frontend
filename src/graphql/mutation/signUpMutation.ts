import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation Mutation($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      token
      user {
        email
        username
      }
    }
  }
`;
