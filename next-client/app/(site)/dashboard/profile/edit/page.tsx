import { BackScreenTitle } from '@/components/index';
import { EditProfileModule } from '@/module/index';

export default function EditProfilePage() {
  return (
    <>
      <BackScreenTitle title="Редактирование профиля" sizeText="md" />
      <EditProfileModule />
    </>
  );
}
