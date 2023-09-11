import AppLayout from '@/components/layout/AppLayout';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import CustomProvider from '../provider';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Vincent connect and chat with your friend',
};

export default function FrontLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <CustomProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {authModal}
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </ThemeProvider>
    </CustomProvider>
  );
}
