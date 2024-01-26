'use client';

import { HiPlusCircle } from 'react-icons/hi';
import dayjs from 'dayjs';
import { createRecordSchema } from '@/schema/record/createRecordSchema';
import Modal from '@/components/Dialog/Dialog';
import RecordCard from '@/components/RecordCard/RecordCard';
import './timepicker.css';
import RecordForm from '@/components/RecordForm/RecordForm';
import useCreateRecord from './useCreateRecord';

const defaultValues = {
  date: dayjs().format('YYYY-MM-DD'),
  time: dayjs().format('HH:mm'),
};

export default function Records() {
  const { onCreateRecord } = useCreateRecord();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B15] text-gray-100">
      <Modal>
        <div className="absolute flex h-full w-full items-center justify-center bg-[#070000bb]">
          <RecordForm
            initialValues={defaultValues}
            schema={createRecordSchema}
            submitHandler={onCreateRecord}
          />
        </div>
      </Modal>
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
