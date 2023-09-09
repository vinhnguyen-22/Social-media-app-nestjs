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
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
// import { toast } from '@/components/ui/use-toast';

const FormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z
      .string()
      .min(2, 'email must be at least 2 characters.')
      .email('Invalid email'),
    password: z.string().min(5, 'password must be at least 5 characters.'),
    confirmPassword: z
      .string()
      .min(5, 'password must be at least 5 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
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

  return (
    <>
      <div className=' flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-orange-500'>Register</h1>
        <p>Welcome Back</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='mt-5'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }: any) => (
                  <FormItem className='mt-2'>
                    <FormLabel>first name</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter your first name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }: any) => (
                  <FormItem className='mt-2'>
                    <FormLabel>last name</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter your last name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }: any) => (
                <FormItem className='mt-2'>
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
                <FormItem className='mt-2'>
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

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }: any) => (
                <FormItem className='mt-2'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Re-enter your password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className='mt-6 w-full' type='submit'>
            Register
          </Button>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            Or
          </div>
          <div className='mt-6 italic'>
            <span>You had an account ?</span>
            <Link
              href='/login'
              className='ml-2 font-bold text-orange-400 hover:underline'
            >
              Login
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
