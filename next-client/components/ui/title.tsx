import { cn } from '@/lib';

type Props = {
  text: string;
  size?: 'md' | 'lg';
  className?: string;
};

export const Title = ({ text, size = 'lg', className }: Props) => {
  return (
    <h1
      className={cn(
        'font-bold text-text-black',
        size === 'lg' ? 'text-4xl' : 'text-2xl',
        className,
      )}>
      {text}
    </h1>
  );
};
