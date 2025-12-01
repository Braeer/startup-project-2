import { Button } from '@/components/index';
import { MyInput } from '@/components/my_input';

export function LoginModule() {
  return (
    <section>
      <div className="gap-5 flex flex-col mt-10">
        <MyInput label="Почта" placeholder="Введите почту" />
        <MyInput label="Пароль" placeholder="Введите пароль" secrue />
      </div>

      <div className="my-20">
        <Button variant={'outline'}>Вход</Button>
      </div>
    </section>
  );
}
