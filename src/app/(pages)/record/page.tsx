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
import SkeletonRecordCard from '@/components/RecordCard/SkeletonRecordCard';

const defaultValues = {
  date: dayjs().format('YYYY-MM-DD'),
  time: dayjs().format('HH:mm'),
};

export default function Records() {
  const { records, loading } = useGetRecords();
  console.log('🚀 ~ file: page.tsx:20 ~ Records ~ records:', records);
  const {
    onCreateRecord,
    isCreateRecord: isModal,
    initNewRecord: openModal,
    resetNewRecord: closeModal,
  } = useCreateRecord();

  return (
    <main className="flex min-h-screen max-w-sm items-center justify-center bg-[#070B15] text-gray-100 sm:max-w-xl xl:max-w-7xl">
      <Modal isOpen={isModal} onClose={closeModal} title="New record">
        <RecordForm
          initialValues={defaultValues}
          schema={createRecordSchema}
          submitHandler={(values) => {
            onCreateRecord(values);
            closeModal();
          }}
        />
      </Modal>
      <section className="flex w-full flex-col gap-8 ">
        <h2 className="text-2xl">Blood pressure measurement</h2>
        <button
          className="flex items-center justify-center gap-2 self-end rounded px-2 py-1 text-sm text-[color:#E3E7EE] outline outline-1 outline-[color:#475569]"
          onClick={openModal}
        >
          <HiPlusCircle />
          <span>CREATE RECORD</span>
        </button>
        <div className="grid grid-cols-1 justify-items-center gap-6  sm:grid-cols-2 xl:grid-cols-4">
          {!loading
            ? records?.map((record) => (
                <RecordCard
                  key={record.id}
                  minPressure={record.minPressure}
                  maxPressure={record.maxPressure}
                  pulse={record.heartRate}
                  date={record.date}
                />
              ))
            : Array.from({ length: 10 }).map((_, i) => <SkeletonRecordCard key={i} />)}
        </div>
      </section>
    </main>
  );
}
