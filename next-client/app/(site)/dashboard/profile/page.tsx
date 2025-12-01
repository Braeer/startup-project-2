import { Button, Title } from '@/components/index';
import { AboutMeModule } from '@/module';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <>
      <Title text="Профиль" />
      <AboutMeModule />
      <Link href="/dashboard/profile/edit">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Редактировать профиль
        </Button>
      </Link>
      <Link href="/dashboard/profile/favorites">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Избранное
        </Button>
      </Link>
      <Link href="/dashboard/profile/other">
        <Button variant="outline" size={'lg'} className="mt-4 w-full">
          Прочие
        </Button>
      </Link>
    </>
  );
}
