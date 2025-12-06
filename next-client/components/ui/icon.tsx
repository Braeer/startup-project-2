import { cn } from '@/lib';

type Props = {
  path: string;
  className?: string;
};

export const Icon = ({ path, className }: Props) => {
  return (
    <svg className={cn('w-6 h-6', className)}>
      <use href={path}></use>
    </svg>
  );
};
