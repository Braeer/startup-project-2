'use client';

import { usePathname } from 'next/navigation';
import { NavItem } from './index';

export const NavBar = () => {
  const pathnameSource = usePathname();
  const pathname = pathnameSource.split('/').slice(0, 3).join('/');

  return (
    <nav className="fixed bottom-0 w-full bg-white rounded-t-main max-w-[900px]">
      <ul className="flex space-x-4 w-full justify-around p-5">
        {/* <NavItem
          href="/dashboard"
          logoPath="/icons/home.svg"
          title="Главная"
          active={pathname === '/dashboard'}
        /> */}
        <NavItem
          href="/dashboard/cases"
          logoPath="/icons/cases.svg"
          title="Кейсы"
          active={pathname === '/dashboard/cases'}
        />
        <NavItem
          href="/dashboard/handbook"
          logoPath="/icons/book.svg"
          title="Справочник"
          active={pathname === '/dashboard/handbook'}
        />
        <NavItem
          href="/dashboard/profile"
          logoPath="/icons/user.svg"
          title="Профиль"
          active={pathname === '/dashboard/profile'}
        />
      </ul>
    </nav>
  );
};
