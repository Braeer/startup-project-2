// import { NavBar } from '@/components/index';

import { Button } from '@/components/index';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Onboarding страница</h1>
      <Link href="/dashboard">
        <Button className="mt-4" size="lg">
          Перейти в дашборд
        </Button>
      </Link>
      <Link href="/auth/login">
        <Button className="mt-4" size="lg">
          Перейти в авторизацию
        </Button>
      </Link>
    </div>
  );
}
