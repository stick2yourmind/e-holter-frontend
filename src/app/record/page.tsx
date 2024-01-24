'use client';

import { Controller, useForm } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';
import { toast } from 'sonner';
import Datepicker, { DateType } from 'react-tailwindcss-datepicker';
import TimePicker from 'react-time-picker';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';
import { createRecordSchema } from '@/schema/record/createRecordSchema';
import { CREATE_RECORD_MUTATION } from '@/graphql/mutation/createRecord';
import Modal from '@/components/Dialog/Dialog';
import RecordCard from '@/components/RecordCard/RecordCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import './timepicker.css';

interface CreateRecordValues {
  heartRate: number;
  maxPressure: number;
  minPressure: number;
  observations?: string;
  date: DateType;
  time: string;
}

export default function Records() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateRecordValues>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),
    },
  });
  const [createRecord] = useMutation(CREATE_RECORD_MUTATION);

  const onCreateRecord = async (values: any) => {
    console.log('🚀 ~ file: page.tsx:48 ~ onCreateRecord ~ values:', values);
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
      <Modal>
        <div className="absolute flex h-full w-full items-center justify-center bg-[#070000bb]">
          <form
            className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-[#182138] p-8 shadow-md"
            onSubmit={handleSubmit(onCreateRecord)}
          >
            <h1 className="text-xl">New record</h1>
            <label htmlFor="date" className="self-start">
              Date
            </label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Datepicker
                  i18n={'en'}
                  inputClassName="rounded bg-[#182138] p-3 text-sm font-normal text-[color:#E3E7EE] outline outline-1 outline-[color:#475569] w-full"
                  onChange={(date) => {
                    field.onChange(date?.startDate);
                  }}
                  value={{
                    startDate: field.value,
                    endDate: field.value,
                  }}
                  asSingle={true}
                  showShortcuts={false}
                  useRange={false}
                />
              )}
            />
            {errors.date?.message && <p className="text-red-600">{String(errors.date?.message)}</p>}

            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <TimePicker
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  disableClock={true}
                  format="hh:mm a"
                  className="rounded bg-[#182138] p-3 text-sm font-normal text-[color:#E3E7EE] outline outline-1  outline-[color:#475569]"
                />
              )}
            />
            {errors.time?.message && <p className="text-red-600">{String(errors.time?.message)}</p>}
            <fieldset className="w-full">
              <label htmlFor="maxPressure" className="self-start">
                Systolic or max pressure
              </label>
              <Input
                type="string"
                name="maxPressure"
                register={register}
                errors={errors}
                placeholder="example: 122"
                className="mt-1"
              />
            </fieldset>

            <fieldset className="w-full">
              <label htmlFor="minPressure" className="self-start">
                Diastolic or min pressure
              </label>
              <Input
                type="string"
                name="minPressure"
                register={register}
                errors={errors}
                placeholder="example: 85"
                className="mt-1"
              />
            </fieldset>

            <fieldset className="w-full">
              <label htmlFor="heartRate" className="self-start">
                Heart rate per minute
              </label>
              <Input
                type="string"
                name="heartRate"
                register={register}
                errors={errors}
                placeholder="example: 90"
                className="mt-1"
              />
            </fieldset>

            <fieldset className="w-full">
              <label htmlFor="observations" className="self-start">
                Observations
              </label>
              <Input
                type="string"
                name="observations"
                register={register}
                errors={errors}
                placeholder="example: After running"
                className="mt-1"
              />
            </fieldset>

            <Button type="submit" variantSize="lg" className="mt-2 text-sm font-semibold text-gray-50">
              Crear
            </Button>
          </form>
        </div>
      </Modal>
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
