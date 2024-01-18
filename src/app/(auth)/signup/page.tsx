'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SIGN_UP_MUTATION } from '@/graphql/mutation/signUpMutation';
import { registerSchema } from '@/schema/registerSchema';
import { ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: zodResolver(registerSchema) });
  const [signup] = useMutation(SIGN_UP_MUTATION);

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

        <label htmlFor="password">Confirm password</label>
        <Input type="password" name="confirmPassword" register={register} errors={errors} />

        <Button type="submit" variant="secondary" variantSize="lg">
          Enviar
        </Button>
      </form>
    </main>
  );
}
