'use client';

import { RegisterForm } from '@/components/form/RegisterForm';
import { Metadata } from 'next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Vincent | Register',
  description: 'Vincent connect and chat with your friend',
};

export default function login() {
  const { theme } = useTheme();
  const [authState, setAuthState] = useState<any>({
    email: '',
    password: '',
  });

  return (
    <>
      <div className='flex justify-center'>
        <Image
          className={theme != 'light' ? 'invert' : ''}
          src='/images/logo.png'
          width={150}
          height={150}
          alt='logo'
        />
      </div>
      <RegisterForm />
    </>
  );
}
