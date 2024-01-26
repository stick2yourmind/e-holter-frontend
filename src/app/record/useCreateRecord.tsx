import { CREATE_RECORD_MUTATION } from '@/graphql/mutation/createRecord';
import { ApolloError, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { DateType } from 'react-tailwindcss-datepicker';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

interface CreateRecordValues {
  heartRate: number;
  maxPressure: number;
  minPressure: number;
  observations?: string;
  date: DateType;
  time: string;
}

const useCreateRecord = () => {
  const [createRecord] = useMutation<CreateRecordValues>(CREATE_RECORD_MUTATION);

  const onCreateRecord = async (values: CreateRecordValues) => {
    const date = dayjs(values.date).toISOString().split('T')[0];
    const [hour, minute] = values.time.split(':').map((stringTime) => Number(stringTime));
    const datetime = dayjs(date).tz('America/Argentina/Buenos_Aires').hour(hour).minute(minute).toISOString();

    const createRecordInput = {
      date: datetime,
      heartRate: values.heartRate,
      maxPressure: values.maxPressure,
      minPressure: values.minPressure,
      observations: values?.observations,
    };
    try {
      const result = await createRecord({
        variables: {
          createRecordInput,
        },
      });
      toast.success('Record created succesfully');
      console.log({ result });
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:43 ~ onSignIn ~ error:', JSON.stringify(error));
      if (error instanceof ApolloError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          toast.error('The server is not reachable');
          return;
        }
      }

      toast.error('An error has ocurred');
      return;
    }
  };
  return { onCreateRecord };
};
export default useCreateRecord;
