import cn from '@/lib/tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  children?: ReactNode;
  name: string;
  register: UseFormRegister<any>;
  errors: FormState<any>['errors'];
}

function Input({ children, className, variant, variantSize, register, errors, name, ...props }: InputProps) {
  return (
    <>
      <input
        {...props}
        {...register(name)}
        id={name}
        className={cn(inputVariants({ variant, variantSize, className }))}
      >
        {children}
      </input>
      {errors[name]?.message && <p className="text-red-600">{String(errors[name]?.message)}</p>}
    </>
  );
}
export default Input;

const inputVariants = cva('rounded-md', {
  variants: {
    variant: {
      primary: 'text-gray-950 rounded focus-visible:outline focus-visible:outline-teal-500',
      secondary: 'border-white text-white bg-black hover:bg-neutral-800',
    },
    variantSize: {
      sm: 'text-sm p-1 outline-1',
      md: 'text-base p-2 outline-2',
      lg: 'text-xl p-3 outline-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    variantSize: 'md',
  },
});
