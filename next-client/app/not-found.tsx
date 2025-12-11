import { Button } from '@/components/index';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 flex flex-col items-center gap-6">
      <h2 className="text-2xl ">Такая страница отсутствует</h2>
      <p className="text-4xl font-bold">404</p>
      <Link href="/">
        <Button>Вернуться домой</Button>
      </Link>
    </div>
  );
}
