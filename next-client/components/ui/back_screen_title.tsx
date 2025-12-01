'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Title } from './title';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib';

type Props = {
  title: string;
  className?: string;
  sizeText?: 'md' | 'lg';
};

export const BackScreenTitle = ({ title, className, sizeText }: Props) => {
  const router = useRouter();

  return (
    <div className={cn('flex items-center gap-4 mb-10', className)}>
      <Button onClick={router.back} size={'icon-lg'} variant={'ghost'} className="rounded-sm">
        <ArrowLeft />
      </Button>
      <Title text={title} size={sizeText} />
    </div>
  );
};
