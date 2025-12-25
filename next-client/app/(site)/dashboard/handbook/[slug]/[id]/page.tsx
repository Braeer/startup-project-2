'use client';

import { BackScreenTitle, ContainerWichTitle } from '@/components/index';
import { getHandBooksById } from '@/services';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type HandbookData = {
  title: string;
  content: string;
};

export default function HandbookPage() {
  const [data, setData] = useState<HandbookData | null>(null);
  const router = useParams();

  if (!router.id || Array.isArray(router.id)) {
    return null;
  }

  const id = router.id;

  useEffect(() => {
    getHandBooksById({ id }).then((res) => {
      setData(res);
    });

    return () => setData(null);
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
