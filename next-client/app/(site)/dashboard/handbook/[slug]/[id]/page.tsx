'use client';

import { BackScreenTitle, ContainerWichTitle } from '@/components/index';
import { getHandBooksById } from '@/services';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HandbookPage() {
  const [data, setData] = useState([]);
  const router = useParams();

  if (!router.id || Array.isArray(router.id)) {
    return null;
  }

  const id = router.id;

  useEffect(() => {
    getHandBooksById({ id }).then((res) => {
      setData(res);
    });

    return () => setData([]);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      <BackScreenTitle title={data.title} sizeText="md" />
      <ContainerWichTitle title="Описание">
        <p>{data.content}</p>
      </ContainerWichTitle>
    </div>
  );
}
