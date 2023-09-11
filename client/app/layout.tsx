import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vincent',
  description: 'Vincent connect and chat with your friend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cn('antialiased ', inter.className)}>
      <body className='min-h-screen antialiased md:pt-12'>
        <main className='container mx-auto h-full max-w-7xl '>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
