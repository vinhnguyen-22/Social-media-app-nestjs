'use client';
import Logo from '@/components/common/Logo';
import SidebarItemLink from './SidebarItem/SidebarItemLink';

export default function LeftSidebar() {
  return (
    <div className='hidden h-screen border-r-2 md:block md:w-1/4 md:pt-5 lg:p-10'>
      <Logo title />

      <SidebarItemLink />
    </div>
  );
}
