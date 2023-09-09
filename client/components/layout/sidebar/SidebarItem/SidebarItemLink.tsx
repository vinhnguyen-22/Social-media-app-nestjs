'use client';
import { LeftSidebarItem } from '@/mocks/SidebarItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItemLink = () => {
  const pathName = usePathname();

  return (
    <ul className='mt-10'>
      {LeftSidebarItem.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={`mt-6 flex items-center justify-start space-x-4 hover:font-bold hover:text-orange-500 ${
              pathName == item.href ? 'font-bold' : ''
            }`}
          >
            {item.icon}
            <h3 className='text-lg lg:text-xl'>{item.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarItemLink;
