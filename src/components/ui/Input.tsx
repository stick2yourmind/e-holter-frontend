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

const inputVariants = cva(
  'rounded outline outline-1 outline-[color:#475569] bg-[#182138] text-[color:#E3E7EE] text-sm font-normal p-3 w-full',
  {
    variants: {
      variant: {
        primary: 'focus-visible:outline focus-visible:outline-teal-500',
        secondary: 'border-white text-white bg-black hover:bg-neutral-800',
      },
      variantSize: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      variantSize: 'md',
    },
  },
);
