'use client';

import Link from 'next/link';
import { logoutRequest } from '@/lib';
import { Button } from '@/components/index';

export const ListButtons = () => {
  const logout = () => {
    logoutRequest();
  };

  return (
    <>
      <Link href="/dashboard/profile/edit">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Редактировать профиль
        </Button>
      </Link>
      <Link href="/dashboard/profile/password">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Редактировать пароль
        </Button>
      </Link>
      <Link href="/dashboard/profile/favorites">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Избранное
        </Button>
      </Link>
      <Link href="/dashboard/profile/other">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Прочие
        </Button>
      </Link>
      <Button onClick={logout} variant="outline" size={'lg'} className="mt-4 w-full">
        Выйти из аккаунта
      </Button>
    </>
  );
};
