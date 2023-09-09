import MobileNav from './navbar/MobileNav';
import LeftSidebar from './sidebar/LeftSidebar';
import RightSidebar from './sidebar/RightSidebar';

export default function AppLayout() {
  return (
    <div className='p-5 md:container'>
      <div className='flex'>
        <LeftSidebar />

        <div className='h-screen w-full md:w-3/4 md:p-6 lg:w-2/4 lg:px-8 lg:py-4 xl:px-12'>
          <MobileNav />
          <h1>I am Feed Area</h1>
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
