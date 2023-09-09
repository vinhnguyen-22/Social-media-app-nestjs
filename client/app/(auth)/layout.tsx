import Logo from '@/components/common/Logo';
import { ThemeToggleBtn } from '@/components/common/ThemeToggleBtn';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vincent | Auth',
  description: 'Vincent connect and chat with your friend',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <div className='bg-background'>
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='mx-2 w-full rounded-lg bg-muted p-6 md:w-1/3'>
            <ThemeToggleBtn />
            <div className='flex justify-center'>
              <Logo />
            </div>
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
