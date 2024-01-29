'use client';

import { Controller, useForm } from 'react-hook-form';
import Datepicker, { DateType } from 'react-tailwindcss-datepicker';
import TimePicker from 'react-time-picker';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export interface RecordValues {
  heartRate: number;
  maxPressure: number;
  minPressure: number;
  observations?: string;
  date: DateType;
  time: string;
}

export interface RecordFormProps<Schema extends z.ZodTypeAny = z.ZodTypeAny> {
  submitHandler: (args: any) => Promise<void> | void;
  initialValues?: Partial<RecordValues>;
  schema: Schema;
}

export default function RecordForm<Schema extends z.ZodTypeAny>({
  submitHandler,
  schema,
  initialValues = {},
}: RecordFormProps<Schema>) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecordValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  return (
    <form
      className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-[#182138] shadow-md"
      onSubmit={handleSubmit(submitHandler)}
    >
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
  );
}
