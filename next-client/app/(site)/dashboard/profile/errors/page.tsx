'use client';

import { BackScreenTitle } from '@/components/index';
import { getUserCompletedCase } from '@/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserCompletedCase('error').then((res) => {
      setLoading(false);
      setData(res);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackScreenTitle title="Ошибки" />
      {data ? (
        <div className="flex flex-wrap w-full gap-4 mt-8">
          {data.map((item: any, _index: number) => (
            <Link key={_index} className="w-full" href={'/test/error/' + item.id}>
              <div className="w-full text-wrap text-white bg-acent rounded-main p-4 font-bold">
                <p>{item.case.title}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh-140px)]">
          <p className="text-2xl font-bold">Нет ошибок</p>
        </div>
      )}
    </>
  );
}

{
  /* <Link key={_index} className="w-full" href={`/dashboard/handbook/${slug}/${item.id}`}>
  <div className="w-full text-wrap text-white bg-acent rounded-main p-4 font-bold">
    <p>{item.title || item.subtype}</p>
  </div>
</Link>; */
}
