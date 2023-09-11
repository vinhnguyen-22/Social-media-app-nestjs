'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './button';

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      variant={'destructive'}
      className='h-6 w-6 rounded-md p-0'
      aria-label='close modal'
      onClick={() => router.back()}
    >
      <X className='h-4 w-4' />
    </Button>
  );
};

export default CloseModal;
