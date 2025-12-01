'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Title } from './title';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
};

export const BackScreenTitle = ({ title }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={router.back} size={'icon-lg'} variant={'ghost'} className="rounded-sm">
        <ArrowLeft />
      </Button>
      <Title text={title} />
    </div>
  );
};
