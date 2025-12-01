import { cn } from '@/lib';

type Props = {
  text: string;
  size?: 'md' | 'lg';
};

export const Title = ({ text, size = 'lg' }: Props) => {
  return <h1 className={cn('font-bold', size === 'lg' ? 'text-4xl' : 'text-2xl')}>{text}</h1>;
};
