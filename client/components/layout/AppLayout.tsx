import MobileNav from './navbar/MobileNav';
import Navbar from './navbar/Navbar';
import LeftSidebar from './sidebar/LeftSidebar';
import RightSidebar from './sidebar/RightSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = null;
  // const user = {
  //   name: 'Vincent',
  //   photo:
  //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  //   email: 'vincent@me.com',
  // };
  return (
    <>
      <Navbar user={user || undefined} />
      <div className='p-5 md:container'>
        <div className='flex'>
          <LeftSidebar />
          <div className='h-screen w-full md:w-3/4 md:p-6 lg:w-2/4 lg:px-8 lg:py-4 xl:px-12'>
            <MobileNav user={user || undefined} />
            {children}
          </div>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
