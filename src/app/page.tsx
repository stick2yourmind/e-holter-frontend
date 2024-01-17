'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { loginSchema } from '@/schema/loginSchema';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface LoginValues {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const [login] = useMutation(LOGIN_MUTATION);

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
    <main className="flex items-center justify-center bg-stone-950 text-gray-100 h-screen">
      <form
        action=""
        className="grid w-80 gap-2 border-4 rounded-lg border-gray-100 p-4"
        onSubmit={handleSubmit(onSignIn)}
      >
        <label htmlFor="email">Email</label>
        <Input type="text" name="email" register={register} errors={errors} />

        <label htmlFor="password">Password</label>
        <Input type="password" name="password" register={register} errors={errors} />

        <Button type="submit" variant="secondary" variantSize="lg">
          Enviar
        </Button>
      </form>
    </main>
  );
}
