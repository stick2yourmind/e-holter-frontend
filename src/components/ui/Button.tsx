import cn from '@/lib/tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

function Button({ children, className, variant, variantSize, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant, variantSize, className }))}>
      {children}
    </button>
  );
}
export default Button;

const buttonVariants = cva('rounded-md', {
  variants: {
    variant: {
      primary: 'border-2 border-black text-black bg-white hover:bg-neutral-200',
      secondary: 'border-2 border-white text-white bg-black hover:bg-neutral-800',
      danger: 'border-none text-white bg-red-500 hover:bg-red-600',
    },
    variantSize: {
      sm: 'text-sm px-1 py-0',
      md: 'text-base px-2 py-0',
      lg: 'text-xl px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    variantSize: 'md',
  },
});
