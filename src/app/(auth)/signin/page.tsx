'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SIGN_IN_MUTATION } from '@/graphql/mutation/signInMutation';
import { loginSchema } from '@/schema/loginSchema';
import { ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface LoginValues {
  email: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const [login] = useMutation(SIGN_IN_MUTATION);

  const onSignIn = async ({ email, password }: LoginValues) => {
    try {
      const result = await login({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
      toast.success('Sign in succesfully');
      console.log({ result });
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:43 ~ onSignIn ~ error:', JSON.stringify(error));
      if (error instanceof ApolloError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('The server is not reachable');
        }

        return toast.error('Invalid email or password');
      }

      return toast.error('An error has ocurred');
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-[#64748B] text-gray-100">
      <form
        className="flex max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-[#182138] p-8 shadow-md"
        onSubmit={handleSubmit(onSignIn)}
      >
        <h1 className="text-xl">Sign In</h1>
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

        <Button type="submit" variantSize="lg" className="mt-2 text-sm font-semibold text-gray-50">
          Sign in
        </Button>

        <p className="mt-6 flex gap-1 self-end text-sm font-normal">
          Don&apos;t have an account?
          <Link href="signup" className="underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
