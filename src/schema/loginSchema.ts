import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must have 6 characters at least' })
    .max(20, { message: 'Password must have 20 characters at most' }),
});
