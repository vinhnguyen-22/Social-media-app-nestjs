import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Vincent connect and chat with your friend',
};

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  );
}
