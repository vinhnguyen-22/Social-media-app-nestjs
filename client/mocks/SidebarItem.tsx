import { Bell, Home, Search, User2 } from 'lucide-react';

export const LeftSidebarItem = [
  {
    name: 'Home',
    href: '/',
    icon: <Home height={25} width={25} />,
  },
  {
    name: 'Explore',
    href: '/explore',
    icon: <Search height={25} width={25} />,
  },
  {
    name: 'Notifications',
    href: '/noti',
    icon: <Bell height={25} width={25} />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <User2 height={25} width={25} />,
  },
];
