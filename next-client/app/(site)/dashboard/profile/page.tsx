import { Title } from '@/components/index';
import { AboutMeModule } from '@/module/index';
import { ListButtons } from '@/module/index';

export default function ProfilePage() {
  return (
    <>
      <Title text="Профиль" />
      <AboutMeModule />
      <ListButtons />
    </>
  );
}
