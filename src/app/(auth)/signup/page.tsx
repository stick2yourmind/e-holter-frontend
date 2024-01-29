'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SIGN_UP_MUTATION } from '@/graphql/mutation/signUpMutation';
import { registerSchema } from '@/schema/registerSchema';
import { ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: zodResolver(registerSchema) });
  const [signup] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => push('/record'),
  });

  const onSignIn = async ({ email, password }: SignUpValues) => {
    try {
      const result = await signup({
        variables: {
          registerInput: {
            email,
            password,
          },
        },
      });
      toast.success('Sign up succesfully');
      console.log({ result });
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:43 ~ onSignIn ~ error:', JSON.stringify(error));
      if (error instanceof ApolloError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('The server is not reachable');
        }

        if (error.message === 'not unique resource') {
          return toast.error('Email already registered');
        }
      }

      return toast.error('An error has ocurred');
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-[#070B15] text-gray-100">
      <form
        className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-[#182138] p-8 shadow-md"
        onSubmit={handleSubmit(onSignIn)}
      >
        <h1 className="text-xl">Sign Up Now!</h1>
        <fieldset className="w-full">
          <label htmlFor="email" className="self-start">
            Enter your email
          </label>
          <Input
            type="text"
            name="email"
            register={register}
            errors={errors}
            placeholder="example@mail.com"
            className="mt-1"
          />
        </fieldset>

        <fieldset className="w-full">
          <label htmlFor="password" className="self-start">
            Enter your password
          </label>
          <Input
            type="password"
            name="password"
            register={register}
            errors={errors}
            placeholder="Choose a password"
            className="mt-1"
          />
        </fieldset>

        <fieldset className="w-full">
          <label htmlFor="confirmPassword" className="self-start">
            Confirm your password
          </label>
          <Input
            type="password"
            name="confirmPassword"
            register={register}
            errors={errors}
            placeholder="Confirm your password"
            className="mt-1"
          />
        </fieldset>

        <Button type="submit" variantSize="lg" className="mt-2 text-sm font-semibold text-gray-50">
          Sign up
        </Button>
        <p className="text-xs font-normal">By registering you accept our Terms and Privacy Policy</p>
        <p className="mt-6 flex gap-1 self-end text-sm font-normal">
          Already have an account?
          <Link href="signin" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
