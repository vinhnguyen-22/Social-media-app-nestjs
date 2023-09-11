'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ title = false }: { title?: boolean }) {
  const { theme } = useTheme();

  return (
    <Link href='/' className='flex items-center justify-center '>
      <div className='rounded-lg bg-background'>
        <Image
          className={theme != 'light' ? 'invert' : ''}
          src='/images/logo.png'
          width={70}
          height={70}
          alt='logo'
        />
      </div>
      {title ? <h1 className='ml-4 text-xl font-bold'>Vincent</h1> : <></>}
    </Link>
  );
}
