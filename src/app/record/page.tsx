'use client';

import { HiPlusCircle } from 'react-icons/hi';
import dayjs from 'dayjs';
import { createRecordSchema } from '@/schema/record/createRecordSchema';
import Modal from '@/components/Dialog/Dialog';
import RecordCard from '@/components/RecordCard/RecordCard';
import './timepicker.css';
import RecordForm from '@/components/RecordForm/RecordForm';
import useCreateRecord from './useCreateRecord';
import useGetRecords from './useGetRecords';

const defaultValues = {
  date: dayjs().format('YYYY-MM-DD'),
  time: dayjs().format('HH:mm'),
};

export default function Records() {
  const { records, loading } = useGetRecords();
  console.log('🚀 ~ file: page.tsx:20 ~ Records ~ records:', records);
  const { onCreateRecord } = useCreateRecord();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B15] text-gray-100">
      {/* <Modal>
        <div className="absolute flex h-full w-full items-center justify-center bg-[#070000bb]">
          <RecordForm
            initialValues={defaultValues}
            schema={createRecordSchema}
            submitHandler={onCreateRecord}
          />
        </div>
      </Modal> */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl">Blood pressure measurement</h2>
        <button
          className="flex items-center justify-center gap-2 self-end rounded px-2 py-1 text-sm text-[color:#E3E7EE] outline outline-1 outline-[color:#475569]"
          onClick={() => console.log('Open modal')}
        >
          <HiPlusCircle />
          <span>CREATE RECORD</span>
        </button>
        <div className="grid grid-cols-4 gap-6">
          {records?.map((record) => (
            <RecordCard
              key={record.id}
              minPressure={record.minPressure}
              maxPressure={record.maxPressure}
              pulse={record.heartRate}
              date={record.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
