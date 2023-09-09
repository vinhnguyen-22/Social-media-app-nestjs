'use client';

import { RegisterForm } from '@/components/form/RegisterForm';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Vincent | Register',
  description: 'Vincent connect and chat with your friend',
};

export default function Register() {
  const [authState, setAuthState] = useState<any>({
    email: '',
    password: '',
  });

  return <RegisterForm />;
}
