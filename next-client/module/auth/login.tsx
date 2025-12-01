'use client';

import { Button } from '@/components/index';
import { MyInput } from '@/components/my_input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function LoginModule() {
  const LoginSchema = z.object({
    email: z.string().email('Неправильный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  });

  type LoginFormValues = z.infer<typeof LoginSchema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Данные формы:', data);
  };

  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl text-center">Вход</h1>
        <div className="gap-5 flex flex-col mt-10">
          <MyInput
            label="Почта"
            placeholder="Введите почту"
            error={errors.email?.message}
            success={!errors.email && watch('email')?.length > 5 && watch('email').includes('@')}
            {...register('email')}
          />
          <MyInput
            label="Пароль"
            placeholder="Введите пароль"
            secrue
            error={errors.password?.message}
            success={!errors.password && watch('password')?.length >= 6}
            {...register('password')}
          />
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
          <Button className="w-full" size={'lg'} disabled={!isValid} type="submit">
            Войти
          </Button>
        </div>
      </form>
    </section>
  );
}
