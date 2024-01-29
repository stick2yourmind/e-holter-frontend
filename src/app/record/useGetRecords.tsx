import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { GET_RECORDS_QUERY } from '@/graphql/query/getRecords';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Record {
  id: number;
  heartRate: number;
  maxPressure: number;
  minPressure: number;
  date: string;
  observations: string | null;
}

interface RecordData {
  records: Record[];
}

const useGetRecords = () => {
  const { data, loading, error } = useQuery<RecordData>(GET_RECORDS_QUERY);

  return { records: !loading ? data?.records : null, loading, error: error?.message ? error.message : null };
};

export default useGetRecords;
