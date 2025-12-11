'use client';

import { Button } from '@/components/index';
import { getHandBooksByTypes } from '@/services';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  slug: string;
};

export const TypesModuleHandbooks = ({ slug }: Props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHandBooksByTypes({ type: slug }).then((res) => {
      setData(res);
    });

    return () => setData([]);
  }, []);

  if (!data) {
    return;
  }

  return (
    <section className="flex flex-wrap w-full gap-4 mt-8">
      {data &&
        data.map(
          (
            item: {
              id: string;
              subtype: string;
              title: string;
            },
            _index: number,
          ) => (
            <Link key={_index} className="w-full" href={`/dashboard/handbook/${slug}/${item.id}`}>
              <div className="w-full text-wrap text-white bg-acent rounded-main p-4 font-bold">
                <p>{item.title || item.subtype}</p>
              </div>
            </Link>
          ),
        )}
    </section>
  );
};
