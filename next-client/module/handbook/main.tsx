'use client';

import { Button } from '@/components/index';
import { handbookName } from '@/lib/index';
import { getHandBooksTypes } from '@/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const MainModuleHandbooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHandBooksTypes().then((res) => setData(res));

    return () => setData([]);
  }, []);

  if (!data) {
    return;
  }

  return (
    <section className="flex flex-wrap w-full gap-4 mt-8">
      {data.map((type: string) => (
        <Link className="w-full" key={type} href={`/dashboard/handbook/${type}`}>
          <Button className="w-full" key={type} size={'lg'}>
            {handbookName(type)}
          </Button>
        </Link>
      ))}
    </section>
  );
};
