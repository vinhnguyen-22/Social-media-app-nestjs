'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from '../Icons';
import { Button } from '../ui/button';

// import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email('Invalid email'),
  password: z.string().min(5, {
    message: 'password must be at least 5 characters.',
  }),
});

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver<any>(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    console.log(data);
  }

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast({
        title: 'There was a problem',
        description: 'There was an error signing you in.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='text-2xl font-bold text-orange-500'>Login</h1>
        <p>Welcome Back</p>
        <p className='mx-auto max-w-xs text-sm'>
          By continuing, you are setting up a{' '}
          <span className='font-bold text-orange-500'>Vincent </span>account and
          agree to our User Agreement and Privacy Policy.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className='mt-6 w-full' type='submit'>
            Login
          </Button>
          <Button
            className='mt-4 w-full'
            onClick={loginWithGoogle}
            loading={loading}
            size='sm'
            disabled={loading}
          >
            {loading ? null : <Icons.google className='mr-2 h-4 w-4' />}
            Google
          </Button>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            Or
          </div>
          <div className='mt-6 italic'>
            <span>Don&rsquo;t have an account ?</span>
            <Link
              href='/register'
              className='ml-2 font-bold text-orange-400 hover:underline'
            >
              Register
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
