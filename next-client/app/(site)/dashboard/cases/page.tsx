import { Button, ContainerWichTitle, Title } from '@/components/index';
import Link from 'next/link';

export default function CasesPage() {
  return (
    <div>
      <Title text="Кейсы" />
      <div className="flex flex-col h-[calc(100vh-150px)] justify-between">
        <div className="flex flex-col items-center justify-center gap-4 my-auto">
          <Button variant={'default'} size={'lg'} className="min-w-[200px]">
            Начать тест
          </Button>
          <Button variant={'outline'} size={'sm'}>
            Фильтр
          </Button>
        </div>

        <ContainerWichTitle title="Мои ошибки" className="max-w-[700px] mx-auto">
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
