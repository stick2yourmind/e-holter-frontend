import { gql } from '@apollo/client';

export const CREATE_RECORD_MUTATION = gql`
  mutation Mutation($createRecordInput: CreateRecordInput!) {
    createRecord(createRecordInput: $createRecordInput) {
      date
      heartRate
      id
      maxPressure
      minPressure
      observations
    }
  }
`;
