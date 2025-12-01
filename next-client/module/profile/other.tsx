import { Button } from '@/components/index';
import Link from 'next/link';

export function OtherModule() {
  return (
    <section className="mt-10">
      <Link href="/dashboard/profile/other/privacy-policy">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Политика конфиденциальности
        </Button>
      </Link>
      <Link href="/dashboard/profile/other/terms-of-use">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Условия использования
        </Button>
      </Link>
      <a href="mailto:help@medpluse.ru">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          help@medpluse.ru
        </Button>
      </a>
    </section>
  );
}
