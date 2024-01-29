import { gql } from '@apollo/client';

export const GET_RECORDS_QUERY = gql`
  query Query {
    records {
      id
      date
      heartRate
      maxPressure
      minPressure
      observations
    }
  }
`;
