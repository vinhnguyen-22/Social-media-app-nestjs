'use client';

import { SignInForm } from '@/components/form/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vincent | Login',
  description: 'Vincent connect and chat with your friend',
};

export default function Login() {
  return <SignInForm />;
}
