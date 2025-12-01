import { Button } from '@/components/index';
import { MyInput } from '@/components/my_input';

export function LoginModule() {
  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <h1 className="text-4xl text-center">Вход</h1>
      <div className="gap-5 flex flex-col mt-10">
        <MyInput label="Почта" placeholder="Введите почту" />
        <MyInput label="Пароль" placeholder="Введите пароль" secrue />
      </div>

      <p className="mt-4 text-black/50 text-sm text-center">
        Если у вас отсутствует аккаунт, то переходите на страницу{' '}
        <span>
          <a
            href="/auth/register"
            className="text-acent underline underline-offset-2 font-semibold">
            регистрации
          </a>
        </span>
      </p>

      <div className="my-10 flex">
        <Button className="w-full">Войти</Button>
      </div>
    </section>
  );
}
