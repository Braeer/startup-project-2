import { BackScreenTitle } from '@/components/index';
import { EditPasswordModule } from '@/module/index';

export default function EditPasswordPage() {
  return (
    <>
      <BackScreenTitle title="Редактирование пароля" sizeText="md" />
      <EditPasswordModule />
    </>
  );
}
