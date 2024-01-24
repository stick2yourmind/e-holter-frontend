import * as z from 'zod';

export const createRecordSchema = z.object({
  date: z
    .string({ required_error: 'date is required', invalid_type_error: 'date is required' })
    .pipe(z.coerce.date()),
  time: z
    .string({ required_error: 'time is required', invalid_type_error: 'time is required' })
    .refine((value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value), 'invalid time'),
  heartRate: z.coerce
    .number()
    .int({ message: 'must be positive a positive integer' })
    .gt(0, { message: 'must be positive a positive integer' }),
  maxPressure: z.coerce
    .number()
    .int({ message: 'must be positive a positive integer' })
    .gt(0, { message: 'must be positive a positive integer' }),
  minPressure: z.coerce
    .number()
    .int({ message: 'must be positive a positive integer' })
    .gt(0, { message: 'must be positive a positive integer' }),
  observations: z.string().optional(),
});
