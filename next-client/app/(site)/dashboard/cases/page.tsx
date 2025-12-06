import { Button, ContainerWichTitle, Title } from '@/components/index';
import Link from 'next/link';

export default function CasesPage() {
  return (
    <div>
      <Title text="Профиль" />
      <div>
        <ContainerWichTitle title="Мои ошибки">
          <div>
            <p>
              В данном разделе вы можете ознакомится со своими ошибками и решить тест составленый с
              ошибочных кейсов.
            </p>
            <div className="mt-4 flex justify-evenly">
              <Button asChild variant="default">
                <Link href="/dashboard/profile/errors">Ошибки</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/profile/errors/test">Перейти к тесту</Link>
              </Button>
            </div>
          </div>
        </ContainerWichTitle>
      </div>
    </div>
  );
}
