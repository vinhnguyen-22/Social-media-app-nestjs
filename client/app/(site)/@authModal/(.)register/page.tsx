import { RegisterForm } from '@/components/form/RegisterForm';
import CloseModal from '@/components/ui/close-modal';
import { FC } from 'react';

interface RegisterModalProps {}

const page: FC<RegisterModalProps> = ({}) => {
  return (
    <div className='fixed inset-0 z-10 bg-background pt-[70px]'>
      <div className='container flex h-full items-center justify-center'>
        <div className='relative mx-2 w-full rounded-lg bg-muted p-6 md:w-1/3'>
          <div className='absolute right-4 top-4'>
            <CloseModal />
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default page;
