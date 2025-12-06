import { cn } from '@/lib';

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn('bg-bluebg rounded-main p-4 my-4', className)}>{children}</section>;
}
