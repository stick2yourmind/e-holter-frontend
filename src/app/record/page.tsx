'use client';

import RecordCard from '@/components/RecordCard/RecordCard';
import { CREATE_RECORD_MUTATION } from '@/graphql/mutation/createRecord';
import { ApolloError, useMutation } from '@apollo/client';
import { HiPlusCircle } from 'react-icons/hi';
import { toast } from 'sonner';

export default function Records() {
  const [createRecord] = useMutation(CREATE_RECORD_MUTATION);
  const onCreateRecord = async () => {
    const data = {
      createRecordInput: {
        date: '2024-01-22T19:57:36.540Z',
        heartRate: 98,
        maxPressure: 123,
        minPressure: 88,
        observations: 'despues de comer',
      },
    };
    try {
      const result = await createRecord({
        variables: {
          createRecordInput: data.createRecordInput,
        },
      });
      toast.success('Record created succesfully');
      console.log({ result });
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:43 ~ onSignIn ~ error:', JSON.stringify(error));
      if (error instanceof ApolloError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('The server is not reachable');
        }
      }

      return toast.error('An error has ocurred');
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B15] text-gray-100">
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl">Blood pressure measurement</h2>
        <button
          className="flex items-center justify-center gap-2 self-end rounded px-2 py-1 text-sm text-[color:#E3E7EE] outline outline-1 outline-[color:#475569]"
          onClick={onCreateRecord}
        >
          <HiPlusCircle />
          <span>CREATE RECORD</span>
        </button>
        <div className="grid grid-cols-4 gap-6">
          <RecordCard minPressure={85} maxPressure={120} pulse={91} date="2024-01-20T05:32:20.000Z" />
          <RecordCard minPressure={87} maxPressure={130} pulse={94} date="2024-01-18T07:32:20.000Z" />
          <RecordCard minPressure={92} maxPressure={135} pulse={99} date="2024-01-14T07:32:20.000Z" />
          <RecordCard minPressure={88} maxPressure={133} pulse={90} date="2024-01-13T07:32:20.000Z" />
          <RecordCard minPressure={91} maxPressure={140} pulse={93} date="2024-01-12T07:32:20.000Z" />
        </div>
      </section>
    </main>
  );
}
